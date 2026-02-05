
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_PRICES, CATEGORIES_CONFIG } from '../constants';
import BottomNav from '../components/BottomNav';

const DailyOffers: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('0'); // '0' is "All"

  // Process data to identify offers
  const allOffers = useMemo(() => {
    return MOCK_PRODUCTS.map(product => {
      const prices = MOCK_PRICES.filter(p => p.productId === product.id);
      const bestPrice = prices.length > 0 ? prices.sort((a, b) => a.priceBs - b.priceBs)[0] : null;
      
      // Simulate discount logic for all items in this view
      const discount = Math.floor(Math.random() * 25) + 5;
      const oldPrice = bestPrice ? bestPrice.priceBs * (1 + discount / 100) : 0;
      
      return { 
        ...product, 
        bestPrice, 
        discount, 
        oldPrice 
      };
    }).filter(item => item.bestPrice);
  }, []);

  const filteredOffers = useMemo(() => {
    if (activeTab === '0') return allOffers;
    return allOffers.filter(offer => offer.category === activeTab);
  }, [activeTab, allOffers]);

  const tabs = [
    { id: '0', name: 'Todas', icon: 'apps' },
    ...CATEGORIES_CONFIG.slice(0, 4)
  ];

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-80 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none" />

      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 border-b border-black/[0.03] dark:border-white/[0.03]">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-11 h-11 flex items-center justify-center rounded-lg bg-white dark:bg-vibe-card shadow-sm border border-black/[0.04] dark:border-white/[0.04] active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-lg">arrow_back_ios_new</span>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-black tracking-tighter">Ofertas del día</h1>
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Flash Sale • Finaliza en 04:19:42</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`h-10 px-5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-primary-glow scale-105' 
                  : 'bg-white dark:bg-vibe-card text-vibe-sub/60 border border-black/[0.04] dark:border-white/[0.04] shadow-sm'
              }`}
            >
              {tab.id !== '0' && <span className="material-symbols-outlined text-[16px] fill-icon">{tab.icon}</span>}
              {tab.name}
            </button>
          ))}
        </div>
      </header>

      <main className="px-6 py-8 relative z-10 flex flex-col gap-5">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((item, i) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/product/${item.bestPrice?.id}`)}
              className="bg-white dark:bg-vibe-card rounded-[1.4rem] p-6 border border-black/[0.03] dark:border-white/[0.04] shadow-vibe relative group active:scale-[0.98] transition-all cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
            >
              {/* Promo Badge */}
              <div className="absolute top-0 right-10 bg-gradient-to-br from-red-500 to-orange-500 text-white font-black text-[10px] px-4 py-2 rounded-b-lg uppercase tracking-tighter shadow-lg z-20">
                -{item.discount}% AHORRO
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-28 h-28 rounded-[1rem] overflow-hidden bg-vibe-light dark:bg-vibe-dark shrink-0 relative border border-black/[0.02]">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                </div>
                
                <div className="flex-1 min-w-0 pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest">{item.presentation}</p>
                    <span className="w-1 h-1 bg-black/10 rounded-full" />
                    <span className="text-[9px] font-bold text-vibe-sub/60 uppercase">Verificado</span>
                  </div>
                  <h4 className="text-lg font-black tracking-tight mb-4 truncate group-hover:text-primary transition-colors">{item.name}</h4>
                  
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold line-through opacity-30">Bs. {item.oldPrice.toFixed(0)}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[11px] font-black text-red-500 uppercase">Bs.</span>
                        <span className="text-3xl font-black tracking-tighter text-red-500">
                          {item.bestPrice?.priceBs.toFixed(0)}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">
                       <span className="material-symbols-outlined text-[22px] fill-icon">shopping_cart_checkout</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-5 border-t border-black/[0.03] dark:border-white/[0.03]">
                 <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-vibe-light dark:bg-vibe-dark flex items-center justify-center">
                       <span className="material-symbols-outlined text-[16px] text-vibe-sub">storefront</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[11px] font-black tracking-tight">{item.bestPrice?.storeName}</span>
                       <span className="text-[9px] font-bold text-vibe-sub/40 uppercase tracking-widest">A {item.bestPrice?.distanceKm} km de ti</span>
                    </div>
                 </div>
                 <div className="px-4 py-2 bg-black/[0.03] dark:bg-white/[0.03] rounded-lg flex items-center gap-2">
                    <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Ahorras Bs. {(item.oldPrice - (item.bestPrice?.priceBs || 0)).toFixed(0)}</span>
                 </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl opacity-20">sentiment_dissatisfied</span>
            </div>
            <h4 className="font-black text-xl tracking-tight">Vuelve más tarde</h4>
            <p className="text-sm text-vibe-sub/60 px-10 mt-2 leading-relaxed font-medium">
              Actualmente no hay ofertas activas en esta categoría. ¡Sigue explorando otras secciones!
            </p>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-4 p-8 bg-vibe-dark dark:bg-white rounded-[1.5rem] text-white dark:text-vibe-dark relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col items-center text-center">
             <div className="w-14 h-14 bg-white/10 dark:bg-black/5 rounded-lg flex items-center justify-center mb-6 backdrop-blur-md">
                <span className="material-symbols-outlined text-3xl fill-icon text-primary">verified_user</span>
             </div>
             <h3 className="text-xl font-black tracking-tighter mb-3">Precios 100% Reales</h3>
             <p className="text-xs font-medium opacity-60 leading-relaxed mb-8 px-4">
               Todas las ofertas listadas han sido validadas por miembros de la comunidad en la última hora.
             </p>
             <button 
               onClick={() => navigate('/report')}
               className="h-14 w-full bg-primary text-white rounded-lg text-[11px] font-black uppercase tracking-[0.2em] shadow-primary-glow active:scale-95 transition-all"
             >
               Contribuir con Precio
             </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DailyOffers;
