
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ALERTS } from '../constants';
import BottomNav from '../components/BottomNav';
import { PriceAlert } from '../types';

const Alerts: React.FC = () => {
  const navigate = useNavigate();
  const [allAlerts, setAllAlerts] = useState<PriceAlert[]>([]);

  useEffect(() => {
    // Cargar alertas locales + mocks
    const localAlerts = JSON.parse(localStorage.getItem('vibe_user_alerts') || '[]');
    setAllAlerts([...localAlerts, ...MOCK_ALERTS]);
  }, []);

  const toggleAlert = (id: string) => {
    const updated = allAlerts.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a);
    setAllAlerts(updated);
    // Nota: Aquí podrías actualizar localStorage si es una alerta local
  };

  return (
    <div className="pb-32 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      <header className="px-4 pt-8 pb-3 flex items-center sticky top-0 bg-vibe-light/80 dark:bg-vibe-dark/80 backdrop-blur-md z-40 border-b border-black/[0.03] dark:border-white/[0.03]">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-lg bg-white dark:bg-vibe-card border border-black/[0.04] dark:border-white/[0.04] active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="flex-1 text-sm font-black uppercase tracking-[0.2em] text-center pr-11 opacity-40">Mis Alertas</h2>
      </header>

      <div className="px-6 pt-10">
        <h1 className="text-4xl font-black tracking-tighter leading-tight mb-2">Monitor de Ahorro</h1>
        <p className="text-vibe-sub dark:text-orange-200/60 font-semibold text-sm leading-relaxed">Te avisaremos inmediatamente cuando tus productos favoritos bajen de precio.</p>
      </div>

      <div className="mt-10 flex flex-col gap-5 px-6">
        {allAlerts.map((alert, i) => (
          <div 
            key={alert.id} 
            className="bg-white dark:bg-vibe-card rounded-xl p-6 shadow-vibe border border-black/[0.03] dark:border-white/[0.03] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-black/[0.05] dark:border-white/[0.05] shrink-0 bg-vibe-light dark:bg-vibe-dark">
                  <img src={alert.imageUrl} className="w-full h-full object-cover" alt={alert.productName} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="font-black text-lg tracking-tight truncate pr-2">{alert.productName}</p>
                  <p className="text-vibe-sub dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">{alert.presentation}</p>
                </div>
              </div>
              <div className="shrink-0">
                <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-gray-100 dark:bg-white/10 p-1 transition-all has-[:checked]:justify-end has-[:checked]:bg-primary">
                  <div className="h-full aspect-square bg-white rounded-full shadow-sm transition-transform"></div>
                  <input 
                    type="checkbox" 
                    checked={alert.isActive} 
                    onChange={() => toggleAlert(alert.id)}
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            <div className={`bg-vibe-light dark:bg-white/[0.03] rounded-lg px-6 py-4 flex justify-between items-center border border-black/[0.03] dark:border-white/[0.03] transition-opacity ${alert.isActive ? 'opacity-100' : 'opacity-40'}`}>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Avisarme si baja de</span>
                <span className={`text-xl font-black mt-0.5 ${alert.isActive ? 'text-primary' : 'text-vibe-sub/40'}`}>
                  Bs. {alert.targetPrice.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${alert.isActive ? 'bg-primary/10 text-primary' : 'bg-black/5 text-vibe-sub/40'}`}>
                <span className="material-symbols-outlined fill-icon text-[20px] transition-transform duration-500">
                  {alert.isActive ? 'notifications_active' : 'notifications_off'}
                </span>
              </div>
            </div>
          </div>
        ))}

        {allAlerts.length === 0 && (
          <div className="py-20 flex flex-col items-center text-center opacity-40">
             <div className="w-20 h-20 rounded-xl bg-black/5 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl">notifications_off</span>
             </div>
             <p className="font-black tracking-tight">No tienes alertas activas</p>
          </div>
        )}
      </div>

      {/* Botón Flotante Mejorado */}
      <div className="fixed bottom-28 left-0 right-0 px-6 z-40 flex justify-center pointer-events-none">
        <button 
          onClick={() => navigate('/add-alert')}
          className="w-full max-w-md h-16 bg-gradient-to-br from-primary via-primary to-orange-600 text-white rounded-xl font-black uppercase tracking-[0.25em] text-[11px] flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(249,97,21,0.5)] border border-white/20 active:scale-[0.96] active:brightness-110 transition-all pointer-events-auto"
        >
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] fill-icon">add_circle</span>
          </div>
          Agregar nueva alerta
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Alerts;
