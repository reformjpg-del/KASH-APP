
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_PRICES, MOCK_STORES } from '../constants';
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
      const comparisonResults: ComparisonResult[] = MOCK_STORES.map(store => {
        let total = 0;
        let foundCount = 0;
        let missingNames: string[] = [];
        
        cartItems.forEach(item => {
          const priceEntry = MOCK_PRICES.find(p => p.productId === item.id && p.storeName === store.name);
          if (priceEntry) {
            total += priceEntry.priceBs;
            foundCount++;
          } else {
            missingNames.push(item.name);
          }
        });

        return {
          comercio_id: store.id,
          comercio_nombre: store.name,
          comercio_logo: store.logo,
          total_pagar: total,
          items_encontrados: foundCount,
          items_faltantes: cartItems.length - foundCount,
          lista_faltantes: missingNames
        };
      })
      .filter(res => res.items_encontrados > 0)
      .sort((a, b) => {
        if (a.items_faltantes !== b.items_faltantes) return a.items_faltantes - b.items_faltantes;
        return a.total_pagar - b.total_pagar;
      });

      setResults(comparisonResults);
      setLoading(false);
    }, 600);
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar tu canasta de comparación?')) {
      localStorage.setItem('vibe_cart', '[]');
      navigate('/');
    }
  };

  const handleFinishComparison = () => {
    // Registrar el uso en localStorage (simulación de contador global)
    const currentUsage = parseInt(localStorage.getItem('kash_total_comparisons') || '0');
    localStorage.setItem('kash_total_comparisons', (currentUsage + 1).toString());
    
    // Premiar al usuario con puntos por completar una comparativa
    const userPoints = parseInt(localStorage.getItem('vibe_points') || '0');
    localStorage.setItem('vibe_points', (userPoints + 25).toString());

    navigate('/success');
  };

  // Cálculo de ahorro estimado (Comparando el mejor vs el promedio)
  const estimatedSavings = useMemo(() => {
    if (results.length < 2) return 0;
    const avg = results.reduce((acc, curr) => acc + curr.total_pagar, 0) / results.length;
    return avg - results[0].total_pagar;
  }, [results]);

  return (
    <div className="pb-52 min-h-screen bg-[#F4F7F9] dark:bg-vibe-dark transition-all duration-500">
      {/* Header Estilo Referencia */}
      <header className="px-6 pt-10 pb-4 sticky top-0 bg-[#F4F7F9]/90 dark:bg-vibe-dark/90 backdrop-blur-xl z-50">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
             <h1 className="text-[22px] font-[900] tracking-tight text-[#1A1C1E] dark:text-white leading-tight">Comparativa Local</h1>
             <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#9EA7AF] dark:text-vibe-sub/60">TIENDAS VERIFICADAS</p>
          </div>
          <button 
            onClick={handleClearCart}
            className="bg-red-50 dark:bg-red-500/10 text-red-500 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2 border border-red-100 dark:border-red-500/20 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
            VACIAR
          </button>
        </div>
      </header>

      <main className="px-5 pt-4 space-y-4">
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
             <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
             <p className="text-[10px] font-black uppercase tracking-widest text-vibe-sub/40">Analizando precios...</p>
          </div>
        ) : (
          <>
            {results.map((res, i) => {
              const isBest = i === 0;
              return (
                <div 
                  key={res.comercio_id}
                  className={`
                    bg-white dark:bg-vibe-card rounded-[2.2rem] p-5 shadow-sm border transition-all duration-300 animate-in fade-in slide-in-from-bottom-2
                    ${isBest ? 'border-primary ring-2 ring-primary/10 shadow-primary-glow/15 scale-[1.02]' : 'border-black/[0.04] dark:border-white/[0.04]'}
                  `}
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                >
                  {/* Top Row: Logo | Info | Price */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-16 h-16 rounded-2xl bg-[#F8FAFB] dark:bg-vibe-dark flex items-center justify-center p-1.5 border border-black/[0.03] shrink-0">
                        <img src={res.comercio_logo} className="w-full h-full object-cover rounded-xl" alt="" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <h4 className="text-[18px] font-[900] tracking-tight text-[#1A1C1E] dark:text-white truncate">
                            {res.comercio_nombre}
                          </h4>
                          {isBest && (
                            <span className="material-symbols-outlined text-primary fill-icon text-[18px] drop-shadow-sm">grade</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                           {isBest && (
                             <div className="bg-[#00A86B] text-white px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest leading-none">
                               MEJOR PRECIO
                             </div>
                           )}
                           <p className="text-[10px] font-black text-[#9EA7AF] dark:text-vibe-sub/50 uppercase tracking-[0.1em]">
                             MARACAY • {MOCK_STORES.find(s => s.id === res.comercio_id)?.distance || '0.5 KM'}
                           </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className={`text-[19px] font-[900] tabular-nums tracking-tighter ${isBest ? 'text-primary' : 'text-[#1A1C1E] dark:text-white'}`}>
                        Bs. {res.total_pagar.toLocaleString('es-VE')}
                      </p>
                      <p className="text-[8px] font-black text-[#9EA7AF] dark:text-vibe-sub/40 uppercase tracking-widest mt-1">
                        HACE POCOS MINUTOS
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      className="h-11 bg-[#F0F4FF] dark:bg-blue-500/10 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all group border border-blue-500/5"
                    >
                       <span className="material-symbols-outlined text-[18px] text-[#4C6FFF] fill-icon">near_me</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#4C6FFF]">MAPA</span>
                    </button>
                    <button 
                      className="h-11 bg-[#E7F8F1] dark:bg-green-500/10 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all group border border-green-500/5"
                    >
                       <span className="material-symbols-outlined text-[18px] text-[#00A86B] fill-icon">chat</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#00A86B]">CHAT</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {results.length > 0 && (
              <div className="pt-8 pb-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 animate-bounce">
                    <p className="text-[10px] font-[900] text-[#00A86B] uppercase tracking-[0.2em]">
                      Ahorras aprox. Bs. {estimatedSavings.toFixed(0)} hoy
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleFinishComparison}
                    className="w-full h-18 bg-[#001B44] dark:bg-white text-white dark:text-[#001B44] rounded-[2.2rem] font-black uppercase tracking-[0.4em] text-[12px] flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] transition-all relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative z-10">TERMINAR COMPARATIVA</span>
                    <span className="material-symbols-outlined fill-icon text-xl text-primary relative z-10 animate-pulse">verified</span>
                  </button>
                  
                  <p className="text-center text-[9px] font-[800] text-vibe-sub/40 uppercase tracking-[0.25em] max-w-[200px] leading-relaxed">
                    Al terminar, tu ahorro será registrado en el Ranking KASH
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {cartItems.length === 0 && (
          <div className="py-24 flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary/40 mb-6">
                <span className="material-symbols-outlined text-4xl">shopping_cart</span>
             </div>
             <p className="text-sm font-[800] text-vibe-sub/60">Agrega productos para comparar</p>
             <button onClick={() => navigate('/')} className="mt-6 text-primary text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4">Ir a comprar</button>
          </div>
        )}
      </main>

      {/* Floating Back Button */}
      <div className="fixed bottom-28 left-6 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-14 h-14 rounded-full bg-white dark:bg-vibe-card shadow-2xl border border-black/[0.05] dark:border-white/[0.1] flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[#9EA7AF] text-3xl">arrow_back</span>
        </button>
      </div>
    </div>
  );
};

export default CartComparison;
