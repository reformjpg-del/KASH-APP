
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onLogout?: () => void;
}

const Profile: React.FC<Props> = ({ onLogout }) => {
  const navigate = useNavigate();
  
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

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.setItem('vibe_auth', 'false');
      window.location.reload();
    }
  };

  const menuGroups = [
    {
      title: "Configuración de cuenta",
      items: [
        { label: "Mis Alertas", icon: "notifications", badge: "", path: "/alerts" },
        { label: "Productos Guardados", icon: "bookmark", badge: "3", path: "/saved" },
        { label: "Tiendas Guardadas", icon: "store", badge: "4", path: "/saved-stores" }
      ]
    },
    {
      title: "Preferencias",
      items: [
        { label: "Ubicación Actual", icon: "location_on", sub: "Configurar zona", path: "/location" },
        { label: "Modo Oscuro", icon: "dark_mode", sub: isDarkMode ? "Activado" : "Desactivado", path: "#", isToggle: true }
      ]
    }
  ];

  return (
    <div className="pb-44 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500">
      {/* Sección Superior Navy (Referencia) */}
      <div className="bg-[#0f172a] text-white pt-10 pb-20 px-6">
        {/* Header de Navegación */}
        <header className="flex justify-between items-center mb-10">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
          </button>
          <div className="flex gap-4">
            <button onClick={() => navigate('/notifications')} className="text-white/80 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </button>
            <button onClick={() => navigate('/wallet-settings')} className="text-white/80 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[24px]">settings</span>
            </button>
          </div>
        </header>

        {/* Info del Usuario Estilo Referencia */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-[100px] h-[100px] bg-emerald-500 rounded-[1.8rem] flex items-center justify-center shadow-lg">
            <span className="text-white text-5xl font-black">D</span>
          </div>
          <div className="flex-1">
            <h1 className="text-[22px] font-black leading-tight tracking-tight">Daniel Alfredo Gimenez Tovar</h1>
            <p className="text-vibe-sub/60 text-[13px] font-medium mt-1">danielhardprofit21@gmail.com</p>
            
            {/* Badge de Estatus */}
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
               <div className="w-8 h-8 rounded-full bg-vibe-sub/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-white/70">visibility</span>
               </div>
               <div>
                  <p className="text-[11px] font-bold text-white leading-none">Observador</p>
                  <p className="text-[10px] font-medium text-vibe-sub/60 leading-none mt-1">0 pts</p>
               </div>
            </div>
          </div>
        </div>

        {/* Barra de Progreso Estilo Referencia */}
        <div className="bg-white/5 rounded-[1.8rem] p-6 border border-white/5">
          <div className="flex justify-between items-center mb-3 text-[13px] font-bold">
            <p className="text-white/80">Progreso a cazador</p>
            <p className="text-white">500 pts restantes</p>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-vibe-sub/30 w-[10%] rounded-full transition-all duration-1000" />
          </div>
        </div>
      </div>

      {/* Tarjeta de Estadísticas Flotante (Referencia) */}
      <div className="px-6 -mt-14 relative z-10">
        <div className="bg-white dark:bg-vibe-card rounded-[2.5rem] p-8 shadow-vibe flex justify-between items-center border border-black/[0.02] dark:border-white/[0.04]">
          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-3">
              <span className="material-symbols-outlined fill-icon">target</span>
            </div>
            <p className="text-2xl font-black tracking-tighter">0</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-vibe-sub/60 mt-1">Reportes</p>
          </div>
          
          <div className="w-px h-12 bg-black/[0.05] dark:bg-white/[0.05]" />

          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-3">
              <span className="material-symbols-outlined fill-icon">check_circle</span>
            </div>
            <p className="text-2xl font-black tracking-tighter">0</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-vibe-sub/60 mt-1">Aprobados</p>
          </div>

          <div className="w-px h-12 bg-black/[0.05] dark:bg-white/[0.05]" />

          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-3">
              <span className="material-symbols-outlined fill-icon">cancel</span>
            </div>
            <p className="text-2xl font-black tracking-tighter">0</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-vibe-sub/60 mt-1">Rechazados</p>
          </div>
        </div>
      </div>

      {/* Menú de Opciones */}
      <div className="px-6 mt-10 space-y-8">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-vibe-sub/60 px-4">{group.title}</h3>
            <div className="bg-white dark:bg-vibe-card rounded-[2.2rem] border border-black/[0.02] dark:border-white/[0.04] shadow-sm divide-y divide-black/[0.01] dark:divide-white/[0.02] overflow-hidden">
              {group.items.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    if (item.isToggle) {
                      setIsDarkMode(!isDarkMode);
                    } else if (item.path !== '#') {
                      navigate(item.path);
                    }
                  }}
                  className="w-full flex items-center justify-between p-5 hover:bg-black/[0.01] transition-colors active:scale-[0.99]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-vibe-light dark:bg-vibe-dark flex items-center justify-center text-vibe-sub/80 dark:text-gray-400">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-extrabold text-sm tracking-tight">{item.label}</p>
                      {item.sub && <p className="text-[10px] font-bold text-vibe-sub/60 uppercase tracking-wide mt-0.5">{item.sub}</p>}
                    </div>
                  </div>
                  {item.isToggle ? (
                    <div className={`w-12 h-7 rounded-full p-1 transition-all ${isDarkMode ? 'bg-primary justify-end' : 'bg-black/10 dark:bg-white/10 justify-start'} flex items-center`}>
                       <div className="h-full aspect-square bg-white rounded-full shadow-sm" />
                    </div>
                  ) : (
                    <span className="material-symbols-outlined text-vibe-sub/30 text-lg">chevron_right</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button 
          onClick={handleLogoutClick}
          className="w-full h-16 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-[1.8rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 border border-red-100 dark:border-red-900/20 active:scale-95 transition-all mt-10"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
