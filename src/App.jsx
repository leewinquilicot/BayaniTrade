import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import FarmerDashboard from './components/farmer/FarmerDashboard';
import RestaurantDashboard from './components/restaurant/RestaurantDashboard';
import LogisticsDashboard from './components/logistics/LogisticsDashboard';

const DASHBOARD_ROLES = ['farmer', 'restaurant', 'logistics'];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'INITIAL_SESSION') {
          if (session) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            if (profile) {
              setCurrentUser({ ...session.user, ...profile });
              setCurrentPage(profile.role);
            }
          }
          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          setCurrentPage('landing');
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage(user.role);
  };

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-green-700 font-medium text-sm">Loading BayaniTrade…</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'landing') return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
  if (currentPage === 'auth') return <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;

  if (DASHBOARD_ROLES.includes(currentPage) && !currentUser) {
    return <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;
  }

  if (currentPage === 'farmer')     return <FarmerDashboard     currentUser={currentUser} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />;
  if (currentPage === 'restaurant') return <RestaurantDashboard currentUser={currentUser} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />;
  if (currentPage === 'logistics')  return <LogisticsDashboard  currentUser={currentUser} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />;

  return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
}

export default App;
