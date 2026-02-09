
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_PRICES } from '../constants';
import BottomNav from '../components/BottomNav';
import { Product } from '../types';

const SavedItems: React.FC = () => {
  const navigate = useNavigate();
  // Simulamos que algunos productos están en guardados. En un caso real vendría de localStorage o API.
  const [savedItems, setSavedItems] = useState<Product[]>(() => {
    const savedIds = JSON.parse(localStorage.getItem('vibe_cart') || '[]');
    if (savedIds.length > 0) {
      return MOCK_PRODUCTS.filter(p => savedIds.includes(p.id));
    }
    return MOCK_PRODUCTS.slice(0, 5); // Mock inicial si no hay nada en carrito
  });

  const [activeStoreFilter, setActiveStoreFilter] = useState('Todas');

  // Obtener lista única de tiendas que venden los productos guardados
  const availableStores = useMemo(() => {
    const storeSet = new Set<string>();
    savedItems.forEach(item => {
      const itemPrices = MOCK_PRICES.filter(p => p.productId === item.id);
      itemPrices.forEach(p => storeSet.add(p.storeName));
    });
    return ['Todas', ...Array.from(storeSet).sort()];
  }, [savedItems]);

  // Filtrar los productos según la tienda seleccionada
  const filteredItems = useMemo(() => {
    if (activeStoreFilter === 'Todas') return savedItems;
    return savedItems.filter(item => 
      MOCK_PRICES.some(p => p.productId === item.id && p.storeName === activeStoreFilter)
    );
  }, [savedItems, activeStoreFilter]);

  const removeSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems(prev => prev.filter(p => p.id !== id));
    // Actualizar también localStorage si es persistente
  };

  const getBestPrice = (productId: string) => {
    const prices = MOCK_PRICES.filter(p => p.productId === productId);
    if (activeStoreFilter !== 'Todas') {
      const storeSpecific = prices.find(p => p.storeName === activeStoreFilter);
      return storeSpecific || (prices.length > 0 ? prices.sort((a, b) => a.priceBs - b.priceBs)[0] : null);
    }
    return prices.length > 0 ? prices.sort((a, b) => a.priceBs - b.priceBs)[0] : null;
  };

  return (
    <div className="pb-44 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      <header className="px-6 pt-10 pb-4 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 border-b border-black/[0.03] dark:border-white/[0.03]">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          <div className="flex-1">
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 leading-none mb-1">Lista de</h2>
             <p className="text-sm font-black tracking-tight">Guardados</p>
          </div>
          <button 
            onClick={() => navigate('/cart-comparison')}
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 active:scale-90 transition-transform shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px] fill-icon">shopping_cart</span>
          </button>
        </div>

        {/* Nuevo Filtro por Tienda */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 -mx-2 px-2">
          {availableStores.map((store) => (
            <button
              key={store}
              onClick={() => setActiveStoreFilter(store)}
              className={`px-5 h-9 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 border ${
                activeStoreFilter === store 
                  ? 'bg-primary text-white border-primary shadow-primary-glow' 
                  : 'bg-white dark:bg-vibe-card text-vibe-sub/60 border-black/[0.05] dark:border-white/[0.05] shadow-sm'
              }`}
            >
              {store}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6">
        <div className="flex justify-between items-end mb-8 px-1">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">Mi Colección</h1>
            <p className="text-[11px] font-bold text-vibe-sub/60 uppercase tracking-widest mt-1">
              {filteredItems.length} {filteredItems.length === 1 ? 'producto' : 'productos'} {activeStoreFilter !== 'Todas' ? `en ${activeStoreFilter}` : 'monitoreados'}
            </p>
          </div>
          <button 
            onClick={() => navigate('/cart-comparison')}
            className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-xl active:scale-95 transition-all"
          >
            Comparar Todo
          </button>
        </div>

        <div className="space-y-4">
          {filteredItems.map((product, i) => {
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
                      onClick={(e) => removeSaved(product.id, e)}
                      className="text-primary active:scale-125 transition-transform"
                    >
                      <span className="material-symbols-outlined fill-icon text-[20px]">bookmark</span>
                    </button>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest opacity-40">
                        {activeStoreFilter !== 'Todas' ? `Precio en ${activeStoreFilter}` : 'Mejor Precio'}
                      </span>
                      <p className="text-primary font-black text-base tracking-tighter leading-none">
                        {bestPrice ? `Bs. ${bestPrice.priceBs.toFixed(0)}` : 'S/P'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-40">
                       <span className="material-symbols-outlined text-[14px]">storefront</span>
                       <span className="text-[9px] font-bold truncate max-w-[60px]">{bestPrice?.storeName || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="py-24 flex flex-col items-center text-center px-10">
              <div className="w-20 h-20 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary/30 mb-6">
                <span className="material-symbols-outlined text-4xl">search_off</span>
              </div>
              <h4 className="text-xl font-black tracking-tighter mb-2">Sin resultados aquí</h4>
              <p className="text-sm text-vibe-sub/60 font-medium leading-relaxed">
                No tienes productos guardados que se vendan en <strong>{activeStoreFilter}</strong>.
              </p>
              <button 
                onClick={() => setActiveStoreFilter('Todas')}
                className="mt-8 px-8 h-12 bg-vibe-dark dark:bg-white text-white dark:text-vibe-dark rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95 transition-all"
              >
                Ver todos mis guardados
              </button>
            </div>
          )}

          {savedItems.length === 0 && (
            <div className="py-24 flex flex-col items-center text-center px-10">
              <div className="w-20 h-20 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary/30 mb-6">
                <span className="material-symbols-outlined text-4xl">bookmark_border</span>
              </div>
              <h4 className="text-xl font-black tracking-tighter mb-2">Nada guardado aún</h4>
              <p className="text-sm text-vibe-sub/60 font-medium leading-relaxed">
                Guarda tus productos más comprados para monitorear sus precios y disponibilidad rápidamente.
              </p>
              <button 
                onClick={() => navigate('/search')}
                className="mt-8 px-8 h-12 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-primary-glow active:scale-95 transition-all"
              >
                Explorar Productos
              </button>
            </div>
          )}
        </div>

        {/* Community Insight */}
        {filteredItems.length > 0 && (
          <div className="mt-12 p-8 bg-primary/[0.03] dark:bg-primary/[0.05] rounded-[2.5rem] border border-primary/10 flex flex-col items-center text-center">
             <div className="w-12 h-12 rounded-2xl bg-white dark:bg-vibe-card flex items-center justify-center text-primary shadow-sm mb-4">
                <span className="material-symbols-outlined fill-icon">insights</span>
             </div>
             <h5 className="font-black text-sm tracking-tight mb-2">Análisis de Ahorro</h5>
             <p className="text-[11px] font-medium text-vibe-sub/80 leading-relaxed max-w-[220px]">
               Mantener estos productos guardados te ayuda a ahorrar un estimado de **Bs. 450** al mes.
             </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default SavedItems;
