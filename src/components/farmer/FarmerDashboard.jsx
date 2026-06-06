import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ProfileModal from '../ProfileModal';


const statusStyle = {
  Pending:      'bg-gray-100 text-gray-600',
  'To Ship':    'bg-yellow-100 text-yellow-700',
  'To Receive': 'bg-blue-100 text-blue-600',
  Completed:    'bg-green-100 text-green-600',
  'In Transit': 'bg-blue-100 text-blue-600',
};

const stockStyle = {
  'In Stock':     'bg-green-500',
  'Low Stock':    'bg-yellow-400',
  'Out of Stock': 'bg-red-500',
};

const computeStatus = (stock) =>
  stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock';

/* ── Icons ── */
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

/* ── Transform DB row → UI shape ── */
const toUiProduct = (p) => ({
  ...p,
  price: `₱${p.price}/kg`,
  priceNum: p.price,
  stock: `${p.stock} kg`,
  img: p.img_url || null,
  fallback: 'from-teal-400 to-cyan-500',
  emoji: p.emoji || '🌾',
  status: p.status || computeStatus(p.stock),
});

/* ── Main Component ── */
const FarmerDashboard = ({ currentUser, onLogout, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', emoji: '🌾', imgPreview: null, imgFile: null });
  const [saveError, setSaveError] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const processOrder = async (order, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', order.id);
    if (error) { console.error('Process order error:', error); return; }

    const updated = { ...order, status: newStatus, canProcess: false };
    setOrders(prev => prev.map(o => o.id === order.id ? updated : o));
    setOrderDetails(updated);
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, [currentUser]);

  const loadProducts = async () => {
    setLoadingProducts(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('farmer_id', currentUser.id)
      .order('created_at', { ascending: false });
    if (data) setProducts(data.map(toUiProduct));
    setLoadingProducts(false);
  };

  const loadOrders = async () => {
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('farmer_id', currentUser.id)
      .order('created_at', { ascending: false });
    if (!ordersData) return;

    const restaurantIds = [...new Set(ordersData.map(o => o.restaurant_id).filter(Boolean))];
    let nameMap = {};
    if (restaurantIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles').select('id, name').in('id', restaurantIds);
      nameMap = Object.fromEntries((profiles || []).map(p => [p.id, p.name]));
    }

    setOrders(ordersData.map(o => ({
      id: o.id,
      restaurant: nameMap[o.restaurant_id] || 'Unknown Restaurant',
      status: o.status,
      amount: `₱${Number(o.amount).toLocaleString()}`,
      rawAmount: Number(o.amount),
      items: o.items,
      created_at: o.created_at,
      date: new Date(o.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
      canProcess: o.status === 'Pending',
    })));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewProduct(prev => ({ ...prev, imgPreview: URL.createObjectURL(file), imgFile: file }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');

    let img_url = null;
    if (newProduct.imgFile) {
      const ext = newProduct.imgFile.name.split('.').pop();
      const path = `${currentUser.id}/${Date.now()}.${ext}`;
      const { data: up, error: upErr } = await supabase.storage
        .from('product-images')
        .upload(path, newProduct.imgFile, { upsert: false });
      if (!upErr && up) {
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(up.path);
        img_url = publicUrl;
      }
    }

    const stockNum = Number(newProduct.stock);
    const status = computeStatus(stockNum);

    const { data, error } = await supabase
      .from('products')
      .insert({
        farmer_id: currentUser.id,
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: stockNum,
        status,
        emoji: newProduct.emoji,
        img_url,
      })
      .select()
      .single();

    if (error) {
      console.error('Save product error:', error);
      setSaveError('Failed to save product: ' + error.message);
      setSaving(false);
      return;
    }

    if (data) setProducts(prev => [toUiProduct(data), ...prev]);
    setNewProduct({ name: '', price: '', stock: '', emoji: '🌾', imgPreview: null, imgFile: null });
    setSaveError('');
    setShowAddProduct(false);
    setSaving(false);
  };

  const NAV = [
    { id: 'dashboard', label: 'Dashboard',   Icon: DashboardIcon },
    { id: 'products',  label: 'My Products', Icon: ProductsIcon },
    { id: 'sales',     label: 'Sales',       Icon: SalesIcon },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* ── Sidebar ── */}
      <aside className="w-52 bg-green-800 flex flex-col flex-shrink-0 h-screen">
        <div className="flex items-center space-x-2 px-5 py-5 border-b border-green-700">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9 6 6 7 4 8c0 4 3 7 8 6V22h1V14c5 1 8-2 8-6-2-1-5-2-8-6z" />
          </svg>
          <span className="text-white font-bold text-lg">BayaniTrade</span>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === id ? 'bg-green-600 text-white' : 'text-green-200 hover:bg-green-700 hover:text-white'
              }`}
            >
              <Icon /><span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="px-3 pb-5 border-t border-green-700 space-y-1 pt-3">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-green-200 hover:bg-green-700 hover:text-white transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {currentUser?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <span className="truncate">{currentUser?.name || 'My Profile'}</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-green-200 hover:bg-green-700 hover:text-white transition-colors"
          >
            <LogoutIcon /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200 px-8 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, {currentUser?.name || 'Farmer'}!</p>
        </div>

        <div className="px-8 py-6 space-y-6">

          {/* ══ DASHBOARD TAB ══ */}
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-green-600 rounded-2xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-green-100 text-sm font-medium">Total Products</span>
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"><BoxIcon /></div>
                  </div>
                  <p className="text-4xl font-bold mb-1">{products.length}</p>
                  <p className="text-green-200 text-sm">{products.filter(p => p.status === 'In Stock').length} active listings</p>
                </div>
                <div className="bg-blue-500 rounded-2xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-blue-100 text-sm font-medium">Active Orders</span>
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"><TrendIcon /></div>
                  </div>
                  <p className="text-4xl font-bold mb-1">{orders.filter(o => o.status === 'Pending').length}</p>
                  <p className="text-blue-200 text-sm">Awaiting processing</p>
                </div>
                <div className="bg-orange-400 rounded-2xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-orange-100 text-sm font-medium">Total Orders</span>
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"><TrendIcon /></div>
                  </div>
                  <p className="text-4xl font-bold mb-1">{orders.length}</p>
                  <p className="text-orange-100 text-sm">All time</p>
                </div>
              </div>

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
                {loadingProducts ? (
                  <div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
                ) : products.length === 0 ? (
                  <p className="text-center text-gray-400 py-10">No products yet. Add your first product!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {products.slice(0, 3).map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                <p className="text-gray-400 text-sm mt-0.5 mb-5">Track your latest transactions</p>
                {orders.length === 0 ? (
                  <p className="text-center text-gray-400 py-6">No orders received yet.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => <OrderRow key={order.id} order={order} onViewDetails={setOrderDetails} onProcess={o => processOrder(o, 'In Transit')} />)}
                  </div>
                )}
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

                  {/* Photo upload */}
                  <div className="flex items-center gap-4">
                    <label className="flex-shrink-0 cursor-pointer">
                      <div className="w-24 h-24 rounded-xl border-2 border-dashed border-green-300 bg-white flex flex-col items-center justify-center hover:border-green-500 transition-colors overflow-hidden">
                        {newProduct.imgPreview ? (
                          <img src={newProduct.imgPreview} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <svg className="w-7 h-7 text-green-400 mb-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <span className="text-xs text-green-500 font-medium text-center leading-tight px-1">Upload Photo</span>
                          </>
                        )}
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    <div className="flex-1 space-y-1 text-xs text-gray-500">
                      <p>Click the box to upload a product photo.</p>
                      <p>Accepted: JPG, PNG, WEBP</p>
                      {newProduct.imgPreview && (
                        <button
                          type="button"
                          onClick={() => setNewProduct(prev => ({ ...prev, imgPreview: null, imgFile: null }))}
                          className="text-red-400 hover:text-red-600 font-medium transition-colors"
                        >
                          Remove photo
                        </button>
                      )}
                    </div>
                  </div>

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
                      min="1"
                      value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Price per kg (₱)"
                      className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      required
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="Stock (kg)"
                      className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  {saveError && (
                    <div className="px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                      {saveError}
                    </div>
                  )}
                  <div className="flex space-x-2 pt-1">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center space-x-2 disabled:opacity-60"
                    >
                      {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                      <span>{saving ? 'Saving…' : 'Save Product'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowAddProduct(false); setSaveError(''); }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {loadingProducts ? (
                <div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
              ) : products.length === 0 ? (
                <p className="text-center text-gray-400 py-10 mt-5">No products yet. Click "+ Add Product" to get started!</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                  {products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </div>
          )}

          {/* ══ SALES TAB ══ */}
          {activeTab === 'sales' && (
            <SalesTab orders={orders} products={products} />
          )}

        </div>
      </main>

      {/* ── Order Details Modal ── */}
      {orderDetails && (
        <FarmerOrderModal
          order={orderDetails}
          onProcess={processOrder}
          onClose={() => setOrderDetails(null)}
        />
      )}

      {/* ── Profile Modal ── */}
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

/* ── Line Chart ── */
const LineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-400">
        <p className="text-sm">No revenue data yet.</p>
        <p className="text-xs mt-1">Orders you receive will appear here.</p>
      </div>
    );
  }

  const W = 560, H = 160, pl = 48, pr = 16, pt = 24, pb = 28;
  const cW = W - pl - pr;
  const cH = H - pt - pb;
  const maxAmt = Math.max(...data.map(d => d.amount), 1);
  const step = data.length === 1 ? 0 : cW / (data.length - 1);

  const pts = data.map((d, i) => ({
    x: pl + i * step,
    y: pt + cH - (d.amount / maxAmt) * cH,
    ...d,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `M ${pts[0].x} ${pt + cH} ${pts.map(p => `L ${p.x} ${p.y}`).join(' ')} L ${pts[pts.length - 1].x} ${pt + cH} Z`;

  const yTicks = [0, 0.5, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 160 }}>
      {/* Y grid lines */}
      {yTicks.map((t, i) => {
        const y = pt + cH - t * cH;
        return (
          <g key={i}>
            <line x1={pl} y1={y} x2={W - pr} y2={y} stroke="#f3f4f6" strokeWidth="1" />
            <text x={pl - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">
              ₱{((maxAmt * t) / 1000).toFixed(0)}k
            </text>
          </g>
        );
      })}
      {/* Area */}
      <path d={areaPath} fill="rgba(34,197,94,0.08)" />
      {/* Line */}
      <path d={linePath} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots + labels */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#16a34a" stroke="white" strokeWidth="2" />
          {p.amount > 0 && (
            <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
              ₱{(p.amount / 1000).toFixed(1)}k
            </text>
          )}
          <text x={p.x} y={H - 6} textAnchor="middle" fontSize="9" fill="#6b7280">
            {p.month}
          </text>
        </g>
      ))}
    </svg>
  );
};

/* ── Sales Tab ── */
const SalesTab = ({ orders, products }) => {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.rawAmount || 0), 0);
  const fulfilled    = orders.filter(o => o.status === 'Completed').length;
  const pending      = orders.filter(o => o.status === 'Pending').length;

  /* Build monthly data from real orders */
  const monthlyMap = {};
  orders.forEach(o => {
    if (!o.created_at) return;
    const d   = new Date(o.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const lbl = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    if (!monthlyMap[key]) monthlyMap[key] = { month: lbl, amount: 0 };
    monthlyMap[key].amount += o.rawAmount || 0;
  });
  const monthlyData = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v)
    .slice(-6);

  return (
    <div className="space-y-5">
      {/* Stat boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {totalRevenue > 0 ? `₱${totalRevenue.toLocaleString()}` : '₱0'}
          </p>
          <p className="text-green-600 text-sm mt-1">From {orders.length} order{orders.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Orders Fulfilled</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{fulfilled}</p>
          <p className="text-green-600 text-sm mt-1">Completed</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Pending Orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{pending}</p>
          <p className="text-orange-500 text-sm mt-1">Awaiting action</p>
        </div>
      </div>

      {/* Line chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Revenue</h2>
        <LineChart data={monthlyData} />
      </div>

      {/* My Products */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">My Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No products yet.</p>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="flex items-center space-x-3">
                {/* Thumbnail: real photo or gradient fallback */}
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                  {p.img ? (
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${p.fallback} flex items-center justify-center`}>
                      <span className="text-xl">{p.emoji}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 truncate">{p.name}</span>
                    <span className="text-gray-500 ml-2 flex-shrink-0">{p.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${p.status === 'In Stock' ? 'bg-green-500' : p.status === 'Low Stock' ? 'bg-yellow-400' : 'bg-red-400'}`}
                        style={{ width: p.status === 'In Stock' ? '80%' : p.status === 'Low Stock' ? '30%' : '5%' }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{p.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
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
          <span>Price</span><span>Available Stock</span>
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
const OrderRow = ({ order, onViewDetails, onProcess }) => (
  <div className="border border-gray-100 rounded-2xl p-4">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-gray-900 text-sm">{order.restaurant}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[order.status] || 'bg-gray-100 text-gray-600'}`}>
          {order.status}
        </span>
      </div>
      <span className="text-green-600 font-bold">{order.amount}</span>
    </div>
    <p className="text-gray-400 text-sm mb-3">{order.items}</p>
    <div className="flex space-x-2">
      <button
        onClick={() => onViewDetails(order)}
        className="flex-1 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
      >
        View Details
      </button>
      {order.canProcess && (
        <button
          onClick={() => onProcess(order)}
          className="flex-1 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
        >
          Process Order
        </button>
      )}
    </div>
  </div>
);

/* ── Farmer Order Modal ── */
const FARMER_STEPS = ['Order Placed', 'Preparing to Ship', 'Out for Delivery', 'Completed'];
const FARMER_STEP_IDX = { Pending: 0, 'To Ship': 1, 'To Receive': 2, 'In Transit': 2, Completed: 3 };

const STATUS_MSG = {
  Pending:      { color: 'text-gray-500',  text: 'Awaiting your preparation. Pack the items and mark as ready to ship.' },
  'To Ship':    { color: 'text-yellow-600', text: 'Items packed. Waiting for logistics to pick up the parcel.' },
  'To Receive': { color: 'text-blue-600',  text: 'Parcel has been picked up and is out for delivery.' },
  Completed:    { color: 'text-green-600', text: 'Order has been received and completed by the restaurant.' },
};

const FarmerOrderModal = ({ order, onProcess, onClose }) => {
  const [processing, setProcessing] = useState(false);
  const step = FARMER_STEP_IDX[order.status] ?? 0;
  const msg  = STATUS_MSG[order.status] || STATUS_MSG.Pending;

  const handleProcess = async (newStatus) => {
    setProcessing(true);
    await onProcess(order, newStatus);
    setProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
            <p className="text-gray-400 text-xs mt-0.5">{order.date}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* 4-Step progress tracker */}
          <div>
            <div className="flex items-center justify-between">
              {FARMER_STEPS.map((s, i) => (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    i <= step ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-gray-200 text-gray-300'
                  }`}>
                    {i < step ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative flex items-center px-4 -mt-4 mb-1">
              {FARMER_STEPS.slice(0, -1).map((_, i) => (
                <div key={i} className="flex-1 h-0.5 mx-0.5" style={{ backgroundColor: i < step ? '#16a34a' : '#e5e7eb' }} />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {FARMER_STEPS.map((s, i) => (
                <p key={s} className={`text-center flex-1 text-xs leading-tight px-0.5 font-medium ${i <= step ? 'text-green-700' : 'text-gray-300'}`}>{s}</p>
              ))}
            </div>
          </div>

          {/* Status message */}
          <div className={`text-sm ${msg.color} bg-gray-50 rounded-xl px-4 py-3 font-medium`}>
            {msg.text}
          </div>

          {/* Order info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Restaurant</span>
              <span className="text-gray-800 font-medium">{order.restaurant}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Items</span>
              <span className="text-gray-800 font-medium text-right max-w-xs">{order.items}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-800 font-medium">{order.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[order.status] || 'bg-gray-100 text-gray-600'}`}>
                {order.status}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="text-gray-700 font-semibold">Total</span>
              <span className="text-green-600 font-bold text-lg">{order.amount}</span>
            </div>
          </div>

          {/* Farmer action — only when Pending */}
          {order.status === 'Pending' && (
            <button
              onClick={() => handleProcess('To Ship')}
              disabled={processing}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {processing && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              <span>{processing ? 'Updating…' : '📦 Mark as Ready to Ship'}</span>
            </button>
          )}

        </div>

        <div className="px-6 pb-5">
          <button onClick={onClose} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
