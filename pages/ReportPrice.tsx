
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BCV_RATE } from '../constants';

const ReportPrice: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados del Formulario
  const [product, setProduct] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [locationName, setLocationName] = useState('Detectando ubicación...');
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efecto para obtener geolocalización al cargar
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Simulamos una resolución de nombre de zona basada en coordenadas
          setTimeout(() => {
            setLocationName("Zona detectada: " + (position.coords.latitude > 10 ? "Chacao, Caracas" : "Tu ubicación actual"));
            setIsLocating(false);
          }, 1000);
        },
        (error) => {
          console.error("Error GPS:", error);
          setLocationName("Ubicación no disponible");
          setIsLocating(false);
        }
      );
    }
  }, []);

  const handlePublish = () => {
    setIsSubmitting(true);
    // Simular latencia de red/procesamiento
    setTimeout(() => {
      navigate('/success');
    }, 1500);
  };

  const isFormValid = product && brand && price && !isLocating && !isSubmitting;

  return (
    <div className="pb-44 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-vibe-light/80 dark:bg-vibe-dark/80 backdrop-blur-md z-50">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-vibe-card border border-black/[0.04] text-vibe-sub">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 leading-none mb-1">REPORTE MANUAL</h2>
          <p className="text-xs font-black tracking-tight uppercase">Datos del Producto</p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl text-primary">
          <span className="material-symbols-outlined fill-icon">edit_square</span>
        </div>
      </header>

      <main className="p-6 max-w-lg mx-auto flex flex-col gap-6 animate-in fade-in duration-700">
        
        {/* Card 1: Información Básica */}
        <section className="bg-white dark:bg-vibe-card rounded-[2rem] p-6 border border-black/[0.04] shadow-vibe space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <p className="text-[9px] font-black uppercase tracking-widest text-vibe-sub/40 mb-2 ml-1">¿Qué producto es?</p>
              <input 
                type="text"
                placeholder="Ej: Ibuprofeno 600mg"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full h-14 bg-vibe-light dark:bg-vibe-dark/50 border-none rounded-2xl px-5 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-vibe-sub/20"
              />
            </div>
            <div className="relative">
              <p className="text-[9px] font-black uppercase tracking-widest text-vibe-sub/40 mb-2 ml-1">Marca / Fabricante</p>
              <input 
                type="text"
                placeholder="Ej: Pfizer, Harina PAN, etc."
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full h-14 bg-vibe-light dark:bg-vibe-dark/50 border-none rounded-2xl px-5 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-vibe-sub/20"
              />
            </div>
          </div>
        </section>

        {/* Card 2: Precio Mejorado (Sin solapamiento) */}
        <section className="bg-white dark:bg-vibe-card rounded-[2.5rem] p-8 border border-black/[0.04] shadow-vibe relative overflow-hidden">
          {/* Header de la Card para tasa BCV */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/40">Precio en estante</p>
            <div className="flex items-center gap-2 bg-vibe-light dark:bg-white/5 px-3 py-1.5 rounded-xl border border-black/[0.02]">
               <span className="text-[7px] font-black uppercase tracking-[0.2em] text-vibe-sub/50">Ref. BCV</span>
               <span className="text-[10px] font-bold text-primary leading-none">Bs.{BCV_RATE.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-baseline justify-center gap-3 group mb-4">
             <span className="text-2xl font-black text-primary/40 group-focus-within:text-primary transition-colors">Bs.</span>
             <input 
               type="number"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               className="w-48 bg-transparent border-none focus:ring-0 text-6xl font-black text-primary tracking-tighter p-0 text-center placeholder:opacity-5"
               placeholder="0.00"
             />
          </div>
          
          {price && !isNaN(parseFloat(price)) ? (
            <div className="flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300">
              <span className="text-[9px] font-bold text-vibe-sub/40 uppercase tracking-widest">Equivale a aprox.</span>
              <div className="bg-primary/10 px-2 py-0.5 rounded-md">
                <span className="text-[11px] font-black text-primary">USD {(parseFloat(price) / BCV_RATE).toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <p className="text-[9px] font-bold text-vibe-sub/20 uppercase tracking-[0.1em]">Ingresa el monto para calcular conversión</p>
          )}
        </section>

        {/* Card 3: Geolocalización */}
        <section className="bg-white dark:bg-vibe-card rounded-[2rem] p-6 border border-black/[0.04] shadow-vibe">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-black/[0.02] ${isLocating ? 'bg-vibe-sub/10 text-vibe-sub animate-pulse' : 'bg-blue-500/10 text-blue-500'}`}>
              <span className={`material-symbols-outlined text-2xl ${!isLocating ? 'fill-icon' : ''}`}>
                {isLocating ? 'sync' : 'location_on'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[9px] font-black uppercase tracking-widest text-vibe-sub/40 mb-0.5">Lugar del reporte</p>
               <p className="text-sm font-black tracking-tight truncate">
                 {locationName}
               </p>
               {!isLocating && coords && (
                 <p className="text-[8px] font-bold text-vibe-sub/30 uppercase mt-1">
                   GPS: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                 </p>
               )}
            </div>
            {!isLocating && (
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <span className="material-symbols-outlined text-sm">verified</span>
              </div>
            )}
          </div>
        </section>

        {/* Botón de Publicación Mejorado */}
        <div className="px-2 mt-4 relative">
          <button 
            onClick={handlePublish}
            disabled={!isFormValid}
            className={`
              w-full h-20 relative flex items-center justify-center gap-4 overflow-hidden rounded-[2rem] transition-all duration-500 group
              ${isFormValid 
                ? 'bg-gradient-to-br from-primary via-orange-500 to-orange-600 text-white shadow-primary-glow scale-100 opacity-100 active:scale-[0.97]' 
                : 'bg-black/[0.05] dark:bg-white/[0.05] text-vibe-sub/30 opacity-60 scale-[0.98] cursor-not-allowed'
              }
            `}
          >
            {/* Efecto Shimmer / Brillo animado cuando está activo */}
            {isFormValid && !isSubmitting && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            )}

            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${isFormValid ? 'bg-white/20 shadow-inner' : 'bg-black/5'}`}>
               {isSubmitting ? (
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               ) : (
                 <span className={`material-symbols-outlined text-[24px] ${isFormValid ? 'fill-icon animate-pulse' : ''}`}>
                   {isFormValid ? 'bolt' : 'lock'}
                 </span>
               )}
            </div>
            
            <div className="flex flex-col items-start">
              <span className="text-[14px] font-black uppercase tracking-[0.2em] leading-none">
                {isSubmitting ? 'Procesando...' : 'Publicar Reporte'}
              </span>
              {isFormValid && !isSubmitting && (
                <span className="text-[8px] font-black uppercase tracking-widest opacity-60 mt-1">Confirmar envío inmediato</span>
              )}
            </div>

            {/* Placa de puntos flotante con glassmorphism */}
            {isFormValid && !isSubmitting && (
              <div className="absolute right-6 bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-xl border border-white/20 shadow-lg animate-in fade-in zoom-in-50 duration-500">
                <span className="text-[10px] font-black tracking-tighter">+15 PTS</span>
              </div>
            )}
          </button>
          
          <p className="text-center mt-6 text-[10px] font-bold text-vibe-sub/40 uppercase tracking-widest leading-relaxed">
            Tu reporte será validado por la zona. <br/> Ganarás prestigio en el ranking KASH local.
          </p>
        </div>
      </main>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ReportPrice;
