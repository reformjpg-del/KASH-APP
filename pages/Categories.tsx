
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { CATEGORIES_CONFIG } from '../constants';

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES_CONFIG.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark">
      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/90 dark:bg-vibe-dark/90 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card shadow-sm border border-black/[0.04] dark:border-white/[0.04]"
          >
            <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tighter">Explorar</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Todas las Categorías</p>
          </div>
        </div>

        <div className="relative">
          <input 
            type="text"
            placeholder="Buscar categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 bg-white dark:bg-vibe-card rounded-2xl border-none shadow-vibe px-12 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-vibe-sub/40">search</span>
        </div>
      </header>

      <main className="px-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredCategories.map((cat, i) => (
            <button 
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="bg-white dark:bg-vibe-card rounded-[2.5rem] p-6 flex flex-col items-center text-center gap-4 border border-black/[0.02] dark:border-white/[0.04] shadow-vibe active:scale-95 transition-all group animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
            >
              <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-500`}>
                <span className="material-symbols-outlined text-3xl fill-icon">{cat.icon}</span>
              </div>
              <div>
                <p className="font-black text-sm tracking-tight mb-1">{cat.name}</p>
                <div className="flex items-center justify-center gap-1.5 opacity-40">
                   <span className="w-1 h-1 bg-current rounded-full" />
                   <p className="text-[9px] font-black uppercase tracking-widest">{cat.count} items</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-20 flex flex-col items-center text-center opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
            <p className="font-bold">No encontramos esa categoría</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Categories;
