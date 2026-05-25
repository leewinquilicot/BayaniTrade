import React from 'react';
import Navbar from './Navbar';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      <Navbar onGetStarted={onGetStarted} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16"
        style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 40%, #fefce8 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center py-24">
          <div className="inline-block border border-green-300 rounded-full px-4 py-1 mb-8">
            <span className="text-green-700 text-sm font-medium">Empowering Philippine Agriculture</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Let's Get Started with<br />
            <span className="text-green-600">BayaniTrade</span>
          </h1>

          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
            Connecting farmers, restaurants, and logistics providers for a sustainable and efficient agricultural marketplace across the Philippines
          </p>

          <button
            onClick={onGetStarted}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full text-base transition-colors"
          >
            Get Started Today →
          </button>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">Overview</h2>
          <p className="text-center text-green-600 mb-14 text-base">
            A comprehensive platform designed for every stakeholder in the agricultural supply chain
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* For Farmers */}
            <div
              onClick={onGetStarted}
              className="bg-green-50 rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:bg-green-100"
            >
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22V12" />
                  <path d="M12 12C10 9 7 8 5 8c0 3 2 5.5 7 4z" fill="white" stroke="none" />
                  <path d="M12 12C14 9 17 8 19 8c0 3-2 5.5-7 4z" fill="white" stroke="none" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">For Farmers</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Sell your fresh produce directly to restaurants and reach more customers efficiently with fair pricing
              </p>
              <span className="text-green-600 text-sm font-semibold">Get Started →</span>
            </div>

            {/* For Restaurants */}
            <div
              onClick={onGetStarted}
              className="bg-yellow-50 rounded-2xl p-8 flex flex-col items-center text-center border-2 border-yellow-300 shadow-md cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:bg-yellow-100"
            >
              <div className="w-16 h-16 bg-orange-400 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">For Restaurants</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Source fresh, quality ingredients directly from local farmers at competitive prices and guaranteed quality
              </p>
              <span className="text-orange-500 text-sm font-semibold">Get Started →</span>
            </div>

            {/* For Logistics */}
            <div
              onClick={onGetStarted}
              className="bg-blue-50 rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:bg-blue-100"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v3h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">For Logistics</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Connect with businesses and expand your delivery network in the rapidly growing agriculture sector
              </p>
              <span className="text-blue-600 text-sm font-semibold">Get Started →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-green-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">Features</h2>
          <p className="text-center text-orange-500 mb-14 text-base">
            Powerful tools designed to streamline your agricultural trading experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Real-time Market Prices */}
            <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 border-l-4 border-green-500">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Real-time Market Prices</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Stay updated with current market rates and make informed trading decisions with live pricing data
                </p>
              </div>
            </div>

            {/* Direct Communication */}
            <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 border-l-4 border-blue-500">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Direct Communication</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Chat directly with farmers, restaurants, and logistics partners for seamless coordination
                </p>
              </div>
            </div>

            {/* Integrated Logistics */}
            <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 border-l-4 border-orange-400">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v3h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Integrated Logistics</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Seamlessly coordinate deliveries from farm to table with real-time tracking and updates
                </p>
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 border-l-4 border-purple-500">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22V12" />
                  <path d="M12 12C10 9 7 8 5 8c0 3 2 5.5 7 4z" fill="currentColor" stroke="none" opacity="0.4" />
                  <path d="M12 12C14 9 17 8 19 8c0 3-2 5.5-7 4z" fill="currentColor" stroke="none" opacity="0.4" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Quality Assurance</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Rating system and verified reviews ensure fresh, quality produce delivered every time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">About BayaniTrade</h2>

          <div className="bg-white rounded-2xl shadow-sm p-10">
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              BayaniTrade is a revolutionary platform designed to strengthen the agricultural supply chain in the Philippines. By connecting farmers directly with restaurants and providing reliable logistics partners, we're creating a more efficient, transparent, and sustainable food distribution system.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Our mission is to empower Filipino farmers with fair prices, help restaurants access fresh local produce, and support logistics providers in growing their business. Together, we're building a stronger agricultural community.
            </p>
            <div className="text-center">
              <button
                onClick={onGetStarted}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full text-base transition-colors"
              >
                Join BayaniTrade Today →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22V12" />
              <path d="M12 12C10 9 7 8 5 8c0 3 2 5.5 7 4z" fill="currentColor" stroke="none" />
              <path d="M12 12C14 9 17 8 19 8c0 3-2 5.5-7 4z" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-white font-bold text-lg">BayaniTrade</span>
          </div>
          <p className="text-green-400 text-sm">Empowering Philippine Agriculture</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
