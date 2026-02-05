
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Inicio', icon: 'home', path: '/' },
    { label: 'Explorar', icon: 'explore', path: '/search' },
    { label: 'Reportar', icon: 'bolt', path: '/report', isSpecial: true },
    { label: 'Puntos', icon: 'savings', path: '/wallet' },
    { label: 'Perfil', icon: 'person', path: '/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none px-6 pb-8 pt-4">
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-vibe-light via-vibe-light/80 to-transparent dark:from-vibe-dark dark:via-vibe-dark/80 transition-all duration-500" />
      
      <nav className="relative max-w-md mx-auto bg-white/80 dark:bg-vibe-card/80 backdrop-blur-2xl border border-black/[0.04] dark:border-white/10 rounded-2xl p-2 shadow-vibe flex justify-between items-center pointer-events-auto h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isOrange = item.isSpecial || isActive;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center transition-all duration-300 relative flex-1 h-full ${
                isOrange ? 'text-primary' : 'text-vibe-sub/60 dark:text-gray-500'
              }`}
            >
              <span className={`material-symbols-outlined text-[28px] transition-all ${isOrange ? 'fill-icon scale-110' : 'scale-100'}`}>
                {item.icon}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
