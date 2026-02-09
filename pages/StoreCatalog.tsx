
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_STORES, MOCK_PRODUCTS, MOCK_PRICES } from '../constants';
import BottomNav from '../components/BottomNav';

const StoreCatalog: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState('');
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('vibe_cart') || '[]');
    setCart(savedCart);
  }, []);

  const store = useMemo(() => 
    MOCK_STORES.find(s => s.id === id) || MOCK_STORES[0]
  , [id]);

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

  const handleShare = async (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `¡Mira este precio en KASH! ⚡️\n\n📦 *${item.name}* (${item.presentation})\n💰 Precio: *Bs. ${item.priceBs.toLocaleString('es-VE')}*\n📍 Tienda: *${store.name}*\n\nCompara y ahorra con KASH.`;
    const shareUrl = `${window.location.origin}/#/product/${item.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KASH - Comparador de Precios',
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.debug('Error sharing', err);
      }
    } else {
      // Fallback a WhatsApp Web/App
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + "\n\nVer más: " + shareUrl)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const storeInventory = useMemo(() => {
    const prices = MOCK_PRICES.filter(p => p.storeName.toLowerCase().includes(store.name.toLowerCase()));
    
    const catalog = prices.map(price => {
      const product = MOCK_PRODUCTS.find(p => p.id === price.productId);
      return {
        ...product,
        priceBs: price.priceBs,
        priceUsd: price.priceUsd,
        stockStatus: price.stockStatus,
        lastUpdated: price.lastUpdated
      };
    }).filter(item => item.id);

    if (localSearch) {
      return catalog.filter(item => 
        item.name?.toLowerCase().includes(localSearch.toLowerCase()) ||
        item.presentation?.toLowerCase().includes(localSearch.toLowerCase())
      );
    }
    return catalog;
  }, [store, localSearch]);

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-colors duration-500">
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
          <span className="text-[11px] font-black uppercase tracking-widest hidden sm:block">Comparar</span>
        </button>
      )}

      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 border-b border-black/[0.03] dark:border-white/[0.03]">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card shadow-sm border border-black/[0.04] dark:border-white/[0.04] active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black tracking-tighter truncate">{store.name}</h1>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Abierto ahora • {store.distance}</p>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/20 p-0.5 bg-white">
             <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>

        <div className="relative group">
          <input 
            type="text"
            placeholder={`Buscar en ${store.name}...`}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full h-14 bg-black/[0.03] dark:bg-white/[0.04] rounded-2xl border-none px-12 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-vibe-sub/40"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-vibe-sub/40 group-focus-within:text-primary transition-colors">search</span>
          {localSearch && (
             <button onClick={() => setLocalSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-vibe-sub/40">
                <span className="material-symbols-outlined text-lg">cancel</span>
             </button>
          )}
        </div>
      </header>

      <main className="px-6 py-6">
        <div className="flex justify-between items-center mb-6 px-1">
           <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-vibe-sub/60">Catálogo ({storeInventory.length})</h3>
           <button className="material-symbols-outlined text-vibe-sub/40">tune</button>
        </div>

        {storeInventory.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {storeInventory.map((item, i) => {
              const inCart = item.id ? cart.includes(item.id) : false;
              return (
                <div 
                  key={`${item.id}-${i}`}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="bg-white dark:bg-vibe-card rounded-[2rem] p-4 border border-black/[0.03] dark:border-white/[0.03] shadow-vibe group active:scale-[0.97] transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-4 relative"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-vibe-light dark:bg-vibe-dark">
                    <img 
                      src={item.imageUrl} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={item.name} 
                    />
                    
                    {/* Botón de Compartir (Pixel Perfect) */}
                    <button 
                      onClick={(e) => handleShare(item, e)}
                      className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border border-white/40 bg-white/30 text-vibe-dark hover:bg-white/50 transition-all shadow-sm active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[16px]">share</span>
                    </button>

                    {/* Botón + para agregar al carrito */}
                    <button 
                      onClick={(e) => item.id && toggleCart(item.id, e)}
                      className={`absolute bottom-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-sm ${inCart ? 'bg-primary text-white border-primary' : 'bg-white/60 text-vibe-dark border-white/40 hover:bg-white/80'}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {inCart ? 'check' : 'add'}
                      </span>
                    </button>

                    {item.stockStatus === 'low-stock' && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-lg z-10">
                        Poco Stock
                      </div>
                    )}
                  </div>
                  
                  <div className="px-1">
                    <p className="text-[9px] font-black uppercase text-vibe-sub/60 tracking-widest truncate mb-1">{item.presentation}</p>
                    <h4 className="text-sm font-extrabold tracking-tight truncate mb-3">{item.name}</h4>
                    
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-primary uppercase opacity-60">Bs.</span>
                       <p className="text-primary font-black text-2xl tracking-tighter leading-none tabular-nums">
                          {item.priceBs.toLocaleString('es-VE')}
                       </p>
                       <p className="text-[8px] font-bold text-vibe-sub/40 mt-1 uppercase">Actualizado: {item.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center text-center px-10">
            <div className="w-20 h-20 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary/20 mb-6">
              <span className="material-symbols-outlined text-4xl">inventory_2</span>
            </div>
            <h4 className="text-xl font-black tracking-tighter mb-2">No hay resultados</h4>
            <p className="text-sm text-vibe-sub/60 font-medium leading-relaxed">
              No encontramos productos que coincidan con tu búsqueda en este comercio.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default StoreCatalog;
