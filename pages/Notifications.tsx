
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_NOTIFICATIONS } from '../constants';
import BottomNav from '../components/BottomNav';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'settings'>('all');
  
  const [settings, setSettings] = useState({
    priceDrops: true,
    community: true,
    system: false
  });

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark">
      <header className="px-4 pt-10 pb-4 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 border-b border-black/[0.03]">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card shadow-sm border border-black/[0.04] dark:border-white/[0.04]">
            <span className="material-symbols-outlined text-lg">arrow_back_ios_new</span>
          </button>
          <div className="flex-1">
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 leading-none mb-1">Centro de</h2>
             <p className="text-sm font-extrabold tracking-tight">Notificaciones</p>
          </div>
        </div>

        <div className="flex p-1 bg-vibe-light dark:bg-white/5 rounded-2xl gap-1">
           <button 
             onClick={() => setActiveTab('all')}
             className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-white dark:bg-vibe-card text-primary shadow-sm' : 'text-vibe-sub/50'}`}
           >
             Mensajes
           </button>
           <button 
             onClick={() => setActiveTab('settings')}
             className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-white dark:bg-vibe-card text-primary shadow-sm' : 'text-vibe-sub/50'}`}
           >
             Ajustes
           </button>
        </div>
      </header>

      <main className="p-5 flex flex-col gap-6">
        {activeTab === 'all' ? (
          <>
            <div className="flex justify-between items-center px-1">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Recientes</h3>
               <button className="text-primary text-[10px] font-black uppercase tracking-widest">Marcar leído</button>
            </div>

            <div className="flex flex-col gap-3">
              {MOCK_NOTIFICATIONS.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => notif.productId && navigate(`/product/${notif.productId}`)}
                  className={`rounded-[2rem] p-5 bg-white dark:bg-vibe-card border transition-all cursor-pointer shadow-vibe relative overflow-hidden group active:scale-[0.98] ${!notif.isRead ? 'border-primary/20 ring-1 ring-primary/5' : 'border-black/[0.03] dark:border-white/[0.03]'}`}
                >
                  {!notif.isRead && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full shadow-primary-glow" />
                  )}
                  
                  <div className="flex gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notif.type === 'price_drop' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-primary/10 text-primary'}`}>
                      {notif.type === 'price_drop' ? (
                        <span className="material-symbols-outlined fill-icon text-2xl">trending_down</span>
                      ) : (
                        <span className="material-symbols-outlined fill-icon text-2xl">stars</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-extrabold text-sm tracking-tight truncate pr-4">{notif.title}</p>
                        <span className="text-[9px] font-bold text-vibe-sub/40 uppercase whitespace-nowrap">{notif.date}</span>
                      </div>
                      <p className="text-vibe-sub dark:text-gray-400 text-xs font-medium leading-relaxed mb-3">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
             <div className="bg-white dark:bg-vibe-card rounded-[2.5rem] border border-black/[0.03] dark:border-white/[0.03] overflow-hidden divide-y divide-black/[0.01] dark:divide-white/[0.01]">
                {[
                  { id: 'priceDrops', label: 'Bajas de Precio', icon: 'trending_down', desc: 'Alertas en tus favoritos' },
                  { id: 'community', label: 'Reportes Locales', icon: 'groups', desc: 'Precios cerca de ti' },
                  { id: 'system', label: 'Actualizaciones', icon: 'bolt', desc: 'Novedades de KASH' }
                ].map((item) => (
                  <div key={item.id} className="p-6 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-vibe-light dark:bg-vibe-dark flex items-center justify-center text-primary">
                           <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        </div>
                        <div>
                           <p className="font-extrabold text-sm tracking-tight">{item.label}</p>
                           <p className="text-[9px] font-bold text-vibe-sub/40 uppercase tracking-widest mt-0.5">{item.desc}</p>
                        </div>
                     </div>
                     <button 
                       onClick={() => setSettings(prev => ({...prev, [item.id]: !prev[item.id as keyof typeof settings]}))}
                       className={`w-12 h-7 rounded-full p-1 transition-all flex items-center ${settings[item.id as keyof typeof settings] ? 'bg-primary justify-end' : 'bg-black/10 dark:bg-white/10 justify-start'}`}
                     >
                        <div className="h-full aspect-square bg-white rounded-full shadow-sm" />
                     </button>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Notifications;
