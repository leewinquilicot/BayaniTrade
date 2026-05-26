import React, { useState } from 'react';

const PRODUCE = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    farm: 'Juan Farm',
    price: 80,
    stock: 250,
    rating: 4.5,
    img: '/images/tomato.jpg',
  },
  {
    id: 2,
    name: 'Fresh Lettuce',
    farm: 'Green Valley Farm',
    price: 60,
    stock: 180,
    rating: 4.8,
    img: '/images/lettuce.jpg',
  },
  {
    id: 3,
    name: 'Green Peppers',
    farm: 'Sunny Fields',
    price: 70,
    stock: 120,
    rating: 4.6,
    img: '/images/greenpeppers.jpg',
  },
  {
    id: 4,
    name: 'Carrots',
    farm: 'Mountain Fresh',
    price: 50,
    stock: 45,
    rating: 4.7,
    img: '/images/carrots.jpg',
  },
  {
    id: 5,
    name: 'Cucumbers',
    farm: 'Valley Greens',
    price: 45,
    stock: 90,
    rating: 4.4,
    img: '/images/cucumber.jpg',
  },
];

const ORDERS = [
  {
    id: 1,
    date: '2026-04-20',
    items: 'Tomatoes (30kg), Lettuce (20kg)',
    total: 3600,
    status: 'Delivered',
  },
  {
    id: 2,
    date: '2026-04-22',
    items: 'Green Peppers (15kg)',
    total: 1050,
    status: 'In Transit',
  },
  {
    id: 3,
    date: '2026-04-23',
    items: 'Carrots (25kg), Cucumbers (20kg)',
    total: 2150,
    status: 'Processing',
  },
];

const STATUS_STYLE = {
  Delivered:    'border border-green-500 text-green-600',
  'In Transit': 'border border-blue-500 text-blue-600',
  Processing:   'border border-orange-400 text-orange-500',
};

/* ── Icons ── */
const CartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const TrendIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const PeopleIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const BrowseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const OrdersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

/* ── Product Card ── */
const ProduceCard = ({ item, onAddToCart }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="relative h-44">
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-full object-cover"
        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
      />
      {/* Fallback if image missing */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-400 items-center justify-center text-5xl hidden">
        🥬
      </div>
      {/* Rating badge */}
      <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1 flex items-center space-x-1 shadow">
        <StarIcon />
        <span className="text-xs font-bold text-gray-800">{item.rating}</span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
      <p className="text-orange-600 text-sm mt-0.5">by {item.farm}</p>
      <div className="flex justify-between text-xs text-gray-400 mt-3 mb-1">
        <span>Price per kg</span>
        <span>Stock</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-orange-600 font-bold text-lg">₱{item.price}/kg</span>
        <span className="text-gray-600 text-sm font-medium">{item.stock} kg available</span>
      </div>
      <button
        onClick={() => onAddToCart(item)}
        className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
      >
        + Add to Cart
      </button>
    </div>
  </div>
);

/* ── Order Row ── */
const OrderRow = ({ order }) => (
  <div className="border border-gray-100 rounded-2xl p-4">
    <div className="flex items-start justify-between mb-2">
      <div>
        <span className="text-sm font-semibold text-gray-700">Order #{order.id}</span>
        <span className="text-gray-400 text-sm"> • {order.date}</span>
      </div>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLE[order.status]}`}>
        {order.status}
      </span>
    </div>
    <p className="text-gray-800 text-sm font-medium mb-2">{order.items}</p>
    <div className="flex items-center justify-between">
      <span className="text-orange-600 font-bold text-lg">₱{order.total.toLocaleString()}</span>
      <div className="flex space-x-2">
        <button className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
          View Details
        </button>
        {order.status === 'Delivered' && (
          <button className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
            Reorder
          </button>
        )}
      </div>
    </div>
  </div>
);

/* ── Main Component ── */
const RestaurantDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const filtered = PRODUCE.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.farm.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = () => setCartCount((c) => c + 1);

  const NAV = [
    { id: 'dashboard', label: 'Dashboard',      Icon: DashboardIcon },
    { id: 'browse',    label: 'Browse Products', Icon: BrowseIcon },
    { id: 'orders',    label: 'My Orders',       Icon: OrdersIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ── Sidebar ── */}
      <aside className="w-52 flex flex-col flex-shrink-0 min-h-screen" style={{ backgroundColor: '#7c2d12' }}>
        <div className="flex items-center space-x-2 px-5 py-5 border-b border-orange-900">
          <PeopleIcon />
          <span className="text-white font-bold text-lg">BayaniTrade</span>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'text-white'
                  : 'text-orange-200 hover:text-white'
              }`}
              style={activeTab === id ? { backgroundColor: '#c2410c' } : {}}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="px-3 py-5 border-t border-orange-900">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-orange-200 hover:text-white transition-colors"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto">

        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, {currentUser?.name || 'Restaurant'}!</p>
        </div>

        <div className="px-8 py-6 space-y-6">

          {/* ── Stat Cards (always visible) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: '#f97316' }}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-orange-100 text-sm font-medium">Total Orders</span>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                  <CartIcon />
                </div>
              </div>
              <p className="text-4xl font-bold mb-1">24</p>
              <p className="text-orange-100 text-sm">Since January 2026</p>
            </div>

            <div className="bg-blue-500 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <span className="text-blue-100 text-sm font-medium">Active Orders</span>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendIcon />
                </div>
              </div>
              <p className="text-4xl font-bold mb-1">5</p>
              <p className="text-blue-100 text-sm">Currently processing</p>
            </div>

            <div className="bg-green-600 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <span className="text-green-100 text-sm font-medium">Monthly Spending</span>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendIcon />
                </div>
              </div>
              <p className="text-4xl font-bold mb-1">₱38,400</p>
              <p className="text-green-200 text-sm">-8% from last month</p>
            </div>
          </div>

          {/* ── DASHBOARD TAB ── */}
          {activeTab === 'dashboard' && (
            <>
              {/* Available Produce preview */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900">Available Fresh Produce</h2>
                <p className="text-orange-500 text-sm mt-0.5 mb-5">Browse quality products from local farmers</p>

                {/* Search */}
                <div className="relative mb-5">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((item) => (
                    <ProduceCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                  ))}
                  {filtered.length === 0 && (
                    <p className="col-span-3 text-center text-gray-400 py-8">No produce found.</p>
                  )}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                <p className="text-gray-400 text-sm mt-0.5 mb-5">Track your purchase history and deliveries</p>
                <div className="space-y-3">
                  {ORDERS.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── BROWSE TAB ── */}
          {activeTab === 'browse' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900">Browse Fresh Produce</h2>
              <p className="text-gray-400 text-sm mt-0.5 mb-5">Order directly from local farmers</p>

              <div className="relative mb-5">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((item) => (
                  <ProduceCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                ))}
                {filtered.length === 0 && (
                  <p className="col-span-3 text-center text-gray-400 py-8">No produce found.</p>
                )}
              </div>
            </div>
          )}

          {/* ── ORDERS TAB ── */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900">My Orders</h2>
              <p className="text-gray-400 text-sm mt-0.5 mb-5">Track your purchase history and deliveries</p>
              <div className="space-y-3">
                {ORDERS.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboard;
