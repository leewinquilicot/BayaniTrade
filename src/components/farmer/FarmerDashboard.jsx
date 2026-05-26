import React, { useState } from 'react';


const PRODUCTS = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    price: '₱80/kg',
    priceNum: 80,
    stock: '250 kg',
    status: 'In Stock',
    img: '/images/tomato.jpg',
    fallback: 'from-red-400 to-orange-400',
    emoji: '🍅',
  },
  {
    id: 2,
    name: 'Fresh Lettuce',
    price: '₱60/kg',
    priceNum: 60,
    stock: '180 kg',
    status: 'In Stock',
    img: '/images/lettuce.jpg',
    fallback: 'from-green-400 to-emerald-500',
    emoji: '🥬',
  },
  {
    id: 3,
    name: 'Green Peppers',
    price: '₱70/kg',
    priceNum: 70,
    stock: '120 kg',
    status: 'In Stock',
    img: '/images/greenpeppers.jpg',
    fallback: 'from-green-500 to-lime-500',
    emoji: '🫑',
  },
  {
    id: 4,
    name: 'Sweet Corn',
    price: '₱45/kg',
    priceNum: 45,
    stock: '300 kg',
    status: 'In Stock',
    img: '/images/sweetcorn.jpg',
    fallback: 'from-yellow-400 to-amber-400',
    emoji: '🌽',
  },
  {
    id: 5,
    name: 'Organic Carrots',
    price: '₱55/kg',
    priceNum: 55,
    stock: '90 kg',
    status: 'Low Stock',
    img: '/images/carrots.jpg',
    fallback: 'from-orange-400 to-red-400',
    emoji: '🥕',
  },
  {
    id: 6,
    name: 'Cucumbers',
    price: '₱45/kg',
    priceNum: 45,
    stock: '0 kg',
    status: 'Out of Stock',
    img: '/images/cucumber.jpg',
    fallback: 'from-teal-400 to-green-500',
    emoji: '🥒',
  },
];

const ORDERS = [
  {
    id: 1,
    restaurant: 'Casa Manila Restaurant',
    status: 'Pending',
    amount: '₱5,800',
    items: 'Tomatoes (50kg), Lettuce (30kg)',
    canProcess: true,
  },
  {
    id: 2,
    restaurant: 'Bistro Verde',
    status: 'Completed',
    amount: '₱1,750',
    items: 'Green Peppers (25kg)',
    canProcess: false,
  },
  {
    id: 3,
    restaurant: 'The Garden Cafe',
    status: 'In Transit',
    amount: '₱3,400',
    items: 'Lettuce (40kg), Carrots (20kg)',
    canProcess: false,
  },
];

const SALES = [
  { month: 'Jan', amount: 32000 },
  { month: 'Feb', amount: 28000 },
  { month: 'Mar', amount: 41000 },
  { month: 'Apr', amount: 38000 },
  { month: 'May', amount: 45800 },
];

const statusStyle = {
  Pending:    'bg-orange-100 text-orange-600',
  Completed:  'bg-green-100 text-green-600',
  'In Transit': 'bg-blue-100 text-blue-600',
};

const stockStyle = {
  'In Stock':     'bg-green-500',
  'Low Stock':    'bg-yellow-400',
  'Out of Stock': 'bg-red-500',
};

/* ── Icons ─────────────────────────────────────── */
const BoxIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const TrendIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const ProductsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C9 6 6 7 4 8c0 4 3 7 8 6V22h1V14c5 1 8-2 8-6-2-1-5-2-8-6z" fill="currentColor" stroke="none" />
  </svg>
);
const SalesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);
const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

/* ── Main Component ─────────────────────────────── */
const FarmerDashboard = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState(PRODUCTS);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', emoji: '🌾' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, {
      id: products.length + 1,
      name: newProduct.name,
      price: `₱${newProduct.price}/kg`,
      priceNum: Number(newProduct.price),
      stock: `${newProduct.stock} kg`,
      status: 'In Stock',
      color: 'from-teal-400 to-cyan-500',
      emoji: newProduct.emoji,
    }]);
    setNewProduct({ name: '', price: '', stock: '', emoji: '🌾' });
    setShowAddProduct(false);
  };

  const NAV = [
    { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { id: 'products',  label: 'My Products', Icon: ProductsIcon },
    { id: 'sales',     label: 'Sales', Icon: SalesIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ── Sidebar ── */}
      <aside className="w-52 bg-green-800 flex flex-col flex-shrink-0 min-h-screen">
        {/* Logo */}
        <div className="flex items-center space-x-2 px-5 py-5 border-b border-green-700">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9 6 6 7 4 8c0 4 3 7 8 6V22h1V14c5 1 8-2 8-6-2-1-5-2-8-6z" />
          </svg>
          <span className="text-white font-bold text-lg">BayaniTrade</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-green-600 text-white'
                  : 'text-green-200 hover:bg-green-700 hover:text-white'
              }`}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-5 border-t border-green-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-green-200 hover:bg-green-700 hover:text-white transition-colors"
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
          <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, {currentUser?.name || 'Farmer'}!</p>
        </div>

        <div className="px-8 py-6 space-y-6">

          {/* ══ DASHBOARD TAB ══ */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-green-600 rounded-2xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-green-100 text-sm font-medium">Total Products</span>
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <BoxIcon />
                    </div>
                  </div>
                  <p className="text-4xl font-bold mb-1">{products.length}</p>
                  <p className="text-green-200 text-sm">{products.filter(p => p.status === 'In Stock').length} active listings</p>
                </div>

                <div className="bg-blue-500 rounded-2xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-blue-100 text-sm font-medium">Active Orders</span>
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <TrendIcon />
                    </div>
                  </div>
                  <p className="text-4xl font-bold mb-1">8</p>
                  <p className="text-blue-200 text-sm">+2 from yesterday</p>
                </div>

                <div className="bg-orange-400 rounded-2xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-orange-100 text-sm font-medium">Monthly Revenue</span>
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                      <TrendIcon />
                    </div>
                  </div>
                  <p className="text-4xl font-bold mb-1">₱45,800</p>
                  <p className="text-orange-100 text-sm">+12% from last month</p>
                </div>
              </div>

              {/* My Products preview */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">My Products</h2>
                    <p className="text-green-600 text-sm mt-0.5">Manage your product listings and inventory</p>
                  </div>
                  <button
                    onClick={() => { setActiveTab('products'); setShowAddProduct(true); }}
                    className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    <span>+</span><span>Add Product</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                  {products.slice(0, 3).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                <p className="text-gray-400 text-sm mt-0.5 mb-5">Track your latest transactions</p>
                <div className="space-y-3">
                  {ORDERS.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ══ MY PRODUCTS TAB ══ */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">My Products</h2>
                  <p className="text-green-600 text-sm mt-0.5">Manage your product listings and inventory</p>
                </div>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  <span>+</span><span>Add Product</span>
                </button>
              </div>

              {/* Add Product Form */}
              {showAddProduct && (
                <form onSubmit={handleAddProduct} className="mt-5 p-5 bg-green-50 border border-green-200 rounded-2xl space-y-3">
                  <h3 className="font-semibold text-gray-800 mb-1">New Product</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      required
                      value={newProduct.name}
                      onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Product name"
                      className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      required
                      type="number"
                      value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Price per kg (₱)"
                      className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      required
                      type="number"
                      value={newProduct.stock}
                      onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="Stock (kg)"
                      className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex space-x-2 pt-1">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                      Save Product
                    </button>
                    <button type="button" onClick={() => setShowAddProduct(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* ══ SALES TAB ══ */}
          {activeTab === 'sales' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">₱184,000</p>
                  <p className="text-green-600 text-sm mt-1">+18% this quarter</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <p className="text-gray-500 text-sm">Orders Fulfilled</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">64</p>
                  <p className="text-green-600 text-sm mt-1">+6 from last month</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <p className="text-gray-500 text-sm">Avg. Order Value</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">₱2,875</p>
                  <p className="text-green-600 text-sm mt-1">+5% from last month</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Monthly Revenue</h2>
                <div className="flex items-end space-x-4 h-40">
                  {SALES.map((s) => {
                    const pct = Math.round((s.amount / 50000) * 100);
                    return (
                      <div key={s.month} className="flex flex-col items-center flex-1 space-y-2">
                        <span className="text-xs text-gray-500 font-medium">₱{(s.amount / 1000).toFixed(0)}k</span>
                        <div
                          className="w-full bg-green-500 rounded-t-lg transition-all"
                          style={{ height: `${pct}%` }}
                        />
                        <span className="text-xs text-gray-500">{s.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Sales by Product</h2>
                <div className="space-y-3">
                  {products.slice(0, 4).map((p, i) => {
                    const pct = [68, 52, 41, 28][i];
                    return (
                      <div key={p.id} className="flex items-center space-x-3">
                        <span className="text-xl w-7">{p.emoji}</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{p.name}</span>
                            <span className="text-gray-500">{pct}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

/* ── Product Card ── */
const ProductCard = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-44">
        {product.img && !imgError ? (
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${product.fallback} flex items-center justify-center`}>
            <span className="text-7xl">{product.emoji}</span>
          </div>
        )}
        <span className={`absolute top-3 left-3 ${stockStyle[product.status]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          {product.status}
        </span>
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-bold text-gray-900 mb-3">{product.name}</h3>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Price</span>
          <span>Available Stock</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold text-base">{product.price}</span>
          <span className="text-gray-700 font-semibold text-sm">{product.stock}</span>
        </div>
      </div>
    </div>
  );
};

/* ── Order Row ── */
const OrderRow = ({ order }) => (
  <div className="border border-gray-100 rounded-2xl p-4">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-gray-900 text-sm">{order.restaurant}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[order.status]}`}>
          {order.status}
        </span>
      </div>
      <span className="text-green-600 font-bold">{order.amount}</span>
    </div>
    <p className="text-gray-400 text-sm mb-3">{order.items}</p>
    <div className="flex space-x-2">
      <button className="flex-1 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
        View Details
      </button>
      {order.canProcess && (
        <button className="flex-1 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
          Process Order
        </button>
      )}
    </div>
  </div>
);

export default FarmerDashboard;
