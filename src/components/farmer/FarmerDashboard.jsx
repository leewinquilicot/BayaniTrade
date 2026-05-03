import React, { useState } from 'react';

const FarmerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const products = [
    { id: 1, name: 'Organic Rice', price: '₱45/kg', stock: '500 kg', status: 'Active' },
    { id: 2, name: 'Fresh Tomatoes', price: '₱60/kg', stock: '100 kg', status: 'Active' },
    { id: 3, name: 'Eggplant', price: '₱40/kg', stock: '200 kg', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌾</span>
              <h1 className="text-xl font-bold text-gray-800">Farmer Dashboard</h1>
            </div>
            <button 
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-2">🌽</div>
            <h3 className="text-gray-600 text-sm">Active Listings</h3>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-gray-600 text-sm">Total Earnings</h3>
            <p className="text-2xl font-bold text-gray-800">₱45,600</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-gray-600 text-sm">Orders This Month</h3>
            <p className="text-2xl font-bold text-gray-800">28</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['dashboard', 'products', 'orders'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Recent Products</h2>
                <div className="space-y-3">
                  {products.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.price} • Stock: {product.stock}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {product.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Your Products</h2>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    + Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Product</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Stock</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-b">
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4">{product.price}</td>
                          <td className="py-3 px-4">{product.stock}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              {product.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Order #12345</p>
                        <p className="text-sm text-gray-600">Restaurant: Luzon Bistro</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        Pending
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Items: Organic Rice (20kg), Tomatoes (10kg)</p>
                    <p className="text-sm font-medium mt-2">Total: ₱1,500</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;