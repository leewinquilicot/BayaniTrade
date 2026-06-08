import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ProfileModal from '../ProfileModal';

const statusStyle = {
  Waiting:       'bg-gray-100 text-gray-500',
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

const LogisticsDashboard = ({ currentUser, onLogout, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('available');
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NAV = [
    { id: 'available', label: 'Available' },
    { id: 'active',    label: 'Active' },
    { id: 'history',   label: 'History' },
  ];

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('deliveries')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setDeliveries(data);
    setLoading(false);
  };

  const accept = async (id) => {
    const delivery = deliveries.find(d => d.id === id);
    const { data, error } = await supabase
      .from('deliveries')
      .update({ status: 'In Progress', logistics_id: currentUser.id })
      .eq('id', id)
      .select()
      .single();
    if (!error && data) {
      setDeliveries(prev => prev.map(d => d.id === id ? data : d));
      // Parcel picked up — update linked order to "To Receive"
      if (delivery?.order_id) {
        await supabase.from('orders').update({ status: 'To Receive' }).eq('id', delivery.order_id);
      }
    }
  };

  const complete = async (id) => {
    const delivery = deliveries.find(d => d.id === id);
    const { data, error } = await supabase
      .from('deliveries')
      .update({ status: 'Completed' })
      .eq('id', id)
      .select()
      .single();
    if (!error && data) {
      setDeliveries(prev => prev.map(d => d.id === id ? data : d));
      // Restaurant must confirm receipt — don't auto-complete the order
    }
  };

  const visible = deliveries.filter((d) => {
    if (activeTab === 'available') return d.status === 'Pending';
    if (activeTab === 'active')    return d.status === 'In Progress' && d.logistics_id === currentUser.id;
    return d.status === 'Completed' && d.logistics_id === currentUser.id;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-800 flex flex-col flex-shrink-0 transform transition-transform duration-300 ease-in-out md:relative md:w-52 md:translate-x-0 md:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-blue-700">
          <div className="flex items-center space-x-2">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C9 6 6 7 4 8c0 4 3 7 8 6V22h1V14c5 1 8-2 8-6-2-1-5-2-8-6z" />
            </svg>
            <span className="text-white font-bold text-lg">BayaniTrade</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-blue-300 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === id ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 pb-5 border-t border-blue-700 space-y-1 pt-3">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-200 hover:bg-blue-700 hover:text-white transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {currentUser?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <span className="truncate">{currentUser?.name || 'My Profile'}</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-200 hover:bg-blue-700 hover:text-white transition-colors"
          >
            <LogoutIcon /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto w-full min-w-0">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-5">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1 rounded-lg hover:bg-gray-100 text-gray-600 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Welcome back, {currentUser?.name || 'Driver'}!</h1>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <p className="text-blue-100 text-sm font-medium mb-3">Available Deliveries</p>
              <p className="text-4xl font-bold mb-1">{deliveries.filter(d => d.status === 'Pending').length}</p>
              <p className="text-blue-200 text-sm">Ready to accept</p>
            </div>
            <div className="bg-orange-400 rounded-2xl p-6 text-white">
              <p className="text-orange-100 text-sm font-medium mb-3">In Progress</p>
              <p className="text-4xl font-bold mb-1">{deliveries.filter(d => d.status === 'In Progress' && d.logistics_id === currentUser.id).length}</p>
              <p className="text-orange-100 text-sm">Active routes</p>
            </div>
            <div className="bg-green-600 rounded-2xl p-6 text-white">
              <p className="text-green-100 text-sm font-medium mb-3">Completed</p>
              <p className="text-4xl font-bold mb-1">{deliveries.filter(d => d.status === 'Completed' && d.logistics_id === currentUser.id).length}</p>
              <p className="text-green-200 text-sm">All time</p>
            </div>
          </div>

          {/* Delivery list */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 capitalize">{activeTab} Deliveries</h2>
            <p className="text-gray-400 text-sm mb-5">
              {activeTab === 'available' && 'Deliveries waiting to be accepted'}
              {activeTab === 'active'    && 'Your current deliveries in progress'}
              {activeTab === 'history'   && 'Your completed deliveries'}
            </p>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : visible.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No deliveries here right now.</p>
            ) : (
              <div className="space-y-4">
                {visible.map((d) => (
                  <div key={d.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

                    {/* Card header */}
                    <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-gray-400">Delivery #{d.id}</span>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[d.status]}`}>
                          {d.status}
                        </span>
                      </div>
                      <span className="text-blue-700 font-bold text-base">₱{Number(d.fee).toLocaleString()} fee</span>
                    </div>

                    {/* Route */}
                    <div className="px-5 py-4">
                      <div className="flex items-stretch space-x-3 mb-4">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center pt-1">
                          <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                          <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                          <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
                        </div>
                        {/* Addresses */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-0.5">Pick up from</p>
                            <p className="text-sm font-bold text-gray-900">{d.from_location}</p>
                            <p className="text-xs text-gray-400">Farmer / Source</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">Deliver to</p>
                            <p className="text-sm font-bold text-gray-900">{d.to_location}</p>
                            <p className="text-xs text-gray-400">Restaurant / Destination</p>
                          </div>
                        </div>
                      </div>

                      {/* Order info */}
                      <div className="bg-gray-50 rounded-xl px-4 py-3 space-y-1.5 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Items</span>
                          <span className="font-medium text-gray-800 text-right max-w-xs">{d.items}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Order date</span>
                          <span className="font-medium text-gray-800">
                            {new Date(d.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      {d.status === 'Pending' && (
                        <button
                          onClick={() => accept(d.id)}
                          className="w-full py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                        >
                          Accept & Start Delivery
                        </button>
                      )}
                      {d.status === 'In Progress' && d.logistics_id === currentUser.id && (
                        <button
                          onClick={() => complete(d.id)}
                          className="w-full py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
                        >
                          Mark as Delivered
                        </button>
                      )}
                      {d.status === 'Completed' && (
                        <div className="w-full py-2.5 text-sm font-medium text-green-600 bg-green-50 rounded-xl text-center">
                          Delivery Completed
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      {showProfile && (
        <ProfileModal
          currentUser={currentUser}
          onClose={() => setShowProfile(false)}
          onSave={(updated) => { onUserUpdate(updated); setShowProfile(false); }}
        />
      )}
    </div>
  );
};

export default LogisticsDashboard;
