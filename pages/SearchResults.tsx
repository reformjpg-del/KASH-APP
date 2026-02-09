
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MOCK_PRICES, MOCK_PRODUCTS, CATEGORIES_CONFIG } from '../constants';
import { StorePrice, Product } from '../types';

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialQuery = location.state?.query || '';
  const [query, setQuery] = useState(initialQuery);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [sortBy, setSortBy] = useState('price_asc');
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('vibe_cart') || '[]');
    setCart(savedCart);
  }, []);

  const toggleCart = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let newCart;
    if (cart.includes(productId)) {
      newCart = cart.filter(id => id !== productId);
    } else {
      newCart = [...cart, productId];
    }
    setCart(newCart);
    localStorage.setItem('vibe_cart', JSON.stringify(newCart));
  };

  const allCategoryFilters = useMemo(() => {
    const base = [{ id: 'Todo', name: 'Todo', icon: 'notes' }];
    const fromConfig = CATEGORIES_CONFIG.map(cat => ({
      id: cat.id,
      name: cat.name.split(' ')[0],
      icon: cat.icon
    }));
    
    const result = [...base];
    fromConfig.forEach(cat => {
      result.push(cat);
      if (cat.id === '2') {
        result.push({ id: 'Bebidas', name: 'Bebidas', icon: 'local_bar' });
      }
    });
    
    return result;
  }, []);

  const groupedResults = useMemo(() => {
    let list = MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedCategory !== 'Todo') {
      if (selectedCategory === 'Bebidas') {
        list = list.filter(p => 
          p.name.toLowerCase().includes('agua') || 
          p.name.toLowerCase().includes('jugo') || 
          p.name.toLowerCase().includes('refresco') ||
          p.name.toLowerCase().includes('bebida')
        );
      } else {
        list = list.filter(p => p.category === selectedCategory);
      }
    }

    let results = list.map(product => {
      const offers = MOCK_PRICES.filter(price => price.productId === product.id)
        .sort((a, b) => a.priceBs - b.priceBs);
      
      const bestPrice = offers.length > 0 ? offers[0].priceBs : 0;
      const avgPrice = offers.length > 0 ? offers.reduce((a, b) => a + b.priceBs, 0) / offers.length : 0;
      
      const isRealOffer = offers.length > 1 && bestPrice < (avgPrice * 0.85);
      const isTopVoted = offers.length > 0 && offers[0].popularity > 90;
      
      return {
        ...product,
        bestPrice,
        allOffers: offers,
        isRealOffer,
        isTopVoted
      };
    }).filter(p => p.allOffers.length > 0);

    if (sortBy === 'price_asc') {
      results.sort((a, b) => a.bestPrice - b.bestPrice);
    } else if (sortBy === 'price_desc') {
      results.sort((a, b) => b.bestPrice - a.bestPrice);
    }

    return results;
  }, [query, selectedCategory, sortBy]);

  const toggleExpand = (productId: string) => {
    setExpandedId(expandedId === productId ? null : productId);
  };

  return (
    <div className="pb-44 min-h-screen bg-white dark:bg-vibe-dark transition-all duration-500">
      
      {/* Floating Comparison Button */}
      {cart.length > 0 && (
        <button 
          onClick={() => navigate('/cart-comparison')}
          className="fixed bottom-28 right-6 z-[60] bg-primary text-white h-16 px-6 rounded-2xl shadow-primary-glow flex items-center gap-3 animate-in slide-in-from-right-10 group active:scale-90"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-2xl fill-icon">shopping_cart</span>
            <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {cart.length}
            </span>
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest">Comparar Canasta</span>
        </button>
      )}

      <header className="sticky top-0 bg-white/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 px-6 pt-8 pb-4 flex flex-col gap-5 border-b border-black/[0.01]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-vibe-sub/60 hover:text-vibe-text">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/80 group-focus-within:text-emerald-500 transition-colors">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </div>
            <input 
              type="text" 
              placeholder="Buscar productos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 bg-white dark:bg-vibe-card rounded-2xl border-[1.5px] border-emerald-500/20 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 pl-12 pr-6 font-medium text-[15px] transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 -mx-2 px-2 scroll-smooth">
          {allCategoryFilters.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setExpandedId(null);
                }}
                className={`flex items-center gap-2.5 h-11 px-5 rounded-full border transition-all whitespace-nowrap text-[13px] font-bold shrink-0 ${
                  isActive 
                  ? 'bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] border-transparent shadow-lg scale-[1.02]' 
                  : 'bg-white dark:bg-vibe-card text-[#64748b] border-black/[0.08] dark:border-white/[0.08] hover:border-primary/30'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-icon' : ''}`}>{cat.icon}</span>
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-[14px] font-bold text-[#60a5fa]">
            {groupedResults.length} productos
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSortBy(sortBy === 'price_asc' ? 'price_desc' : 'price_asc')}
              className="flex items-center gap-2 px-4 h-11 bg-white dark:bg-vibe-card border border-black/[0.06] rounded-2xl text-[13px] font-bold shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">swap_vert</span>
              {sortBy === 'price_asc' ? 'Menor precio' : 'Mayor precio'}
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 pt-4 space-y-4">
        {groupedResults.map((product, idx) => {
          const isExpanded = expandedId === product.id;
          const inCart = cart.includes(product.id);
          
          return (
            <div 
              key={product.id} 
              className={`bg-white dark:bg-vibe-card rounded-[2.2rem] border transition-all duration-300 overflow-hidden shadow-vibe ${
                isExpanded ? 'border-primary/20 ring-1 ring-primary/5' : 'border-black/[0.02]'
              }`}
            >
              <div 
                onClick={() => toggleExpand(product.id)}
                className="p-5 flex items-center gap-4 cursor-pointer relative"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-vibe-light dark:bg-vibe-dark shrink-0 relative">
                  <img src={product.imageUrl} className="w-full h-full object-cover" alt={product.name} />
                  {/* Cart Action Button */}
                  <button 
                    onClick={(e) => toggleCart(product.id, e)}
                    className={`absolute bottom-1 right-1 z-20 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${inCart ? 'bg-primary text-white border-primary' : 'bg-white/40 text-vibe-dark border-white/40'}`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {inCart ? 'check' : 'add'}
                    </span>
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-1.5 mb-1.5 flex-wrap">
                    {product.isRealOffer && (
                      <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-500/20">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                        Oferta Real
                      </div>
                    )}
                    {product.isTopVoted && (
                      <div className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider flex items-center gap-1 border border-primary/20">
                        <span className="material-symbols-outlined text-[10px] fill-icon">military_tech</span>
                        Top Comunidad
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-black text-[15px] tracking-tight truncate leading-tight">{product.name}</h4>
                  <p className="text-[10px] font-bold text-vibe-sub/50 uppercase tracking-widest mt-0.5">{product.presentation}</p>
                  
                  <div className="mt-2 flex items-baseline gap-1.5">
                     <span className="text-[9px] font-black text-primary uppercase opacity-60">Desde Bs.</span>
                     <span className="text-2xl font-black tracking-tighter text-primary tabular-nums">{product.bestPrice.toLocaleString('es-VE')}</span>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : 'text-vibe-sub/20'}`}>
                  <span className="material-symbols-outlined text-2xl">expand_more</span>
                </div>
              </div>

              {isExpanded && (
                 <div className="p-5 space-y-4 bg-vibe-light/30 dark:bg-black/10 border-t border-black/[0.02]">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/40 ml-1">Ofertas detectadas</p>
                    {product.allOffers.map((offer) => (
                      <div key={offer.id} className="bg-white dark:bg-vibe-card rounded-2xl p-4 border border-black/[0.02] shadow-sm flex justify-between items-center">
                         <div>
                            <p className="font-black text-xs">{offer.storeName}</p>
                            <p className="text-[9px] font-bold text-vibe-sub/60 uppercase">{offer.location} • {offer.distanceKm} km</p>
                         </div>
                         <div className="text-right">
                            <p className="text-lg font-black text-primary tabular-nums">Bs. {offer.priceBs.toLocaleString('es-VE')}</p>
                            <button className="text-[8px] font-black uppercase text-blue-500 mt-1 block hover:underline">Ver mapa</button>
                         </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="w-full h-12 bg-vibe-dark dark:bg-white text-white dark:text-vibe-dark rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg"
                    >
                       Ver detalles completos
                    </button>
                 </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default SearchResults;
