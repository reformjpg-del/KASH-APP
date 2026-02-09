
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, BCV_RATE, MOCK_PRICES } from '../constants';
import { ComparisonResult } from '../types';

const CartComparison: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ComparisonResult[]>([]);
  
  const cartItems = useMemo(() => {
    const savedIds = JSON.parse(localStorage.getItem('vibe_cart') || '[]');
    return MOCK_PRODUCTS.filter(p => savedIds.includes(p.id));
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      performComparison();
    }
  }, [cartItems]);

  const performComparison = async () => {
    setLoading(true);
    setTimeout(() => {
      const stores = ['Farmatodo', 'Luxor', 'Forum', 'Locatel', 'Bio', 'Traki'];
      const comparisonResults: ComparisonResult[] = stores.map(storeName => {
        let total = 0;
        let found = 0;
        let missingNames: string[] = [];
        cartItems.forEach(item => {
          const price = MOCK_PRICES.find(p => p.productId === item.id && p.storeName === storeName);
          if (price) {
            total += price.priceBs;
            found++;
          } else {
            missingNames.push(item.name);
          }
        });
        return {
          comercio_id: storeName.toLowerCase(),
          comercio_nombre: storeName,
          comercio_logo: storeName === 'Farmatodo' ? 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=200&h=200&auto=format&fit=crop' : `https://picsum.photos/seed/${storeName.toLowerCase()}/200/200`,
          total_pagar: total,
          items_encontrados: found,
          items_faltantes: cartItems.length - found,
          lista_faltantes: missingNames
        };
      }).filter(res => res.items_encontrados > 0)
        .sort((a, b) => {
          if (a.items_faltantes !== b.items_faltantes) return a.items_faltantes - b.items_faltantes;
          return a.total_pagar - b.total_pagar;
        });
      setResults(comparisonResults);
      setLoading(false);
    }, 1500);
  };

  const clearCart = () => {
    localStorage.setItem('vibe_cart', '[]');
    navigate('/');
  };

  return (
    <div className="pb-44 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/90 dark:bg-vibe-dark/90 backdrop-blur-xl z-50 border-b border-black/[0.03] flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] shadow-sm">
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <div className="text-center">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none mb-1">Optimizador</h2>
           <p className="text-sm font-black tracking-tight">Comparar Canasta</p>
        </div>
        <button onClick={clearCart} className="text-red-500 material-symbols-outlined">delete_sweep</button>
      </header>

      <main className="p-6">
        {/* Cart Review Card */}
        <section className="bg-white dark:bg-vibe-card rounded-[2.5rem] p-6 border border-black/[0.03] shadow-vibe mb-12">
          <div className="flex justify-between items-center mb-5">
             <h3 className="font-black text-lg tracking-tight">Mi Carrito Virtual</h3>
             <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{cartItems.length} Items</span>
          </div>
          <div className="flex -space-x-3 mb-6 overflow-x-auto no-scrollbar pb-2">
            {cartItems.map((item, i) => (
              <div key={item.id} className="w-12 h-12 rounded-xl border-2 border-white dark:border-vibe-card overflow-hidden bg-vibe-light shrink-0 shadow-sm" style={{ zIndex: 10 - i }}>
                <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
          {cartItems.length > 0 && (
            <button onClick={performComparison} disabled={loading} className="w-full h-16 bg-vibe-dark dark:bg-white text-white dark:text-vibe-dark rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl">
              {loading ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : "Recalcular Ahorro Real"}
            </button>
          )}
        </section>

        {/* Results List - Pixel Perfect Winner Card */}
        <div className="space-y-12">
          {results.map((res, i) => {
            const isWinner = i === 0 && res.items_faltantes === 0;
            return (
              <div 
                key={res.comercio_id}
                className={`
                  relative rounded-[2.8rem] p-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-6
                  ${isWinner 
                    ? 'mesh-gradient shadow-primary-glow' 
                    : 'bg-white dark:bg-vibe-card border border-black/[0.04] shadow-vibe'
                  }
                `}
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
              >
                {/* Floating Capsule Badge - Pixel Perfect Reference */}
                {isWinner && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-primary px-7 py-3 rounded-full shadow-2xl border border-primary/5 z-20 flex flex-col items-center min-w-[180px]">
                     <span className="text-[10px] font-black uppercase tracking-[0.18em] leading-tight text-primary">TIENDA MÁS</span>
                     <span className="text-[10px] font-black uppercase tracking-[0.18em] leading-tight text-primary">ECONÓMICA</span>
                  </div>
                )}

                <div className="flex justify-between items-center mb-8 pt-2">
                   <div className="flex items-center gap-4">
                      {/* Store Logo with Glass Effect Border */}
                      <div className={`w-24 h-24 rounded-[1.8rem] overflow-hidden p-1.5 shrink-0 ${isWinner ? 'bg-white/20 border border-white/40' : 'bg-vibe-light dark:bg-vibe-dark border border-black/5'}`}>
                         <img src={res.comercio_logo} className="w-full h-full object-cover rounded-[1.4rem]" alt="" />
                      </div>
                      <div className="flex flex-col">
                         <h4 className={`font-black text-[28px] tracking-tighter leading-none ${isWinner ? 'text-white' : 'text-vibe-dark dark:text-white'}`}>
                           {res.comercio_nombre}
                         </h4>
                         <p className={`text-[11px] font-black uppercase tracking-[0.12em] mt-3 ${isWinner ? 'text-white/80' : 'text-vibe-sub/50'}`}>
                           {res.items_encontrados}/{cartItems.length} EN STOCK
                         </p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 opacity-40 ${isWinner ? 'text-white' : 'text-vibe-sub'}`}>TOTAL CANASTA</p>
                      <div className="flex items-baseline justify-end gap-1">
                        <span className={`text-[15px] font-black uppercase ${isWinner ? 'text-white/70' : 'text-primary'}`}>Bs.</span>
                        <p className={`text-4xl font-black tracking-tighter leading-none tabular-nums ${isWinner ? 'text-white' : 'text-primary'}`}>
                          {res.total_pagar.toLocaleString('es-VE')}
                        </p>
                      </div>
                   </div>
                </div>

                {/* Main Divider Style Reference */}
                <div className={`h-[2px] w-full rounded-full mb-10 ${isWinner ? 'bg-white' : 'bg-black/10 dark:bg-white/10'}`} />

                {/* Bottom Action Bar */}
                <div className="flex gap-4">
                   <button className={`flex-1 h-16 rounded-[1.6rem] text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${isWinner ? 'bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white/30' : 'bg-vibe-light dark:bg-white/5 text-vibe-sub'}`}>
                      <span className="material-symbols-outlined text-[22px] fill-icon">map</span>
                      VER MAPA
                   </button>
                   <button 
                    onClick={() => navigate(`/store/${res.comercio_id}`)}
                    className={`flex-1 h-16 rounded-[1.6rem] text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg ${isWinner ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                      VER TIENDA
                   </button>
                </div>

                {/* Items Faltantes Info (If any) */}
                {res.items_faltantes > 0 && (
                   <div className={`mt-6 flex items-center gap-2 px-4 py-3 rounded-2xl ${isWinner ? 'bg-white/10 text-white/80' : 'bg-orange-500/10 text-orange-600'}`}>
                      <span className="material-symbols-outlined text-sm">warning</span>
                      <p className="text-[10px] font-bold uppercase tracking-tight">No tiene: {res.lista_faltantes.slice(0, 2).join(', ')}...</p>
                   </div>
                )}
              </div>
            );
          })}

          {!loading && results.length === 0 && cartItems.length > 0 && (
            <div className="py-24 flex flex-col items-center text-center opacity-30">
               <span className="material-symbols-outlined text-7xl mb-6">explore_off</span>
               <p className="font-black text-xs uppercase tracking-[0.25em] px-12 leading-relaxed">No hay tiendas cercanas registradas con estos productos actualmente.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartComparison;
