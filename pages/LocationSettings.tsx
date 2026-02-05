
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const LocationSettings: React.FC = () => {
  const navigate = useNavigate();
  const [isDetecting, setIsDetecting] = useState(false);
  const [currentZone, setCurrentZone] = useState('Chacao, Caracas');
  const [recentZones] = useState(['Altamira', 'Las Mercedes', 'Los Palos Grandes']);

  const detectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulamos la obtención de la dirección inversa
          setTimeout(() => {
            setCurrentZone('Detectado: Altamira Sur');
            setIsDetecting(false);
          }, 1500);
        },
        (error) => {
          console.error("Error detecting location", error);
          setIsDetecting(false);
          alert("No pudimos obtener tu ubicación. Por favor, actívala en tu navegador.");
        }
      );
    } else {
      setIsDetecting(false);
      alert("Geolocalización no soportada en este navegador.");
    }
  };

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 border-b border-black/[0.03] dark:border-white/[0.03]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          <div className="flex-1">
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 leading-none mb-1">Preferencias</h2>
             <p className="text-sm font-black tracking-tight">Ubicación de Ahorro</p>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Map Placeholder Visual */}
        <div className="w-full h-64 bg-gray-200 dark:bg-vibe-card rounded-[3rem] relative overflow-hidden mb-10 border border-black/[0.05] dark:border-white/[0.05] shadow-inner">
           <img src="https://picsum.photos/seed/map-vibe/800/600?grayscale" className="w-full h-full object-cover opacity-40 dark:opacity-20" alt="Map" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-150" />
                <div className="w-16 h-16 bg-primary rounded-[2rem] shadow-primary-glow border-4 border-white dark:border-vibe-dark flex items-center justify-center text-white relative z-10">
                  <span className="material-symbols-outlined text-3xl fill-icon">location_on</span>
                </div>
              </div>
           </div>
           
           <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 dark:bg-vibe-card/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">my_location</span>
                 </div>
                 <p className="text-xs font-black tracking-tight truncate flex-1">{currentZone}</p>
              </div>
           </div>
        </div>

        <button 
          onClick={detectLocation}
          disabled={isDetecting}
          className="w-full h-16 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-primary-glow active:scale-95 transition-all mb-10 disabled:opacity-50"
        >
          {isDetecting ? (
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Detectando...
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">explore</span>
              Autodetectar mi zona
            </>
          )}
        </button>

        <section className="space-y-6">
           <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 px-2">Zonas Populares en Caracas</h3>
           <div className="bg-white dark:bg-vibe-card rounded-[2.5rem] border border-black/[0.03] dark:border-white/[0.03] overflow-hidden divide-y divide-black/[0.01] dark:divide-white/[0.01]">
              {recentZones.map((zone, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentZone(`${zone}, Caracas`)}
                  className="w-full flex items-center justify-between p-5 hover:bg-black/[0.01] transition-colors group"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-vibe-light dark:bg-vibe-dark flex items-center justify-center text-vibe-sub/40 group-hover:text-primary transition-colors">
                         <span className="material-symbols-outlined text-[20px]">location_city</span>
                      </div>
                      <span className="text-sm font-extrabold tracking-tight">{zone}</span>
                   </div>
                   {currentZone.includes(zone) && (
                     <span className="material-symbols-outlined text-primary">check_circle</span>
                   )}
                </button>
              ))}
           </div>
        </section>

        <div className="mt-10 p-8 bg-primary/[0.03] dark:bg-primary/[0.05] rounded-[2.5rem] border border-primary/10 flex flex-col items-center text-center">
           <div className="w-12 h-12 rounded-2xl bg-white dark:bg-vibe-card flex items-center justify-center text-primary shadow-sm mb-4">
              <span className="material-symbols-outlined fill-icon">shield_person</span>
           </div>
           <h5 className="font-black text-sm tracking-tight mb-2">Privacidad de Ubicación</h5>
           <p className="text-[11px] font-medium text-vibe-sub/80 leading-relaxed max-w-[240px]">
             Tu ubicación exacta nunca se comparte con otros vecinos. Solo la usamos para mostrarte precios cercanos.
           </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default LocationSettings;
