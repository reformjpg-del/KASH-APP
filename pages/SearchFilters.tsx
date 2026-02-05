
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES_CONFIG } from '../constants';

const SearchFilters: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Recuperar filtros existentes si los hay para mantener consistencia
  const existingFilters = location.state?.filters || {};
  const currentQuery = location.state?.query || '';

  const [distance, setDistance] = useState(existingFilters.distance || 15);
  const [minPrice, setMinPrice] = useState(existingFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(existingFilters.maxPrice || '');
  const [sortBy, setSortBy] = useState(existingFilters.sortBy || 'cheapest');
  const [selectedCats, setSelectedCats] = useState<string[]>(existingFilters.categories || []);
  const [stockOnly, setStockOnly] = useState(existingFilters.stockOnly || false);

  const toggleCategory = (id: string) => {
    setSelectedCats(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const sortOptions = [
    { id: 'cheapest', label: 'Menor Precio', icon: 'payments' },
    { id: 'closest', label: 'Más Cercano', icon: 'near_me' },
    { id: 'popular', label: 'Más Popular', icon: 'trending_up' }
  ];

  const applyFilters = () => {
    const filters = {
      distance,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      sortBy,
      categories: selectedCats,
      stockOnly
    };

    navigate('/search', { 
      state: { 
        filters,
        query: currentQuery 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-vibe-light dark:bg-vibe-dark flex flex-col transition-all duration-500">
      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 flex items-center justify-between border-b border-black/[0.03] dark:border-white/[0.03]">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
        <div className="text-center">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 leading-none mb-1">Ajustar</h2>
           <p className="text-xs font-black tracking-tight">Filtros de Búsqueda</p>
        </div>
        <button 
          onClick={() => {
            setDistance(15);
            setSortBy('cheapest');
            setSelectedCats([]);
            setStockOnly(false);
            setMinPrice('');
            setMaxPrice('');
          }}
          className="text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-primary/5 rounded-lg active:scale-90 transition-all"
        >
          Limpiar
        </button>
      </header>

      <main className="flex-1 p-6 overflow-y-auto pb-40 space-y-10">
        {/* Ordenar por */}
        <section className="animate-in fade-in slide-in-from-bottom-2">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 mb-5 px-1">Ordenar resultados por</h3>
          <div className="grid grid-cols-3 gap-3">
            {sortOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id)}
                className={`flex flex-col items-center justify-center gap-2 h-24 rounded-[1.8rem] border transition-all duration-300 ${
                  sortBy === opt.id 
                    ? 'bg-primary border-primary text-white shadow-primary-glow scale-105' 
                    : 'bg-white dark:bg-vibe-card border-black/[0.03] dark:border-white/[0.03] text-vibe-sub'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${sortBy === opt.id ? 'fill-icon' : ''}`}>{opt.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-center px-2">{opt.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Distancia */}
        <section className="bg-white dark:bg-vibe-card rounded-[2.5rem] p-7 border border-black/[0.03] dark:border-white/[0.03] shadow-vibe animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex justify-between items-end mb-6">
            <div className="flex flex-col">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Radio de búsqueda</h3>
              <p className="text-[9px] font-bold text-vibe-sub/30 uppercase mt-0.5">Desde tu ubicación actual</p>
            </div>
            <div className="bg-primary/10 px-3 py-1 rounded-lg">
              <span className="text-lg font-black text-primary tracking-tighter">{distance} km</span>
            </div>
          </div>
          <div className="relative flex items-center h-6">
            <div className="absolute w-full h-1.5 bg-vibe-light dark:bg-white/5 rounded-full" />
            <div 
              className="absolute h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(249,97,21,0.3)]" 
              style={{ width: `${(distance / 50) * 100}%` }} 
            />
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value))}
              className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
            />
          </div>
          <div className="flex justify-between mt-4 text-[8px] font-black uppercase tracking-[0.2em] opacity-30">
            <span>1 km</span>
            <span>25 km</span>
            <span>50 km</span>
          </div>
        </section>

        {/* Rango de Precio */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 mb-5 px-1">Rango de precio (Bs.)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-vibe-card rounded-2xl p-5 border border-black/[0.03] dark:border-white/[0.03] shadow-sm focus-within:border-primary/40 transition-all">
               <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2">Mínimo</p>
               <div className="flex items-center gap-2">
                  <span className="text-xs font-black opacity-30">Bs.</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-xl font-black tracking-tighter p-0 placeholder:opacity-10"
                  />
               </div>
            </div>
            <div className="bg-white dark:bg-vibe-card rounded-2xl p-5 border border-black/[0.03] dark:border-white/[0.03] shadow-sm focus-within:border-primary/40 transition-all">
               <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2">Máximo</p>
               <div className="flex items-center gap-2">
                  <span className="text-xs font-black opacity-30">Bs.</span>
                  <input 
                    type="number" 
                    placeholder="Sin tope"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-xl font-black tracking-tighter p-0 placeholder:opacity-10"
                  />
               </div>
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="flex justify-between items-center mb-5 px-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Categorías</h3>
            <span className="text-[9px] font-black text-primary uppercase">{selectedCats.length} seleccionadas</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`h-11 px-5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 transition-all duration-300 border ${
                  selectedCats.includes(cat.id)
                    ? 'bg-primary/10 border-primary text-primary shadow-sm'
                    : 'bg-white dark:bg-vibe-card border-black/[0.03] dark:border-white/[0.04] text-vibe-sub/60'
                }`}
              >
                <span className={`material-symbols-outlined text-[16px] ${selectedCats.includes(cat.id) ? 'fill-icon' : ''}`}>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Disponibilidad */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
          <div 
            onClick={() => setStockOnly(!stockOnly)}
            className={`bg-white dark:bg-vibe-card rounded-[1.8rem] p-6 border flex items-center justify-between cursor-pointer transition-all ${stockOnly ? 'border-primary/30 ring-1 ring-primary/5 shadow-primary-glow/5' : 'border-black/[0.03] dark:border-white/[0.03]'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${stockOnly ? 'bg-primary text-white' : 'bg-vibe-light dark:bg-white/5 text-vibe-sub/40'}`}>
                <span className={`material-symbols-outlined ${stockOnly ? 'fill-icon' : ''}`}>inventory_2</span>
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm tracking-tight">Disponible Ahora</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-vibe-sub/40 mt-0.5">Ocultar productos agotados</p>
              </div>
            </div>
            <div className={`w-14 h-8 rounded-full p-1 transition-all flex items-center ${stockOnly ? 'bg-primary justify-end' : 'bg-black/10 dark:bg-white/10 justify-start'}`}>
              <div className="h-full aspect-square bg-white rounded-full shadow-md transition-transform" />
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-vibe-light/80 dark:bg-vibe-dark/80 backdrop-blur-xl border-t border-black/[0.03] dark:border-white/[0.03] z-[100]">
        <div className="max-w-md mx-auto">
          <button 
            onClick={applyFilters}
            className="w-full h-16 bg-gradient-to-br from-primary via-primary to-orange-600 text-white rounded-[2rem] font-black uppercase tracking-[0.25em] text-[11px] shadow-[0_20px_40px_-10px_rgba(249,97,21,0.5)] border border-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Aplicar Cambios
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SearchFilters;
