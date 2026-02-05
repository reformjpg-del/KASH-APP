
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_HISTORY } from '../constants';
import BottomNav from '../components/BottomNav';

const Wallet: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-44 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      {/* Header Dinámico */}
      <header className="px-6 pt-12 pb-6 flex items-center sticky top-0 bg-vibe-light/80 dark:bg-vibe-dark/80 backdrop-blur-xl z-50 border-b border-black/[0.03] dark:border-white/[0.05]">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform shadow-sm">
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <div className="flex-1 text-center pr-11">
           <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary leading-none mb-1">Centro de Prestigio</h2>
           <p className="text-sm font-black tracking-tight uppercase">Puntos</p>
        </div>
      </header>

      <main className="px-6 pt-8">
        {/* Profile Stats Quick Summary */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl border-2 border-primary/20 p-1 bg-white dark:bg-vibe-card shadow-lg">
                <img src="https://picsum.photos/seed/user/200/200" className="w-full h-full object-cover rounded-xl" alt="User" />
             </div>
             <div>
                <h1 className="text-xl font-black tracking-tighter">Alex González</h1>
                <p className="text-[9px] font-black uppercase tracking-widest text-vibe-sub/60">Colaborador Elite</p>
             </div>
          </div>
          <button 
            onClick={() => navigate('/wallet-settings')}
            className="w-11 h-11 rounded-2xl bg-white dark:bg-vibe-card flex items-center justify-center text-vibe-sub shadow-sm border border-black/[0.03]"
          >
             <span className="material-symbols-outlined text-[20px]">settings_heart</span>
          </button>
        </div>

        {/* KASK POINT Hero Card */}
        <div className="relative mb-10 group">
          <div className="mesh-gradient rounded-[3rem] p-8 text-white relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(251,99,22,0.4)] border border-white/20 transition-transform duration-700 hover:scale-[1.01]">
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32 animate-pulse" />
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-[60px] -ml-20 -mb-20" />
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                   <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em]">KASK POINT</p>
                   </div>
                   <div className="flex items-center gap-1.5 text-white/80">
                      <span className="material-symbols-outlined text-sm fill-icon animate-bounce">bolt</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">+120 hoy</span>
                   </div>
                </div>
                
                <div className="flex flex-col mb-10">
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Saldo de Ahorro</p>
                   <div className="flex items-baseline gap-3">
                      <h3 className="text-7xl font-black tracking-tighter leading-none">12,540</h3>
                      <span className="text-lg font-black opacity-60 uppercase">pts</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-end mb-1">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Hacia Nivel 5 Platinum</p>
                      <p className="text-[10px] font-black">450 / 500</p>
                   </div>
                   <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                      <div className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] w-[90%] transition-all duration-1000" />
                   </div>
                   <p className="text-[9px] font-bold text-center italic opacity-60">¡A solo 5 reportes de subir de categoría!</p>
                </div>
             </div>
          </div>
        </div>

        {/* Breakdown Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
           <div className="bg-white dark:bg-vibe-card p-6 rounded-[2.2rem] border border-black/[0.03] dark:border-white/[0.03] shadow-vibe">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                 <span className="material-symbols-outlined text-xl fill-icon">history_edu</span>
              </div>
              <p className="text-2xl font-black tracking-tight">840</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-vibe-sub/60 mt-1">Por Reportes</p>
           </div>
           <div className="bg-white dark:bg-vibe-card p-6 rounded-[2.2rem] border border-black/[0.03] dark:border-white/[0.03] shadow-vibe">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                 <span className="material-symbols-outlined text-xl fill-icon">verified</span>
              </div>
              <p className="text-2xl font-black tracking-tight">1,120</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-vibe-sub/60 mt-1">Verificaciones</p>
           </div>
        </div>

        {/* Activity History Section */}
        <section>
          <div className="flex justify-between items-center mb-6 px-2">
            <div>
               <h2 className="text-lg font-black tracking-tighter">Historial KASK</h2>
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-vibe-sub/40">Movimientos Recientes</p>
            </div>
            <button className="h-10 px-5 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-90 transition-transform">
               Ver Todo
            </button>
          </div>

          <div className="space-y-4">
            {MOCK_HISTORY.map((item, i) => (
              <div 
                key={item.id}
                className="bg-white dark:bg-vibe-card p-5 rounded-[2rem] border border-black/[0.02] dark:border-white/[0.02] flex items-center justify-between group active:scale-[0.98] transition-all animate-in fade-in slide-in-from-bottom-4 shadow-sm"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-black/[0.03] dark:border-white/5 shrink-0 ${
                    item.type === 'report' ? 'bg-orange-500/10 text-orange-500' : 
                    item.type === 'verification' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    <span className={`material-symbols-outlined text-[20px] ${item.points > 0 ? 'fill-icon' : ''}`}>
                      {item.type === 'report' ? 'sell' : item.type === 'verification' ? 'verified_user' : 'query_stats'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="font-extrabold text-[14px] tracking-tight truncate leading-none mb-1.5">{item.description}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-vibe-sub/60 dark:text-gray-500 text-[10px] font-bold uppercase tracking-tight truncate max-w-[120px]">
                          {item.detail}
                       </span>
                       <span className="w-1 h-1 bg-black/10 dark:bg-white/10 rounded-full" />
                       <span className="text-vibe-sub/40 text-[9px] font-bold">{item.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-green-500 font-black text-lg tracking-tighter">+{item.points}</span>
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-30">Puntos</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Empty State / Encouragement */}
        <div className="mt-16 p-10 bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-[3rem] border border-primary/10 flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-white dark:bg-vibe-card rounded-[1.8rem] flex items-center justify-center text-primary shadow-sm mb-6 border border-primary/10">
              <span className="material-symbols-outlined text-3xl fill-icon">redeem</span>
           </div>
           <h4 className="font-black text-base tracking-tight mb-2">Canjea tus Beneficios</h4>
           <p className="text-[11px] font-medium text-vibe-sub/80 leading-relaxed max-w-[240px] mb-8">
             Pronto podrás canjear tus **KASK POINTS** por cupones de descuento y envíos gratis en tiendas aliadas.
           </p>
           <button className="h-12 w-full bg-vibe-dark dark:bg-white text-white dark:text-vibe-dark rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
             Explorar Tiendas Aliadas
           </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Wallet;
