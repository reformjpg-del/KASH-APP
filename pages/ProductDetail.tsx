
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRICES, MOCK_PRODUCTS, CATEGORIES_CONFIG } from '../constants';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [inCart, setInCart] = useState(false);

  // Lógica de datos
  const currentPrice = useMemo(() => MOCK_PRICES.find(p => p.id === id) || MOCK_PRICES[0], [id]);
  const product = useMemo(() => MOCK_PRODUCTS.find(p => p.id === currentPrice.productId) || MOCK_PRODUCTS[0], [currentPrice]);
  const category = useMemo(() => CATEGORIES_CONFIG.find(c => c.id === product.category) || CATEGORIES_CONFIG[0], [product]);
  
  const allOffers = useMemo(() => 
    MOCK_PRICES.filter(p => p.productId === product.id)
    .sort((a, b) => a.priceBs - b.priceBs)
  , [product]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('vibe_cart') || '[]');
    setInCart(cart.includes(product.id));
  }, [product.id]);

  const toggleCart = () => {
    const cart = JSON.parse(localStorage.getItem('vibe_cart') || '[]');
    let newCart;
    if (cart.includes(product.id)) {
      newCart = cart.filter((pid: string) => pid !== product.id);
      setInCart(false);
    } else {
      newCart = [...cart, product.id];
      setInCart(true);
    }
    localStorage.setItem('vibe_cart', JSON.stringify(newCart));
  };

  const avgPrice = useMemo(() => {
    return allOffers.reduce((acc, curr) => acc + curr.priceBs, 0) / allOffers.length;
  }, [allOffers]);

  const bestPrice = allOffers[0].priceBs;
  const isRealOffer = bestPrice < (avgPrice * 0.85);
  const isTopVoted = allOffers[0].popularity > 90;

  const handleOpenMaps = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  const handleWhatsApp = (store: string, prodName: string) => {
    const msg = encodeURIComponent(`Hola ${store}, ¿tienen disponibilidad de ${prodName}? Lo vi en KASH.`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="pb-44 min-h-screen bg-[#F8FAFC] dark:bg-vibe-dark transition-all duration-500 overflow-x-hidden">
      {/* Fondo de acento sutil */}
      <div 
        className="fixed top-0 left-0 w-full h-[40vh] opacity-[0.06] pointer-events-none" 
        style={{ background: `radial-gradient(circle at top, ${category.accent} 0%, transparent 70%)` }} 
      />

      {/* Header Fijo Compacto */}
      <header className="sticky top-0 bg-white/80 dark:bg-vibe-dark/80 backdrop-blur-xl z-50 border-b border-black/[0.04] dark:border-white/10 px-6 h-16 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-vibe-card shadow-sm border border-black/[0.06] active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-lg">chevron_left</span>
        </button>
        <div className="flex-1 text-center px-4 overflow-hidden">
          <h2 className="text-[9px] font-black tracking-[0.3em] uppercase opacity-40 leading-none mb-1 truncate">Ficha Técnica</h2>
          <p className="text-[11px] font-black tracking-tight truncate uppercase text-primary">ID: {product.id.padStart(4, '0')}</p>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-vibe-card shadow-sm border border-black/[0.06] active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-lg">ios_share</span>
        </button>
      </header>

      <main className="relative z-10">
        {/* HERO: Imagen y Título principal */}
        <section className="px-5 pt-4 pb-2">
          <div className="bg-white dark:bg-vibe-card rounded-3xl p-4 shadow-vibe border border-black/[0.02] dark:border-white/[0.02] relative">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap gap-1.5">
                <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1 border border-emerald-500/10">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                  Stock
                </div>
                {isRealOffer && (
                  <div className="bg-emerald-500 text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest">
                    Oferta
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className="w-9 h-9 rounded-lg bg-vibe-light dark:bg-vibe-dark flex items-center justify-center active:scale-90 transition-all border border-black/[0.04]"
              >
                <span className={`material-symbols-outlined text-lg ${isSaved ? 'text-primary fill-icon' : 'text-vibe-sub/30'}`}>
                  bookmark
                </span>
              </button>
            </div>

            <div className="w-full h-44 rounded-2xl overflow-hidden bg-vibe-light dark:bg-vibe-dark/50 mb-4 border border-black/[0.01] flex items-center justify-center p-4">
               <img 
                 src={product.imageUrl} 
                 className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" 
                 alt={product.name} 
               />
            </div>

            <div className="space-y-2">
               <div className="flex items-center gap-2">
                 <p className="text-[10px] font-black text-primary/50 uppercase tracking-[0.2em]">{product.presentation}</p>
                 <div className="flex-1 h-px bg-black/[0.05] dark:bg-white/5" />
                 <div className="flex gap-0.5">
                   {[1,2,3,4,5].map(s => (
                     <span key={s} className="material-symbols-outlined text-[12px] text-primary fill-icon">star</span>
                   ))}
                 </div>
               </div>
               <h1 className="text-2xl font-black tracking-tight leading-tight text-vibe-dark dark:text-white truncate">{product.name}</h1>
               <p className="text-vibe-sub dark:text-gray-400 text-[11px] font-semibold leading-relaxed opacity-70 line-clamp-2">{product.description}</p>
            </div>
          </div>
        </section>

        {/* DASHBOARD: Precio Maestro */}
        <section className="px-5 -mt-3 mb-6">
           <div className="bg-[#0f172a] dark:bg-white rounded-[2rem] p-6 text-white dark:text-vibe-dark shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[40px] -mr-12 -mt-12" />
              
              <div className="relative z-10 flex flex-col items-center">
                 <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 dark:text-vibe-dark/40 mb-3">Mejor Precio en Zona</p>
                 <div className="flex items-center gap-2 mb-6">
                    <span className="text-xl font-black text-primary uppercase">Bs.</span>
                    <h3 className="text-5xl font-black tracking-tighter leading-none tabular-nums">{bestPrice.toLocaleString('es-VE')}</h3>
                 </div>
                 
                 <div className="w-full grid grid-cols-2 gap-2">
                    <div className="bg-white/10 dark:bg-black/5 py-3 px-2 rounded-xl border border-white/10 flex flex-col items-center text-center">
                       <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-0.5">Tienda Líder</p>
                       <p className="text-[10px] font-black truncate w-full">{allOffers[0].storeName}</p>
                    </div>
                    <div className="bg-white/10 dark:bg-black/5 py-3 px-2 rounded-xl border border-white/10 flex flex-col items-center text-center">
                       <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-0.5">Ahorro Máx</p>
                       <p className="text-[10px] font-black text-emerald-400">Bs. {(avgPrice - bestPrice).toFixed(0)}</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* COMPARATIVA: Lista de Tiendas */}
        <section className="px-5 mb-8">
           <div className="flex justify-between items-end mb-4 px-1">
              <div>
                 <h3 className="text-base font-black tracking-tight leading-none mb-1">Comparativa Local</h3>
                 <p className="text-[8px] font-black uppercase tracking-[0.2em] text-vibe-sub/40">Tiendas verificadas</p>
              </div>
              <button className="text-primary text-[9px] font-black uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-lg">Actualizar</button>
           </div>

           <div className="space-y-3">
              {allOffers.map((offer, i) => (
                <div 
                  key={offer.id} 
                  className={`bg-white dark:bg-vibe-card rounded-2xl p-4 border transition-all shadow-sm ${i === 0 ? 'border-primary/20 ring-1 ring-primary/5' : 'border-black/[0.04]'}`}
                >
                   <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                         <div className="w-10 h-10 rounded-xl bg-vibe-light dark:bg-vibe-dark flex items-center justify-center text-primary shrink-0 border border-black/[0.04]">
                            <span className="material-symbols-outlined text-xl">storefront</span>
                         </div>
                         <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                               <p className="font-black text-[13px] tracking-tight truncate">{offer.storeName}</p>
                               {i === 0 && <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[6px] font-black rounded uppercase">Top</span>}
                            </div>
                            <p className="text-[9px] font-bold text-vibe-sub/60 uppercase tracking-tight truncate">{offer.location} • {offer.distanceKm} km</p>
                         </div>
                      </div>
                      <div className="text-right shrink-0">
                         <p className="text-lg font-black tracking-tighter leading-none text-vibe-dark dark:text-white tabular-nums">Bs. {offer.priceBs.toLocaleString('es-VE')}</p>
                         <p className="text-[7px] font-black uppercase tracking-widest text-vibe-sub/30 mt-1">{offer.lastUpdated}</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleOpenMaps(offer.address)}
                        className="h-9 bg-vibe-light dark:bg-vibe-dark rounded-lg flex items-center justify-center gap-1.5 border border-black/[0.04] active:scale-95 transition-all"
                      >
                         <span className="material-symbols-outlined text-base text-blue-500 fill-icon">directions</span>
                         <span className="text-[8px] font-black uppercase tracking-widest">Mapa</span>
                      </button>
                      <button 
                        onClick={() => handleWhatsApp(offer.storeName, product.name)}
                        className="h-9 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center justify-center gap-1.5 border border-emerald-500/10 active:scale-95 transition-all"
                      >
                         <span className="material-symbols-outlined text-base fill-icon">chat</span>
                         <span className="text-[8px] font-black uppercase tracking-widest">Chat</span>
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </main>

      {/* Barra de acción persistente inferior para Detalle de Producto */}
      <footer className="fixed bottom-24 left-0 right-0 p-6 z-40 bg-gradient-to-t from-vibe-light via-vibe-light to-transparent dark:from-vibe-dark dark:via-vibe-dark pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button 
            onClick={toggleCart}
            className={`w-full h-16 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] ${inCart ? 'bg-[#0f172a] text-white dark:bg-white dark:text-[#0f172a]' : 'bg-primary text-white shadow-primary-glow'}`}
          >
            <span className="material-symbols-outlined text-2xl">
              {inCart ? 'shopping_cart_checkout' : 'add_shopping_cart'}
            </span>
            {inCart ? 'Ir a Comparar Canasta' : 'Agregar a mi Canasta'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
