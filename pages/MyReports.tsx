
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_HISTORY } from '../constants';
import BottomNav from '../components/BottomNav';

const MyReports: React.FC = () => {
  const navigate = useNavigate();

  // Filter only reports from history
  const myReports = MOCK_HISTORY.filter(item => item.type === 'report');

  const achievements = [
    { id: 1, title: 'Novato', icon: 'auto_awesome', desc: 'Primer reporte', isUnlocked: true },
    { id: 2, title: 'Centinela', icon: 'visibility', desc: '10 reportes validados', isUnlocked: true },
    { id: 3, title: 'Gurú', icon: 'psychology', desc: '50 reportes validados', isUnlocked: false },
    { id: 4, title: 'Top Mes', icon: 'workspace_premium', desc: 'Reportero del mes', isUnlocked: false },
    { id: 5, title: 'Cazador', icon: 'radar', desc: '5 reportes en un día', isUnlocked: true },
    { id: 6, title: 'Elite', icon: 'diamond', desc: 'Nivel 10 alcanzado', isUnlocked: false },
  ];

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      <header className="px-4 pt-8 pb-3 flex items-center sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-md z-50 border-b border-black/[0.03] dark:border-white/[0.03]">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] dark:border-white/[0.04] active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-lg">arrow_back_ios_new</span>
        </button>
        <div className="flex-1 text-center pr-11">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Actividad</h2>
           <p className="text-sm font-extrabold tracking-tight">Mis Reportes</p>
        </div>
      </header>

      <main className="p-6">
        {/* Summary Dashboard */}
        <div className="bg-vibe-dark dark:bg-white rounded-[2.8rem] p-8 text-white dark:text-vibe-dark shadow-2xl relative overflow-hidden mb-10">
           <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -mr-20 -mt-20" />
           
           <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                 <div className="w-12 h-12 bg-white/10 dark:bg-black/5 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-2xl fill-icon text-primary">analytics</span>
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Resumen de Impacto</span>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-4xl font-black tracking-tighter">{myReports.length}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-1">Precios Reportados</p>
                 </div>
                 <div>
                    <p className="text-4xl font-black tracking-tighter text-primary">+{myReports.reduce((acc, curr) => acc + curr.points, 0)}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-1">Puntos Ganados</p>
                 </div>
              </div>

              <div className="pt-4 border-t border-white/10 dark:border-black/5 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <p className="text-[10px] font-bold opacity-60 leading-none">Has ayudado a ahorrar a ~142 vecinos este mes.</p>
              </div>
           </div>
        </div>

        <div className="flex justify-between items-end mb-6 px-1">
           <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Historial de Reportes</h3>
           <span className="text-[10px] font-black uppercase tracking-widest text-primary">Más Recientes</span>
        </div>

        <div className="flex flex-col gap-4 mb-12">
          {myReports.length > 0 ? (
            myReports.map((report, i) => (
              <div 
                key={report.id}
                className="bg-white dark:bg-vibe-card rounded-[2.2rem] p-5 border border-black/[0.03] dark:border-white/[0.04] shadow-vibe flex items-center justify-between group active:scale-[0.98] transition-all animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-vibe-light dark:bg-vibe-dark flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[22px] fill-icon">storefront</span>
                   </div>
                   <div className="flex flex-col min-w-0">
                      <p className="font-extrabold text-sm tracking-tight truncate pr-2">{report.detail}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                         <span className="text-[10px] font-bold text-vibe-sub/60">{report.date}</span>
                         <span className="w-1 h-1 bg-black/10 rounded-full" />
                         <span className="text-[9px] font-black text-green-600 uppercase tracking-tighter">Validado</span>
                      </div>
                   </div>
                </div>
                <div className="text-right shrink-0">
                   <p className="text-primary font-black text-sm tracking-tight">+{report.points} pts</p>
                   <span className="material-symbols-outlined text-vibe-sub/20 text-lg">chevron_right</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center text-center px-10">
               <div className="w-20 h-20 rounded-[2rem] bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl opacity-20">history_edu</span>
               </div>
               <h4 className="font-black text-lg tracking-tight mb-2">Aún no tienes reportes</h4>
               <p className="text-xs font-medium text-vibe-sub leading-relaxed">
                 Comienza a reportar precios para ganar puntos y ayudar a tu comunidad a ahorrar.
               </p>
               <button 
                 onClick={() => navigate('/report')}
                 className="mt-8 h-12 px-8 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-primary-glow active:scale-95 transition-all"
               >
                 Hacer primer reporte
               </button>
            </div>
          )}
        </div>

        {/* Reporter Rank Card */}
        {myReports.length > 0 && (
          <div className="mb-12 p-6 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-[2.5rem] border border-primary/20 flex items-center gap-5 relative overflow-hidden group">
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
             <div className="w-14 h-14 bg-white dark:bg-vibe-card rounded-[1.8rem] flex items-center justify-center shadow-sm shrink-0 border border-primary/10">
                <span className="material-symbols-outlined text-3xl text-primary fill-icon">military_tech</span>
             </div>
             <div>
                <h4 className="font-black text-sm tracking-tight">Reportero Estrella</h4>
                <p className="text-[10px] font-medium text-vibe-sub/80 mt-1 leading-relaxed">
                  Estás a solo 5 reportes de desbloquear el badge de **"Vigilante del Ahorro"**.
                </p>
             </div>
          </div>
        )}

        {/* Achievements Section */}
        <div className="mb-6 px-1">
           <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60">Tus Logros</h3>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-12">
          {achievements.map((badge, i) => (
            <div 
              key={badge.id}
              className={`bg-white dark:bg-vibe-card rounded-[2.2rem] p-4 border border-black/[0.03] dark:border-white/[0.03] shadow-vibe flex flex-col items-center text-center transition-all duration-500 ${!badge.isUnlocked ? 'grayscale opacity-40' : 'hover:scale-105 active:scale-95'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm ${badge.isUnlocked ? 'bg-primary/10 text-primary' : 'bg-vibe-light dark:bg-white/5 text-vibe-sub'}`}>
                 <span className={`material-symbols-outlined text-2xl ${badge.isUnlocked ? 'fill-icon' : ''}`}>
                   {badge.icon}
                 </span>
              </div>
              <p className="text-[10px] font-black tracking-tight leading-none truncate w-full mb-1">{badge.title}</p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-vibe-sub/60 line-clamp-1">{badge.desc}</p>
              
              {!badge.isUnlocked && (
                 <div className="mt-2 text-primary">
                    <span className="material-symbols-outlined text-sm">lock</span>
                 </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default MyReports;
