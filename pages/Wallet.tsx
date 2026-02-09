
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_HISTORY } from '../constants';
import BottomNav from '../components/BottomNav';

const Wallet: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-44 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      {/* Header Dinámico Compacto */}
      <header className="px-6 pt-10 pb-4 flex items-center sticky top-0 bg-vibe-light/80 dark:bg-vibe-dark/80 backdrop-blur-xl z-50 border-b border-black/[0.03] dark:border-white/[0.05]">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform shadow-sm">
          <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
        </button>
        <div className="flex-1 text-center pr-10">
           <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary leading-none mb-0.5">Centro de Prestigio</h2>
           <p className="text-xs font-black tracking-tight uppercase opacity-60">Mis Puntos</p>
        </div>
      </header>

      <main className="px-6 pt-6">
        {/* Profile Stats Quick Summary - Compacto */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl border-2 border-primary/20 p-0.5 bg-white dark:bg-vibe-card shadow-md">
                <img src="https://picsum.photos/seed/user/200/200" className="w-full h-full object-cover rounded-lg" alt="User" />
             </div>
             <div>
                <h1 className="text-lg font-black tracking-tighter leading-none">Alex González</h1>
                <p className="text-[8px] font-black uppercase tracking-widest text-vibe-sub/60 mt-1">Colaborador Elite</p>
             </div>
          </div>
          <button 
            onClick={() => navigate('/wallet-settings')}
            className="w-10 h-10 rounded-xl bg-white dark:bg-vibe-card flex items-center justify-center text-vibe-sub shadow-sm border border-black/[0.03]"
          >
             <span className="material-symbols-outlined text-[18px]">settings_heart</span>
          </button>
        </div>

        {/* KASK POINT Hero Card - Tamaño Optimizado */}
        <div className="relative mb-6 group">
          <div className="mesh-gradient rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-vibe border border-white/20 transition-transform duration-700">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px] -mr-24 -mt-24 animate-pulse" />
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                   <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/10">
                      <p className="text-[8px] font-black uppercase tracking-[0.25em]">KASK POINT</p>
                   </div>
                   <div className="flex items-center gap-1 text-white/80">
                      <span className="material-symbols-outlined text-xs fill-icon animate-bounce">bolt</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest">+120 hoy</span>
                   </div>
                </div>
                
                <div className="flex flex-col mb-6">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Saldo de Ahorro</p>
                   <div className="flex items-baseline gap-2">
                      <h3 className="text-5xl font-black tracking-tighter leading-none">12,540</h3>
                      <span className="text-sm font-black opacity-60 uppercase">pts</span>
                   </div>
                </div>

                <div className="space-y-3">
                   <div className="flex justify-between items-end">
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-80">Nivel 5 Platinum</p>
                      <p className="text-[9px] font-black">450 / 500</p>
                   </div>
                   <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                      <div className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] w-[90%] transition-all duration-1000" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Breakdown Stats Grid - Más compacto */}
        <div className="grid grid-cols-2 gap-3 mb-10">
           <div className="bg-white dark:bg-vibe-card p-4 rounded-2xl border border-black/[0.03] dark:border-white/[0.03] shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
                 <span className="material-symbols-outlined text-lg fill-icon">history_edu</span>
              </div>
              <p className="text-xl font-black tracking-tight">840</p>
              <p className="text-[8px] font-black uppercase tracking-widest text-vibe-sub/60 mt-0.5">Por Reportes</p>
           </div>
           <div className="bg-white dark:bg-vibe-card p-4 rounded-2xl border border-black/[0.03] dark:border-white/[0.03] shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-2">
                 <span className="material-symbols-outlined text-lg fill-icon">verified</span>
              </div>
              <p className="text-xl font-black tracking-tight">1,120</p>
              <p className="text-[8px] font-black uppercase tracking-widest text-vibe-sub/60 mt-0.5">Verificaciones</p>
           </div>
        </div>

        {/* Activity History Section */}
        <section>
          <div className="flex justify-between items-center mb-5 px-1">
            <div>
               <h2 className="text-base font-black tracking-tighter">Historial</h2>
               <p className="text-[8px] font-black uppercase tracking-[0.2em] text-vibe-sub/40">Movimientos</p>
            </div>
            <button className="h-8 px-4 bg-primary/10 text-primary rounded-lg text-[9px] font-black uppercase tracking-widest active:scale-90 transition-transform">
               Ver Todo
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_HISTORY.map((item, i) => (
              <div 
                key={item.id}
                className="bg-white dark:bg-vibe-card p-4 rounded-2xl border border-black/[0.02] dark:border-white/[0.02] flex items-center justify-between group active:scale-[0.99] transition-all shadow-sm"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-black/[0.03] dark:border-white/5 shrink-0 ${
                    item.type === 'report' ? 'bg-orange-500/10 text-orange-500' : 
                    item.type === 'verification' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    <span className={`material-symbols-outlined text-[18px] ${item.points > 0 ? 'fill-icon' : ''}`}>
                      {item.type === 'report' ? 'sell' : item.type === 'verification' ? 'verified_user' : 'query_stats'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="font-extrabold text-[13px] tracking-tight truncate leading-none mb-1">{item.description}</p>
                    <div className="flex items-center gap-1.5 overflow-hidden">
                       <span className="text-vibe-sub/60 dark:text-gray-500 text-[9px] font-bold uppercase truncate">
                          {item.detail}
                       </span>
                       <span className="w-0.5 h-0.5 bg-black/10 dark:bg-white/10 rounded-full shrink-0" />
                       <span className="text-vibe-sub/40 text-[8px] font-bold shrink-0">{item.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-green-500 font-black text-base tracking-tighter leading-none">+{item.points}</span>
                  <p className="text-[7px] font-black uppercase tracking-[0.1em] opacity-30">PTS</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info / Reward CTA - Reducido */}
        <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-[2rem] border border-primary/10 flex flex-col items-center text-center">
           <div className="w-12 h-12 bg-white dark:bg-vibe-card rounded-xl flex items-center justify-center text-primary shadow-sm mb-4 border border-primary/10">
              <span className="material-symbols-outlined text-2xl fill-icon">redeem</span>
           </div>
           <h4 className="font-black text-sm tracking-tight mb-1">Beneficios KASH</h4>
           <p className="text-[10px] font-medium text-vibe-sub/80 leading-relaxed max-w-[220px] mb-6">
             Canjea tus puntos por cupones de descuento y envíos gratis.
           </p>
           <button className="h-11 w-full bg-vibe-dark dark:bg-white text-white dark:text-vibe-dark rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
             Explorar Beneficios
           </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Wallet;
