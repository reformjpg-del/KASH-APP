
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

interface Store {
  id: string;
  name: string;
  type: string;
  location: string;
  distance: string;
  isOpen: boolean;
  savingsLevel: 'high' | 'medium' | 'low';
  imageUrl: string;
  isFavorite: boolean;
}

const SavedStores: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Todas');
  
  const [stores, setStores] = useState<Store[]>([
    {
      id: 's1',
      name: 'Farmatodo',
      type: 'Farmacia / Market',
      location: 'Los Palos Grandes',
      distance: '0.8 km',
      isOpen: true,
      savingsLevel: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=400&h=400&auto=format&fit=crop',
      isFavorite: true
    },
    {
      id: 's2',
      name: 'Locatel',
      type: 'Salud / Bienestar',
      location: 'Chacao',
      distance: '1.5 km',
      isOpen: true,
      savingsLevel: 'medium',
      imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=400&h=400&auto=format&fit=crop',
      isFavorite: true
    },
    {
      id: 's3',
      name: 'Central Madeirense',
      type: 'Supermercado',
      location: 'Altamira',
      distance: '2.1 km',
      isOpen: false,
      savingsLevel: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&h=400&auto=format&fit=crop',
      isFavorite: false
    },
    {
      id: 's4',
      name: 'Farmahorro',
      type: 'Farmacia',
      location: 'La Castellana',
      distance: '2.8 km',
      isOpen: true,
      savingsLevel: 'low',
      imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b295f78b?q=80&w=400&h=400&auto=format&fit=crop',
      isFavorite: false
    }
  ]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStores(prev => prev.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s));
  };

  const filteredStores = activeFilter === 'Favoritas' 
    ? stores.filter(s => s.isFavorite)
    : stores;

  const filters = ['Todas', 'Favoritas', 'Cerca', 'Mejor Precio'];

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 border-b border-black/[0.03] dark:border-white/[0.03]">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          <div className="flex-1">
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 leading-none mb-1">Directorio</h2>
             <p className="text-sm font-black tracking-tight">Tiendas Guardadas</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 h-9 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeFilter === f ? 'bg-primary text-white shadow-primary-glow' : 'bg-white dark:bg-vibe-card text-vibe-sub/60 border border-black/[0.02]'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6">
        <div className="flex justify-between items-end mb-8 px-1">
           <div>
              <h1 className="text-3xl font-black tracking-tighter">Mis Rutas</h1>
              <p className="text-[11px] font-bold text-vibe-sub/60 uppercase tracking-widest mt-1">
                 Establecimientos bajo vigilancia
              </p>
           </div>
           <button className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center active:scale-95">
              <span className="material-symbols-outlined fill-icon">map</span>
           </button>
        </div>

        <div className="space-y-6">
          {filteredStores.map((store, i) => (
            <div 
              key={store.id}
              onClick={() => navigate('/search')}
              className="bg-white dark:bg-vibe-card rounded-[2.8rem] p-5 border border-black/[0.03] dark:border-white/[0.04] shadow-vibe flex flex-col gap-5 group active:scale-[0.98] transition-all animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex gap-5">
                <div className="w-20 h-20 rounded-[1.8rem] bg-vibe-light dark:bg-vibe-dark overflow-hidden shrink-0 relative border border-black/[0.02]">
                  <img src={store.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={store.name} />
                  {!store.isOpen && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                       <span className="text-[8px] font-black text-white uppercase tracking-widest">Cerrado</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-lg tracking-tight truncate leading-tight group-hover:text-primary transition-colors">{store.name}</h4>
                      <p className="text-[9px] font-black text-vibe-sub/50 uppercase tracking-widest mt-0.5">{store.type}</p>
                    </div>
                    <button 
                      onClick={(e) => toggleFavorite(store.id, e)}
                      className={`${store.isFavorite ? 'text-primary' : 'text-vibe-sub/20'} active:scale-125 transition-all`}
                    >
                      <span className={`material-symbols-outlined text-[20px] ${store.isFavorite ? 'fill-icon' : ''}`}>favorite</span>
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                     <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${store.isOpen ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`} />
                        <span className="text-[10px] font-black text-vibe-sub/80 uppercase tracking-tighter">
                          {store.isOpen ? 'Abierto' : 'Cerrado'}
                        </span>
                     </div>
                     <div className="flex items-center gap-1.5 text-vibe-sub/40">
                        <span className="material-symbols-outlined text-[14px]">near_me</span>
                        <span className="text-[10px] font-bold">{store.distance}</span>
                     </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-black/[0.02] dark:border-white/[0.02]">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Nivel de Ahorro</span>
                    <div className="flex gap-0.5 mt-1">
                       {[1,2,3].map(step => (
                         <div key={step} className={`w-6 h-1 rounded-full ${
                           store.savingsLevel === 'high' ? 'bg-green-500' : 
                           store.savingsLevel === 'medium' && step < 3 ? 'bg-orange-400' : 
                           step === 1 ? 'bg-red-400' : 'bg-black/5 dark:bg-white/5'
                         }`} />
                       ))}
                    </div>
                 </div>
                 <button className="h-10 px-5 bg-vibe-light dark:bg-white/5 rounded-xl font-black uppercase tracking-widest text-[9px] flex items-center gap-2 group-hover:bg-primary group-hover:text-white transition-all">
                    Ver Catálogo
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                 </button>
              </div>
            </div>
          ))}

          {filteredStores.length === 0 && (
            <div className="py-24 flex flex-col items-center text-center px-10">
              <div className="w-20 h-20 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary/30 mb-6">
                <span className="material-symbols-outlined text-4xl">storefront</span>
              </div>
              <h4 className="text-xl font-black tracking-tighter mb-2">Sin tiendas guardadas</h4>
              <p className="text-sm text-vibe-sub/60 font-medium leading-relaxed">
                Guarda tus establecimientos de confianza para monitorear sus precios y disponibilidad de stock.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="mt-8 px-8 h-12 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-primary-glow active:scale-95 transition-all"
              >
                Explorar Cercanas
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SavedStores;
