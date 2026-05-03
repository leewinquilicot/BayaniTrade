import React, { useState } from 'react';

const RestaurantDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('browse');

  const availableProduce = [
    { id: 1, farm: 'Green Valley Farm', product: 'Organic Rice', price: '₱45/kg', distance: '5 km' },
    { id: 2, farm: 'Sunshine Fields', product: 'Fresh Tomatoes', price: '₱60/kg', distance: '8 km' },
    { id: 3, farm: 'Mountain View', product: 'Eggplant', price: '₱40/kg', distance: '12 km' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🍽️</span>
              <h1 className="text-xl font-bold text-gray-800">Restaurant Dashboard</h1>
            </div>
            <button onClick={onLogout} className="text-gray-600 hover:text-gray-800">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['browse', 'orders', 'favorites'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search for fresh produce..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-3">
              {availableProduce.map(item => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-lg">{item.product}</p>
                      <p className="text-gray-600">{item.farm}</p>
                      <p className="text-sm text-gray-500 mt-1">📍 {item.distance} away</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">{item.price}</p>
                      <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;