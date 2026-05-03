import React, { useState } from 'react';

const LogisticsDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('available');

  const deliveries = [
    { id: 1, from: 'Green Valley Farm', to: 'Luzon Bistro', items: 'Rice, Vegetables', price: '₱350', status: 'Pending' },
    { id: 2, from: 'Sunshine Fields', to: 'Manila Restaurant', items: 'Tomatoes, Herbs', price: '₱280', status: 'In Progress' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚚</span>
              <h1 className="text-xl font-bold text-gray-800">Logistics Dashboard</h1>
            </div>
            <button onClick={onLogout} className="text-gray-600 hover:text-gray-800">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-gray-600 text-sm">Available Deliveries</h3>
            <p className="text-2xl font-bold text-gray-800">8</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-gray-600 text-sm">Completed Today</h3>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-gray-600 text-sm">Today's Earnings</h3>
            <p className="text-2xl font-bold text-gray-800">₱2,450</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['available', 'active', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {deliveries.map(delivery => (
                <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500">From:</span>
                        <span className="font-medium">{delivery.from}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500">To:</span>
                        <span className="font-medium">{delivery.to}</span>
                      </div>
                      <p className="text-sm text-gray-600">Items: {delivery.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">{delivery.price}</p>
                      <button className="mt-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700">
                        Accept Delivery
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

export default LogisticsDashboard;