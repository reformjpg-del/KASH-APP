
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import ReportPrice from './pages/ReportPrice';
import Success from './pages/Success';
import Wallet from './pages/Wallet';
import Onboarding from './pages/Onboarding';
import Alerts from './pages/Alerts';
import AddAlert from './pages/AddAlert';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import DailyOffers from './pages/DailyOffers';
import SearchFilters from './pages/SearchFilters';
import MyReports from './pages/MyReports';
import WalletSettings from './pages/WalletSettings';
import SavedItems from './pages/SavedItems';
import SavedStores from './pages/SavedStores';
import LocationSettings from './pages/LocationSettings';
import InviteFriends from './pages/InviteFriends';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SupportChat from './pages/SupportChat';
import CartComparison from './pages/CartComparison';
import StoreCatalog from './pages/StoreCatalog';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [hasOnboarded, setHasOnboarded] = useState(() => {
    return localStorage.getItem('vibe_onboarded') === 'true';
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('vibe_auth') === 'true';
  });

  const handleOnboardingComplete = () => {
    setHasOnboarded(true);
    localStorage.setItem('vibe_onboarded', 'true');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('vibe_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('vibe_auth', 'false');
  };

  return (
    <Router>
      <div className="min-h-screen bg-vibe-light dark:bg-vibe-dark transition-colors duration-500">
        <div className="max-w-screen-xl mx-auto relative min-h-screen shadow-2xl md:shadow-none overflow-x-hidden">
          {!hasOnboarded ? (
            <Onboarding onComplete={handleOnboardingComplete} />
          ) : (
            <div className="flex flex-col min-h-screen">
              <div className="flex-1">
                <Routes>
                  {!isAuthenticated ? (
                    <>
                      <Route path="/login" element={<Login onLogin={handleLogin} />} />
                      <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                      <Route path="*" element={<Navigate to="/login" />} />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/search-filters" element={<SearchFilters />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/report" element={<ReportPrice />} />
                      <Route path="/success" element={<Success />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/wallet-settings" element={<WalletSettings />} />
                      <Route path="/alerts" element={<Alerts />} />
                      <Route path="/add-alert" element={<AddAlert />} />
                      <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
                      <Route path="/saved" element={<SavedItems />} />
                      <Route path="/saved-stores" element={<SavedStores />} />
                      <Route path="/my-reports" element={<MyReports />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/location" element={<LocationSettings />} />
                      <Route path="/invite" element={<InviteFriends />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/category/:id" element={<CategoryDetail />} />
                      <Route path="/daily-offers" element={<DailyOffers />} />
                      <Route path="/support" element={<SupportChat />} />
                      <Route path="/cart-comparison" element={<CartComparison />} />
                      <Route path="/store/:id" element={<StoreCatalog />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </>
                  )}
                </Routes>
              </div>
              {isAuthenticated && <BottomNav />}
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
