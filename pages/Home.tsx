
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_PRICES, CATEGORIES_CONFIG, BCV_RATE, MOCK_STORES } from '../constants';
import { Product } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeBanner, setActiveBanner] = useState(0);
  const [cart, setCart] = useState<string[]>([]);
  const [savedStores, setSavedStores] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const banners = [
    {
      id: 1,
      title: "Semana de la Salud",
      subtitle: "Hasta 40% menos en genéricos verificados",
      cta: "Ver farmacias",
      color: "from-[#2563eb] to-[#3b82f6]",
      icon: "medical_services",
      bgImage: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "¡Puntos Dobles!",
      subtitle: "Reporta precios hoy y duplica tus KASK Points",
      cta: "Reportar ahora",
      color: "from-primary to-[#ff8c42]",
      icon: "bolt",
      bgImage: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=800&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('vibe_cart') || '[]');
    setCart(savedCart);
    const savedS = JSON.parse(localStorage.getItem('vibe_saved_stores') || '[]');
    setSavedStores(savedS);
    
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const toggleSaveStore = (storeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let newStores;
    if (savedStores.includes(storeId)) {
      newStores = savedStores.filter(id => id !== storeId);
    } else {
      newStores = [...savedStores, storeId];
    }
    setSavedStores(newStores);
    localStorage.setItem('vibe_saved_stores', JSON.stringify(newStores));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 1) {
      const filtered = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.presentation.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      setIsSearching(true);
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim().length > 0) {
      navigate('/search', { state: { query: searchQuery } });
      setIsSearching(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const homeCategories = CATEGORIES_CONFIG.slice(0, 6);
  const suggestedProducts = MOCK_PRODUCTS.slice(0, 4);
  const lowestPrices = [...MOCK_PRICES].sort((a, b) => a.priceBs - b.priceBs).slice(0, 3);

  return (
    <div className="pb-44 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-colors duration-500">
      {isSearching && (
        <div className="fixed inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-[3px] z-40 transition-all duration-500" />
      )}

      {/* Floating Comparison Button */}
      {cart.length > 0 && (
        <button 
          onClick={() => navigate('/cart-comparison')}
          className="fixed bottom-28 right-6 z-[60] bg-primary text-white h-16 px-6 rounded-2xl shadow-primary-glow flex items-center gap-3 animate-in slide-in-from-right-10 duration-500 group active:scale-90"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-2xl fill-icon">shopping_cart</span>
            <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {cart.length}
            </span>
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest hidden sm:block">Comparar Canasta</span>
        </button>
      )}

      <header className="px-6 pt-10 pb-4 flex justify-between items-center sticky top-0 bg-vibe-light/80 dark:bg-vibe-dark/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary w-10 h-10 rounded-lg flex items-center justify-center shadow-primary-glow">
            <span className="material-symbols-outlined text-white fill-icon text-xl">bolt</span>
          </div>
          <div className="flex flex-col">
             <h2 className="text-xl font-black tracking-tighter leading-none uppercase">KASH</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <div className="bg-white/40 dark:bg-vibe-card/40 h-9 px-3 rounded-xl flex items-center gap-2 border border-black/[0.04] dark:border-white/[0.04] mr-1">
             <p className="text-[6px] font-black uppercase tracking-[0.2em] text-vibe-sub/40 leading-none">BCV</p>
             <p className="text-[10px] font-bold text-primary/80 leading-none tracking-tight">Bs.{BCV_RATE.toFixed(2)}</p>
          </div>

          <button 
            onClick={() => navigate('/saved')}
            className="w-11 h-11 rounded-full bg-white dark:bg-vibe-card flex items-center justify-center border border-black/[0.04] dark:border-white/[0.04] shadow-vibe active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[22px]">bookmark</span>
          </button>

          <button 
            onClick={() => navigate('/alerts')}
            className="relative w-11 h-11 rounded-full bg-white dark:bg-vibe-card flex items-center justify-center border border-black/[0.04] dark:border-white/[0.04] shadow-vibe active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white dark:border-vibe-dark shadow-primary-glow" />
          </button>
        </div>
      </header>

      <div className="px-6 py-4 relative z-50 max-w-3xl mx-auto" ref={searchRef}>
        <div className={`
          flex items-center bg-white dark:bg-vibe-card rounded-2xl transition-all duration-300 px-4 gap-3 h-16
          border border-black/[0.04] dark:border-white/[0.08]
          ${isSearching 
            ? 'shadow-primary-glow ring-2 ring-primary/20 scale-[1.02]' 
            : 'shadow-vibe hover:border-primary/20 hover:shadow-lg'
          }
        `}>
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500
            ${isSearching ? 'bg-primary text-white rotate-90 scale-110' : 'bg-primary/10 text-primary'}
          `}>
            <span className={`material-symbols-outlined text-[22px] ${isSearching ? 'fill-icon' : ''}`}>
              {isSearching ? 'tune' : 'search'}
            </span>
          </div>
          <input 
            type="text" 
            placeholder="Buscar productos, marcas o tiendas..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.length > 1 && setIsSearching(true)}
            className="flex-1 bg-transparent border-none focus:ring-0 font-extrabold text-[15px] tracking-tight text-vibe-text dark:text-white placeholder:text-vibe-sub/30"
          />
        </div>

        {isSearching && suggestions.length > 0 && (
          <div className="absolute top-[5.5rem] left-6 right-6 bg-white dark:bg-vibe-card rounded-2xl shadow-2xl border border-black/[0.03] overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top">
            <div className="p-3 bg-vibe-light/50 dark:bg-white/5 border-b border-black/[0.02] flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 ml-2">Sugerencias inteligentes KASH</span>
              <span className="material-symbols-outlined text-primary text-sm fill-icon animate-pulse">bolt</span>
            </div>
            {suggestions.map((product) => (
              <button
                key={product.id}
                onClick={() => { navigate('/search', { state: { query: product.name } }); setIsSearching(false); }}
                className="w-full flex items-center gap-4 p-4 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors border-b border-black/[0.01] last:border-none group text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-vibe-light dark:bg-vibe-dark overflow-hidden shrink-0 border border-black/[0.02]">
                  <img src={product.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-sm tracking-tight truncate group-hover:text-primary transition-colors">{product.name}</p>
                  <p className="text-[10px] font-bold text-vibe-sub/60 uppercase tracking-widest mt-0.5">{product.presentation}</p>
                </div>
                <span className="material-symbols-outlined text-vibe-sub/20 group-hover:text-primary transition-colors">north_west</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Banner de Publicidad */}
      <div className="mt-4 px-6 max-w-5xl mx-auto">
        <div className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl shadow-vibe bg-vibe-card">
          <div className="flex transition-transform duration-700 ease-out h-full" style={{ transform: `translateX(-${activeBanner * 100}%)` }}>
            {banners.map((banner) => (
              <div key={banner.id} className="min-w-full h-full relative group cursor-pointer" onClick={() => navigate('/search')}>
                <div className="absolute inset-0 z-0">
                  <img src={banner.bgImage} className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-[10s]" alt="" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-90 mix-blend-multiply`} />
                </div>
                <div className="relative z-10 p-8 flex items-center h-full gap-6">
                  <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-lg">
                    <span className="material-symbols-outlined text-3xl fill-icon">{banner.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-white text-xl font-black tracking-tight leading-none">{banner.title}</h4>
                    <p className="text-white/80 text-xs font-bold leading-tight max-w-[180px]">{banner.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comercio Stories */}
      <div className="mt-10 px-2 max-w-screen-xl mx-auto overflow-hidden">
        <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 pb-4">
           {MOCK_STORES.map((store) => {
             const isSaved = savedStores.includes(store.id);
             return (
              <div 
                key={store.id} 
                className="flex flex-col items-center gap-3 shrink-0 group relative cursor-pointer"
                onClick={() => navigate(`/store/${store.id}`)}
              >
                  {/* Anillo de Gradiente Naranja-Oro con Sombras Profundas */}
                  <div className="w-[80px] h-[80px] rounded-full p-[3.5px] bg-gradient-to-b from-[#FB6316] via-[#FF8C00] to-[#FFD700] shadow-lg relative">
                    <div className="w-full h-full rounded-full border-[2.5px] border-white dark:border-vibe-dark overflow-hidden bg-white shadow-inner">
                        <img 
                          src={store.logo} 
                          alt={store.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                    </div>
                    {/* Botón + para agregar a favoritos de tiendas */}
                    <button 
                      onClick={(e) => toggleSaveStore(store.id, e)}
                      className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white dark:border-vibe-dark transition-all duration-300 shadow-md ${isSaved ? 'bg-primary text-white' : 'bg-white text-primary hover:scale-110'}`}
                    >
                      <span className="material-symbols-outlined text-[16px] font-black">
                        {isSaved ? 'favorite' : 'add'}
                      </span>
                    </button>
                  </div>
                  {/* Tipografía Estilo Referencia */}
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#001B44] dark:text-white/90">
                    {store.name}
                  </span>
              </div>
             );
           })}
        </div>
      </div>

      {/* Categorías */}
      <div className="px-6 mt-12 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl font-black tracking-tight">Categorías</h3>
          <button onClick={() => navigate('/categories')} className="text-primary text-xs font-black uppercase tracking-widest px-4 py-2 bg-primary/10 rounded-lg">Ver todas</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {homeCategories.map((cat) => (
            <div key={cat.id} onClick={() => navigate(`/category/${cat.id}`)} className="bg-white dark:bg-vibe-card rounded-2xl p-6 border border-black/[0.03] flex flex-col items-center text-center gap-4 group cursor-pointer active:scale-[0.98] transition-all shadow-vibe">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined fill-icon text-2xl">{cat.icon}</span>
              </div>
              <div>
                <p className="font-extrabold tracking-tight text-sm">{cat.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sugerencias */}
      <section className="px-6 mt-16 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col">
            <h3 className="text-xl font-black tracking-tight">Sugerencias</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Basado en tus intereses</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {suggestedProducts.map((product) => {
            const isVoted = parseInt(product.id) % 2 === 0;
            const inCart = cart.includes(product.id);
            return (
              <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="min-w-[160px] bg-white dark:bg-vibe-card rounded-3xl p-3 border border-black/[0.03] shadow-vibe flex flex-col group cursor-pointer active:scale-[0.97] transition-all relative"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-vibe-light dark:bg-vibe-dark mb-3 relative">
                  {isVoted && (
                    <div className="absolute top-2 right-2 z-10 bg-primary/20 backdrop-blur-md text-primary px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider border border-primary/20">
                      TOP
                    </div>
                  )}
                  {/* Botón + para Agregar al Carrito (Pixel Perfect) */}
                  <button 
                    onClick={(e) => toggleCart(product.id, e)}
                    className={`absolute bottom-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-sm ${inCart ? 'bg-primary text-white border-primary' : 'bg-white/40 text-vibe-dark border-white/40 hover:bg-white/60'}`}
                  >
                    <span className="material-symbols-outlined text-[18px] font-black">
                      {inCart ? 'check' : 'add'}
                    </span>
                  </button>

                  <img src={product.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <p className="text-[9px] font-black uppercase text-primary tracking-widest mb-1 truncate">{product.presentation}</p>
                <h4 className="text-xs font-extrabold tracking-tight line-clamp-2 leading-tight h-8 mb-2">{product.name}</h4>
                <div className="flex items-center gap-1 text-[10px] font-bold text-vibe-sub/60">
                  <span className="material-symbols-outlined text-[12px] text-green-500 fill-icon">verified</span>
                  KASH Safe
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Precios más bajos */}
      <section className="px-6 mt-16 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col">
            <h3 className="text-xl font-black tracking-tight text-green-600 dark:text-green-400">Precios más bajos</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Oportunidades hoy</p>
          </div>
          <span className="material-symbols-outlined text-green-500 fill-icon animate-pulse">trending_down</span>
        </div>
        <div className="space-y-4">
          {lowestPrices.map((price) => {
            const product = MOCK_PRODUCTS.find(p => p.id === price.productId);
            const inCart = product ? cart.includes(product.id) : false;
            return (
              <div 
                key={price.id}
                onClick={() => product && navigate(`/product/${product.id}`)}
                className="bg-white dark:bg-vibe-card rounded-3xl p-4 border border-black/[0.03] shadow-vibe flex items-center gap-4 group active:scale-[0.98] transition-all cursor-pointer relative"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-vibe-light dark:bg-vibe-dark shrink-0 relative">
                  <img src={product?.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  
                  {/* Botón + para Agregar al Carrito (Pixel Perfect) */}
                  <button 
                    onClick={(e) => product && toggleCart(product.id, e)}
                    className={`absolute bottom-1 right-1 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-sm ${inCart ? 'bg-primary text-white border-primary' : 'bg-white/40 text-vibe-dark border-white/40'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {inCart ? 'check' : 'add'}
                    </span>
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-extrabold text-sm tracking-tight truncate max-w-[140px]">{product?.name}</h4>
                    <div className="bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-[4px] text-[7px] font-black uppercase tracking-wider whitespace-nowrap">
                      Mejor Precio
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-vibe-sub/40 uppercase tracking-widest truncate">{price.storeName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-tighter mb-0.5">Bs.</p>
                  <p className="text-2xl font-black text-green-600 dark:text-green-400 tracking-tighter leading-none tabular-nums">{price.priceBs.toLocaleString('es-VE')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="px-6 mt-20 mb-12 flex justify-center">
        <button 
          onClick={scrollToTop}
          className="flex flex-col items-center gap-3 group animate-bounce"
        >
          <div className="w-14 h-14 rounded-full bg-vibe-dark dark:bg-white text-white dark:text-vibe-dark flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-4 border-primary/20">
             <span className="material-symbols-outlined font-black text-2xl">expand_less</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Volver arriba</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
