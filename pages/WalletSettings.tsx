
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WalletSettings: React.FC = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('Bs.');
  const [hideBalance, setHideBalance] = useState(false);
  const [savingGoal, setSavingGoal] = useState(5000);
  
  // Lógica de Modo Oscuro
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const settingsGroups = [
    {
      title: "Apariencia",
      items: [
        { 
          id: 'dark_mode', 
          label: "Modo Oscuro", 
          icon: "dark_mode", 
          type: 'toggle',
          value: isDarkMode,
          onChange: setIsDarkMode,
          desc: "Cambiar el tema de la aplicación"
        }
      ]
    },
    {
      title: "Preferencias de Ahorro",
      items: [
        { 
          id: 'currency', 
          label: "Moneda de Referencia", 
          icon: "currency_exchange", 
          type: 'selector', 
          options: ['Bs.', 'USD'],
          current: currency,
          onChange: setCurrency
        },
        { 
          id: 'hide_balance', 
          label: "Privacidad de Saldo", 
          icon: "visibility_off", 
          type: 'toggle',
          value: hideBalance,
          onChange: setHideBalance,
          desc: "Ocultar puntos en la pantalla de inicio"
        }
      ]
    },
    {
      title: "Gamificación",
      items: [
        { 
          id: 'goal', 
          label: "Meta Semanal", 
          icon: "emoji_events", 
          type: 'range',
          value: savingGoal,
          min: 1000,
          max: 10000,
          step: 500,
          onChange: setSavingGoal,
          unit: 'PTS'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 flex items-center border-b border-black/[0.03] dark:border-white/[0.03]">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <div className="flex-1 text-center pr-11">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 leading-none mb-1">Ajustes</h2>
           <p className="text-sm font-black tracking-tight">Vibe Wallet</p>
        </div>
      </header>

      <main className="p-6 space-y-10">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-vibe-sub/60 px-2">{group.title}</h3>
            <div className="bg-white dark:bg-vibe-card rounded-[2.5rem] border border-black/[0.03] dark:border-white/[0.03] shadow-vibe overflow-hidden divide-y divide-black/[0.02] dark:divide-white/[0.02]">
              {group.items.map((item, iIdx) => (
                <div key={iIdx} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-vibe-light dark:bg-vibe-dark flex items-center justify-center text-primary border border-black/[0.02] dark:border-white/[0.02]">
                        <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-extrabold text-sm tracking-tight">{item.label}</p>
                        {item.desc && <p className="text-[10px] font-bold text-vibe-sub/50 uppercase tracking-widest mt-1">{item.desc}</p>}
                      </div>
                    </div>

                    {item.type === 'toggle' && (
                      <button 
                        onClick={() => item.onChange(!item.value)}
                        className={`w-14 h-8 rounded-full p-1 transition-all duration-300 flex items-center ${item.value ? 'bg-primary justify-end' : 'bg-black/10 dark:bg-white/10 justify-start'}`}
                      >
                        <div className="h-full aspect-square bg-white rounded-full shadow-md" />
                      </button>
                    )}

                    {item.type === 'selector' && (
                      <div className="flex bg-vibe-light dark:bg-white/5 p-1 rounded-xl">
                        {item.options?.map(opt => (
                          <button
                            key={opt}
                            onClick={() => item.onChange(opt)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${item.current === opt ? 'bg-white dark:bg-vibe-card text-primary shadow-sm' : 'text-vibe-sub/60'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {item.type === 'range' && (
                    <div className="mt-6 space-y-3 px-1">
                      <div className="flex justify-between items-end">
                         <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{item.min} {item.unit}</span>
                         <span className="text-xl font-black tracking-tighter text-primary bg-primary/10 px-3 py-1 rounded-lg">{item.value} {item.unit}</span>
                         <span className="text-[10px] font-black text-vibe-sub/40 uppercase tracking-[0.2em]">{item.max} {item.unit}</span>
                      </div>
                      <input 
                        type="range"
                        min={item.min}
                        max={item.max}
                        step={item.step}
                        value={item.value}
                        onChange={(e) => item.onChange(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-black/5 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-4 p-8 bg-primary/[0.03] dark:bg-primary/[0.05] rounded-[2.5rem] border border-primary/10 flex flex-col items-center text-center">
           <div className="w-12 h-12 rounded-2xl bg-white dark:bg-vibe-card flex items-center justify-center text-primary shadow-sm mb-4">
              <span className="material-symbols-outlined fill-icon">security</span>
           </div>
           <h5 className="font-black text-sm tracking-tight mb-2">Tus datos están seguros</h5>
           <p className="text-[11px] font-medium text-vibe-sub/80 leading-relaxed max-w-[200px]">Tus reportes son anónimos por defecto para proteger tu privacidad.</p>
        </div>
      </main>

      <footer className="p-6">
         <button className="w-full h-16 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 border border-red-100 dark:border-red-900/20 active:scale-95 transition-all">
            Limpiar Datos de Wallet
         </button>
      </footer>
    </div>
  );
};

export default WalletSettings;
