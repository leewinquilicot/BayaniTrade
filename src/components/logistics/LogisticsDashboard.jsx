import React, { useState } from 'react';

const DELIVERIES = [
  { id: 1, from: 'Green Valley Farm', to: 'Casa Manila Restaurant', items: 'Rice (20kg), Vegetables (10kg)', fee: '₱350', status: 'Pending' },
  { id: 2, from: 'Sunshine Fields', to: 'Bistro Verde', items: 'Tomatoes (15kg), Herbs (5kg)', fee: '₱280', status: 'In Progress' },
  { id: 3, from: 'Mountain View', to: 'The Garden Cafe', items: 'Eggplant (10kg), Carrots (8kg)', fee: '₱310', status: 'Completed' },
  { id: 4, from: 'Rizal Farms', to: 'Manila Eats', items: 'Green Peppers (12kg)', fee: '₱240', status: 'Pending' },
];

const statusStyle = {
  Pending:       'bg-orange-100 text-orange-600',
  'In Progress': 'bg-blue-100 text-blue-600',
  Completed:     'bg-green-100 text-green-600',
};

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const LogisticsDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('available');
  const [deliveries, setDeliveries] = useState(DELIVERIES);

  const accept = (id) => {
    setDeliveries(deliveries.map((d) =>
      d.id === id ? { ...d, status: 'In Progress' } : d
    ));
  };

  const complete = (id) => {
    setDeliveries(deliveries.map((d) =>
      d.id === id ? { ...d, status: 'Completed' } : d
    ));
  };

  const visible = deliveries.filter((d) => {
    if (activeTab === 'available') return d.status === 'Pending';
    if (activeTab === 'active')    return d.status === 'In Progress';
    return d.status === 'Completed';
  });

  const NAV = [
    { id: 'available', label: 'Available' },
    { id: 'active',    label: 'Active' },
    { id: 'history',   label: 'History' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-52 bg-blue-800 flex flex-col flex-shrink-0 min-h-screen">
        <div className="flex items-center space-x-2 px-5 py-5 border-b border-blue-700">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9 6 6 7 4 8c0 4 3 7 8 6V22h1V14c5 1 8-2 8-6-2-1-5-2-8-6z" />
          </svg>
          <span className="text-white font-bold text-lg">BayaniTrade</span>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-5 border-t border-blue-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-200 hover:bg-blue-700 hover:text-white transition-colors"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200 px-8 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Logistics Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, {currentUser?.name || 'Driver'}!</p>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <p className="text-blue-100 text-sm font-medium mb-3">Available Deliveries</p>
              <p className="text-4xl font-bold mb-1">{deliveries.filter(d => d.status === 'Pending').length}</p>
              <p className="text-blue-200 text-sm">Ready to accept</p>
            </div>
            <div className="bg-orange-400 rounded-2xl p-6 text-white">
              <p className="text-orange-100 text-sm font-medium mb-3">In Progress</p>
              <p className="text-4xl font-bold mb-1">{deliveries.filter(d => d.status === 'In Progress').length}</p>
              <p className="text-orange-100 text-sm">Active routes</p>
            </div>
            <div className="bg-green-600 rounded-2xl p-6 text-white">
              <p className="text-green-100 text-sm font-medium mb-3">Today's Earnings</p>
              <p className="text-4xl font-bold mb-1">₱2,450</p>
              <p className="text-green-200 text-sm">+₱350 from last delivery</p>
            </div>
          </div>

          {/* Delivery list */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 capitalize">{activeTab} Deliveries</h2>
            <p className="text-gray-400 text-sm mb-5">
              {activeTab === 'available' && 'Deliveries waiting to be accepted'}
              {activeTab === 'active' && 'Your current deliveries in progress'}
              {activeTab === 'history' && 'Your completed deliveries'}
            </p>

            {visible.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No deliveries here right now.</p>
            ) : (
              <div className="space-y-3">
                {visible.map((d) => (
                  <div key={d.id} className="border border-gray-100 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[d.status]}`}>
                        {d.status}
                      </span>
                      <span className="text-blue-700 font-bold text-lg">{d.fee}</span>
                    </div>

                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-400 w-10">From</span>
                        <span className="font-semibold text-gray-800">{d.from}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-400 w-10">To</span>
                        <span className="font-semibold text-gray-800">{d.to}</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">Items: {d.items}</p>
                    </div>

                    <div className="flex space-x-2">
                      {d.status === 'Pending' && (
                        <button
                          onClick={() => accept(d.id)}
                          className="flex-1 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                        >
                          Accept Delivery
                        </button>
                      )}
                      {d.status === 'In Progress' && (
                        <button
                          onClick={() => complete(d.id)}
                          className="flex-1 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
                        >
                          Mark as Completed
                        </button>
                      )}
                      {d.status === 'Completed' && (
                        <button className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl">
                          View Receipt
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogisticsDashboard;
