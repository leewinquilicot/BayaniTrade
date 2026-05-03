import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import RoleSelection from './components/RoleSelection';
import FarmerDashboard from './components/farmer/FarmerDashboard';
import RestaurantDashboard from './components/restaurant/RestaurantDashboard';
import LogisticsDashboard from './components/logistics/LogisticsDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleLogin = () => {
    setCurrentPage('role');
  };

  const handleBack = () => {
    setCurrentPage('landing');
  };

  const handleSelectRole = (role) => {
    setCurrentPage(role);
  };

  const handleLogout = () => {
    setCurrentPage('landing');
  };

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
    return <FarmerDashboard onLogout={handleLogout} />;
  }

  if (currentPage === 'restaurant') {
    return <RestaurantDashboard onLogout={handleLogout} />;
  }

  if (currentPage === 'logistics') {
    return <LogisticsDashboard onLogout={handleLogout} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}

export default App;