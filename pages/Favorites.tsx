
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_PRICES } from '../constants';
import BottomNav from '../components/BottomNav';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  // Simulamos que algunos productos están en favoritos
  const [favorites, setFavorites] = useState(MOCK_PRODUCTS.slice(0, 3));

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  const getBestPrice = (productId: string) => {
    const prices = MOCK_PRICES.filter(p => p.productId === productId);
    return prices.length > 0 ? prices.sort((a, b) => a.priceBs - b.priceBs)[0] : null;
  };

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 flex items-center border-b border-black/[0.03] dark:border-white/[0.03]">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <div className="flex-1 text-center pr-11">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 leading-none mb-1">Guardados</h2>
           <p className="text-sm font-black tracking-tight">Favoritos</p>
        </div>
      </header>

      <main className="p-6">
        <div className="flex justify-between items-end mb-8 px-1">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">Mi Lista</h1>
            <p className="text-[11px] font-bold text-vibe-sub/60 uppercase tracking-widest mt-1">
              {favorites.length} productos monitoreados
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {favorites.map((product, i) => {
            const bestPrice = getBestPrice(product.id);
            return (
              <div 
                key={product.id}
                onClick={() => bestPrice && navigate(`/product/${bestPrice.id}`)}
                className="bg-white dark:bg-vibe-card rounded-[2.2rem] p-5 border border-black/[0.03] dark:border-white/[0.04] shadow-vibe flex items-center gap-5 group active:scale-[0.98] transition-all animate-in fade-in slide-in-from-bottom-3"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="w-20 h-20 rounded-[1.5rem] bg-vibe-light dark:bg-vibe-dark overflow-hidden shrink-0 relative border border-black/[0.02]">
                  <img src={product.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-sm tracking-tight truncate leading-tight group-hover:text-primary transition-colors">{product.name}</h4>
                      <p className="text-[9px] font-black text-vibe-sub/50 uppercase tracking-widest mt-0.5">{product.presentation}</p>
                    </div>
                    <button 
                      onClick={(e) => removeFavorite(product.id, e)}
                      className="text-primary active:scale-125 transition-transform"
                    >
                      <span className="material-symbols-outlined fill-icon text-[20px]">favorite</span>
                    </button>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Mejor Precio</span>
                      <p className="text-primary font-black text-lg tracking-tighter leading-none tabular-nums">
                        {bestPrice ? `Bs. ${bestPrice.priceBs.toLocaleString('es-VE')}` : 'S/P'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Favorites;
