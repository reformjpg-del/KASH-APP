
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES_CONFIG, MOCK_PRODUCTS, MOCK_PRICES } from '../constants';
import BottomNav from '../components/BottomNav';

const CategoryDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [localSearch, setLocalSearch] = useState('');

  const category = useMemo(() => 
    CATEGORIES_CONFIG.find(c => c.id === id) || CATEGORIES_CONFIG[0]
  , [id]);

  const isMedicamentos = id === '1';

  const categoryProducts = useMemo(() => 
    MOCK_PRODUCTS.filter(p => p.category === id)
  , [id]);

  const filteredProducts = useMemo(() => {
    let list = categoryProducts;
    if (localSearch) {
      list = list.filter(p => p.name.toLowerCase().includes(localSearch.toLowerCase()));
    }
    return list.map(product => {
      const prices = MOCK_PRICES.filter(p => p.productId === product.id);
      const bestPrice = prices.length > 0 
        ? prices.sort((a, b) => a.priceBs - b.priceBs)[0] 
        : null;
      return { ...product, bestPrice };
    });
  }, [categoryProducts, localSearch]);

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-colors duration-500">
      {/* Background Accent Gradient */}
      <div 
        className="fixed top-0 left-0 w-full h-64 opacity-10 pointer-events-none" 
        style={{ background: `linear-gradient(180deg, ${category.accent} 0%, transparent 100%)` }} 
      />

      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 border-b border-black/[0.03] dark:border-white/[0.03]">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card shadow-sm border border-black/[0.04] dark:border-white/[0.04] active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-black tracking-tighter">{category.name}</h1>
            <div className="flex items-center gap-2">
               <span className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: category.accent }}></span>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Canal Comunitario</p>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${category.color} shadow-sm`}>
             <span className="material-symbols-outlined text-2xl fill-icon">{category.icon}</span>
          </div>
        </div>

        <div className="relative mb-5 group">
          <input 
            type="text"
            placeholder={`Buscar en ${category.name.toLowerCase()}...`}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full h-12 bg-black/[0.03] dark:bg-white/[0.04] rounded-xl border-none px-11 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-vibe-sub/40"
          />
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-vibe-sub/40 group-focus-within:text-primary transition-colors">search</span>
          {localSearch && (
            <button onClick={() => setLocalSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-vibe-sub/40">
               <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {(isMedicamentos ? ['Todos', 'Venta Libre', 'Con Récipe', 'Genéricos', 'Ofertas'] : ['Todos', 'En Oferta', 'Más Vendidos', 'Recientes']).map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`h-9 px-5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-primary text-white shadow-primary-glow' 
                  : 'bg-white dark:bg-vibe-card text-vibe-sub/60 border border-black/[0.04] dark:border-white/[0.04] shadow-sm'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <main className="px-6 py-6 relative z-10">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((item, i) => (
              <div 
                key={item.id}
                onClick={() => navigate(item.bestPrice ? `/product/${item.bestPrice.id}` : '#')}
                className="bg-white dark:bg-vibe-card rounded-3xl p-4 border border-black/[0.03] dark:border-white/[0.03] shadow-vibe group active:scale-[0.97] transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-vibe-light dark:bg-vibe-dark">
                  <img 
                    src={item.imageUrl} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={item.name} 
                  />
                  {item.bestPrice && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg z-10">
                      Best Price
                    </div>
                  )}
                  {isMedicamentos && item.description.includes('Requiere récipe') && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-[10px] font-black text-white uppercase tracking-widest text-center px-4">Requiere Récipe Médico</span>
                    </div>
                  )}
                </div>
                
                <div className="px-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[9px] font-black uppercase text-vibe-sub/60 tracking-widest truncate max-w-[70%]">{item.presentation}</p>
                    {isMedicamentos && <span className="material-symbols-outlined text-[12px] text-blue-500 fill-icon">health_and_safety</span>}
                  </div>
                  <h4 className="text-sm font-extrabold tracking-tight truncate mb-2">{item.name}</h4>
                  
                  <div className="flex items-center justify-between mt-3">
                     <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase tracking-wider opacity-40">Mejor Opción</span>
                        <p className="text-primary font-black text-lg tracking-tighter leading-none">
                          {item.bestPrice ? `Bs. ${item.bestPrice.priceBs.toFixed(0)}` : 'S/P'}
                        </p>
                     </div>
                     <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-[2rem] bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 border border-black/[0.03] dark:border-white/[0.03]">
              <span className="material-symbols-outlined text-4xl opacity-20">search_off</span>
            </div>
            <h4 className="font-black text-lg tracking-tight">No hay coincidencias</h4>
            <p className="text-xs font-medium text-vibe-sub px-10 mt-2 leading-relaxed">
              No encontramos productos que coincidan con tu búsqueda en esta categoría.
            </p>
            <button 
              onClick={() => setLocalSearch('')}
              className="mt-8 h-12 px-6 bg-vibe-dark dark:bg-white text-white dark:text-vibe-dark rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Community Info Box */}
        <div className="mt-12 p-8 bg-white dark:bg-vibe-card rounded-[3rem] border border-black/[0.03] dark:border-white/[0.03] shadow-vibe relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined fill-icon">volunteer_activism</span>
             </div>
             <h3 className="text-lg font-black tracking-tight mb-2">Precios validados</h3>
             <p className="text-xs text-vibe-sub/80 font-medium leading-relaxed mb-6 px-4">
               Los precios en esta categoría son verificados diariamente por farmacéuticos y vecinos de la comunidad.
             </p>
             <button onClick={() => navigate('/report')} className="h-12 w-full bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-primary-glow active:scale-[0.98] transition-all">
               Reportar Precio Ahora
             </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CategoryDetail;
