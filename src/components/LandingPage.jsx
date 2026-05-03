import React from 'react';
import Navbar from './Navbar';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      <Navbar onGetStarted={onGetStarted} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-green-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-6">
              <span className="text-green-800 font-semibold">🌱 Connecting Filipino Farmers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                BayaniTrade
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering Filipino farmers by connecting them directly to restaurants or karenderya partners. Fresh produce, fair prices, stronger communities.
            </p>
            
            <button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Get Started → 
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            How <span className="text-green-600">BayaniTrade</span> Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌾</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Farmers List Produce</h3>
              <p className="text-gray-600">Farmers can easily list their fresh harvest with prices and quantities</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Connection</h3>
              <p className="text-gray-600">Restaurants find and order directly from local farmers, cutting out middlemen</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Efficient Logistics</h3>
              <p className="text-gray-600">Logistics partners ensure fresh delivery from farm to restaurant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Powerful <span className="text-green-600">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md card-hover">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Real-time Inventory</h3>
              <p className="text-gray-600">Track available produce and manage your listings in real-time</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md card-hover">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Fair Pricing</h3>
              <p className="text-gray-600">Transparent pricing that benefits both farmers and buyers</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md card-hover">
              <div className="text-3xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-3">Route Optimization</h3>
              <p className="text-gray-600">Smart logistics planning for efficient deliveries</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md card-hover">
              <div className="text-3xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-3">Quality Ratings</h3>
              <p className="text-gray-600">Build trust with verified reviews and ratings system</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            About <span className="text-green-600">BayaniTrade</span>
          </h2>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              BayaniTrade was born from a simple idea: to honor the Filipino farmers - our modern-day heroes (bayani) - by giving them direct access to markets and fair prices for their hard work.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We believe in strengthening the agricultural ecosystem by connecting farmers, restaurants, and logistics providers in one seamless platform. Every transaction on BayaniTrade supports local farming communities and promotes sustainable agriculture.
            </p>
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">1000+</div>
                <div className="text-gray-600">Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-gray-600">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-gray-600">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 BayaniTrade. Supporting Filipino Agriculture.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;