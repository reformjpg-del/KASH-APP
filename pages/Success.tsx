
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-vibe-light dark:bg-vibe-dark">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-vibe-dark/80 backdrop-blur-md">
        <button onClick={() => navigate('/')} className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-lg font-extrabold flex-1 text-center pr-10">Logro de Comunidad</h2>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-8 pb-12">
        <div className="relative w-56 h-56 mb-12 flex items-center justify-center">
          <div className="absolute w-full h-full bg-primary/20 rounded-full animate-ping"></div>
          <div className="absolute w-3/4 h-3/4 bg-primary/10 rounded-full"></div>
          <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 relative z-10">
             <span className="material-symbols-outlined text-white text-6xl fill-icon">favorite</span>
          </div>
        </div>

        <h1 className="text-5xl font-black tracking-tighter mb-4">¡Buen Pulso!</h1>
        <p className="text-vibe-sub dark:text-gray-400 text-lg font-medium leading-tight max-w-xs mx-auto">
          Tu reporte ayuda a la comunidad a encontrar los mejores precios.
        </p>

        <div className="w-full mt-10 bg-white dark:bg-vibe-card rounded-2xl p-8 border border-primary/10 shadow-sm flex flex-col items-center">
          <p className="text-[10px] font-black tracking-widest uppercase text-vibe-sub mb-2">Puntos Ganados</p>
          <p className="text-7xl font-black text-primary tracking-tighter leading-none">+50</p>
          <div className="mt-4 px-4 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">trending_up</span>
            <span className="text-green-600 dark:text-green-400 text-xs font-black uppercase">Nivel 4 alcanzado</span>
          </div>
        </div>

        <div className="w-full mt-6 flex items-center gap-4 p-5 bg-gray-100 dark:bg-white/5 rounded-2xl text-left">
           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined fill-icon">local_mall</span>
           </div>
           <div className="flex-1 min-w-0">
             <p className="font-extrabold text-sm">Impacto en Walmart</p>
             <p className="text-vibe-sub dark:text-gray-500 text-xs font-medium">Ayudaste a ahorrar a más de 12 personas hoy.</p>
           </div>
        </div>

        <div className="w-full mt-10 text-left">
           <div className="flex justify-between items-end mb-2">
             <p className="text-xs font-black uppercase tracking-widest text-vibe-sub">Progreso de Temporada</p>
             <p className="text-primary font-black">450/500</p>
           </div>
           <div className="w-full h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-primary w-[90%] rounded-full shadow-[0_0_15px_rgba(249,97,21,0.5)]"></div>
           </div>
           <p className="mt-3 text-[10px] font-bold text-center text-vibe-sub italic">¡Estás a solo 50 puntos de subir a Nivel 5!</p>
        </div>
      </main>

      <footer className="p-6 bg-white/80 dark:bg-vibe-dark/80 backdrop-blur-md sticky bottom-0">
        <button 
          onClick={() => navigate('/')}
          className="w-full h-16 bg-primary text-white rounded-full font-black text-lg shadow-xl shadow-primary/20"
        >
          Continuar Ahorrando
        </button>
        <button className="w-full mt-3 h-10 flex items-center justify-center gap-2 font-bold text-sm text-vibe-sub">
          <span className="material-symbols-outlined text-primary text-xl">share</span>
          Compartir Logro
        </button>
      </footer>
    </div>
  );
};

export default Success;
