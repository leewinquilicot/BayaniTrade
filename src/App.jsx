import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import RoleSelection from './components/RoleSelection';
import FarmerDashboard from './components/farmer/FarmerDashboard';
import RestaurantDashboard from './components/restaurant/RestaurantDashboard';
import LogisticsDashboard from './components/logistics/LogisticsDashboard';
import { getCurrentUser, logout } from './utils/auth';

const DASHBOARD_ROLES = ['farmer', 'restaurant', 'logistics'];

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const user = getCurrentUser();
    if (user && DASHBOARD_ROLES.includes(user.role)) return user.role;
    return 'landing';
  });

  const handleGetStarted = () => setCurrentPage('auth');
  const handleBack = () => setCurrentPage('landing');

  const handleLogin = (role) => {
    if (DASHBOARD_ROLES.includes(role)) {
      setCurrentPage(role);
    } else {
      setCurrentPage('role');
    }
  };

  const handleSelectRole = (role) => {
    setCurrentPage(role);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  // Route guard — someone navigating directly to a dashboard without a session
  const currentUser = getCurrentUser();
  if (DASHBOARD_ROLES.includes(currentPage) && !currentUser) {
    return <AuthPage onLogin={handleLogin} onBack={handleBack} />;
  }

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentPage === 'auth') {
    return <AuthPage onLogin={handleLogin} onBack={handleBack} />;
  }

  if (currentPage === 'role') {
    return <RoleSelection onSelectRole={handleSelectRole} />;
  }

  if (currentPage === 'farmer') {
    return <FarmerDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  if (currentPage === 'restaurant') {
    return <RestaurantDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  if (currentPage === 'logistics') {
    return <LogisticsDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}

export default App;
