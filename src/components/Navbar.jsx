import React, { useState } from 'react';

const Navbar = ({ onGetStarted }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22V12" />
              <path d="M12 12C12 12 7 10 5 6c3 0 5.5 1.5 7 4z" fill="currentColor" stroke="none" />
              <path d="M12 12C12 12 17 10 19 6c-3 0-5.5 1.5-7 4z" fill="currentColor" stroke="none" />
              <path d="M12 16C12 16 8 14.5 6 11c3 0 5 1.5 6 3z" fill="currentColor" stroke="none" opacity="0.7" />
            </svg>
            <span className="text-xl font-bold text-gray-900">BayaniTrade</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('overview')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              About
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <button
              onClick={() => scrollToSection('overview')}
              className="block w-full text-left py-3 text-gray-700 hover:text-green-600 font-medium"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left py-3 text-gray-700 hover:text-green-600 font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-3 text-gray-700 hover:text-green-600 font-medium"
            >
              About
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
