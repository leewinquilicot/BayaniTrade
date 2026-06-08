import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ProfileModal from '../ProfileModal';

const STATUS_STYLE = {
  Pending:      'border border-gray-300 text-gray-500',
  'To Ship':    'border border-yellow-400 text-yellow-600',
  'To Receive': 'border border-blue-500 text-blue-600',
  Completed:    'border border-green-500 text-green-600',
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
  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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

/* ── Star display ── */
const Stars = ({ rating, size = 'sm' }) => {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const cls   = size === 'sm' ? 'text-base' : 'text-xl';
  return (
    <span className={cls}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
    </span>
  );
};

/* ── Produce Card ── */
const ProduceCard = ({ item, onOrder }) => {
  const [imgError, setImgError] = useState(false);
  const hasRating = item.ratingCount > 0;
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-44">
        {item.img && !imgError ? (
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center text-5xl">
            🥬
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1 flex items-center space-x-1 shadow">
          {hasRating ? (
            <>
              <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xs font-bold text-gray-800">{Number(item.rating).toFixed(1)}</span>
              <span className="text-xs text-gray-400">({item.ratingCount})</span>
            </>
          ) : (
            <>
              <svg className="w-3 h-3 text-gray-300 fill-gray-300" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xs text-gray-400">No ratings</span>
            </>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
        <p className="text-orange-600 text-sm mt-0.5">by {item.farm}</p>
        <div className="flex justify-between text-xs text-gray-400 mt-3 mb-1">
          <span>Price per kg</span><span>Stock</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-orange-600 font-bold text-lg">₱{item.price}/kg</span>
          <span className="text-gray-600 text-sm font-medium">{item.stock} kg available</span>
        </div>
        <button
          onClick={() => onOrder(item)}
          className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          + Order Now
        </button>
      </div>
    </div>
  );
};

/* ── Order Row ── */
const OrderRow = ({ order, onViewDetails }) => (
  <div className="border border-gray-100 rounded-2xl p-4">
    <div className="flex items-start justify-between mb-2">
      <div>
        <span className="text-sm font-semibold text-gray-700">Order #{order.id}</span>
        <span className="text-gray-400 text-sm"> • {order.date}</span>
      </div>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLE[order.status] || 'border border-gray-300 text-gray-500'}`}>
        {order.status}
      </span>
    </div>
    <p className="text-gray-800 text-sm font-medium mb-2">{order.items}</p>
    <div className="flex items-center justify-between">
      <span className="text-orange-600 font-bold text-lg">₱{Number(order.total).toLocaleString()}</span>
      <button
        onClick={() => onViewDetails(order)}
        className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
      >
        View Details
      </button>
    </div>
  </div>
);

/* ── Order Details Modal ── */
const STEPS = ['Order Placed', 'Preparing to Ship', 'Out for Delivery', 'Completed'];
const STATUS_STEP = {
  Pending: 0, 'To Ship': 1, 'To Receive': 2, 'In Transit': 2, Completed: 3, Delivered: 3,
};
const REST_STATUS_MSG = {
  Pending:      'Your order has been placed. Waiting for the farmer to prepare your items.',
  'To Ship':    'The farmer is packing your items and arranging a pickup with logistics.',
  'To Receive': 'Your parcel has been picked up and is out for delivery. Inspect and confirm when received.',
  Completed:    'Order complete! Thank you for your purchase.',
};

const StarPicker = ({ value, onChange }) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map(s => (
      <button
        key={s}
        type="button"
        onClick={() => onChange(s)}
        className="text-2xl transition-transform hover:scale-110 focus:outline-none"
      >
        <span className={s <= value ? 'text-yellow-400' : 'text-gray-200'}>★</span>
      </button>
    ))}
  </div>
);

const OrderDetailsModal = ({ order, onClose, onConfirmReceipt, myRatings = {}, onRate }) => {
  const [confirming, setConfirming] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingRating, setSubmittingRating] = useState(false);
  const step = STATUS_STEP[order.status] ?? 0;
  const msg  = REST_STATUS_MSG[order.status] || REST_STATUS_MSG.Pending;
  const existingRating = order.product_id ? myRatings[order.product_id] : null;

  const handleConfirm = async () => {
    setConfirming(true);
    await onConfirmReceipt(order.id);
    setConfirming(false);
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

          {/* 4-step tracker */}
          <div>
            <div className="flex items-center justify-between">
              {STEPS.map((s, i) => (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    i <= step ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-200 text-gray-300'
                  }`}>
                    {i < step ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative flex items-center px-3.5 -mt-4 mb-1">
              {STEPS.slice(0, -1).map((_, i) => (
                <div key={i} className="flex-1 h-0.5 mx-0.5" style={{ backgroundColor: i < step ? '#f97316' : '#e5e7eb' }} />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {STEPS.map((s, i) => (
                <p key={s} className={`text-center flex-1 text-xs leading-tight px-0.5 font-medium ${i <= step ? 'text-orange-600' : 'text-gray-300'}`}>{s}</p>
              ))}
            </div>
          </div>

          {/* Status message */}
          <div className="text-sm text-gray-600 bg-orange-50 rounded-xl px-4 py-3">{msg}</div>

          {/* Order info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Items</span>
              <span className="text-gray-800 font-medium text-right max-w-xs">{order.items}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order Date</span>
              <span className="text-gray-800 font-medium">{order.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className={`text-xs font-semibold px-3 py-0.5 rounded-full ${STATUS_STYLE[order.status] || 'border border-gray-300 text-gray-500'}`}>
                {order.status}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="text-gray-700 font-semibold">Total Amount</span>
              <span className="text-orange-600 font-bold text-lg">₱{Number(order.total).toLocaleString()}</span>
            </div>
          </div>

          {/* Restaurant confirms receipt — only when out for delivery */}
          {order.status === 'To Receive' && (
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {confirming && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              <span>{confirming ? 'Confirming…' : '✅ Order Received — Confirm Receipt'}</span>
            </button>
          )}
          {order.status === 'Completed' && (
            <div className="space-y-3">
              <div className="text-center text-green-600 text-sm font-semibold">✅ Order completed. Thank you!</div>

              {/* Rating section */}
              {order.product_id && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Rate this product</p>
                  {existingRating ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className={`text-xl ${s <= existingRating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">Your rating: {existingRating}/5</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1">
                        {[1,2,3,4,5].map(s => (
                          <button
                            key={s}
                            type="button"
                            onMouseEnter={() => setHoverRating(s)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={async () => {
                              setSubmittingRating(true);
                              await onRate(order.product_id, s);
                              setSubmittingRating(false);
                            }}
                            className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                          >
                            <span className={(s <= (hoverRating || 0)) ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                          </button>
                        ))}
                        {submittingRating && <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin ml-2" />}
                      </div>
                      <p className="text-xs text-gray-400">Tap a star to leave your rating</p>
                    </div>
                  )}
                </div>
              )}
            </div>
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

/* ── Order Modal ── */
const OrderModal = ({ item, onConfirm, onCancel }) => {
  const [rawQty, setRawQty] = useState('1');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const quantity = Math.max(1, Math.min(item.stock, Number(rawQty) || 1));
  const total = item.price * quantity;

  const decrement = () => setRawQty(q => String(Math.max(1, (Number(q) || 1) - 1)));
  const increment = () => setRawQty(q => String(Math.min(item.stock, (Number(q) || 1) + 1)));

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setRawQty(val);
  };

  const handleInputBlur = () => {
    setRawQty(String(quantity));
  };

  const handleConfirm = async () => {
    setPlacing(true);
    setError('');
    const result = await onConfirm(item, quantity);
    setPlacing(false);
    if (result?.error) setError(result.error);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h3 className="font-bold text-gray-900 mb-1">Place Order</h3>
        <p className="text-gray-500 text-sm mb-6">{item.name} — by {item.farm}</p>

        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>

        {/* Stepper row */}
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden mb-1">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity <= 1}
            className="w-14 h-14 flex items-center justify-center text-2xl font-bold text-gray-600 bg-gray-50 active:bg-gray-100 disabled:opacity-30 transition-colors select-none"
          >
            −
          </button>
          <input
            type="text"
            inputMode="numeric"
            value={rawQty}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="flex-1 h-14 text-center text-xl font-bold text-gray-900 focus:outline-none focus:bg-orange-50"
          />
          <button
            type="button"
            onClick={increment}
            disabled={quantity >= item.stock}
            className="w-14 h-14 flex items-center justify-center text-2xl font-bold text-gray-600 bg-gray-50 active:bg-gray-100 disabled:opacity-30 transition-colors select-none"
          >
            +
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mb-5">{item.stock} kg available</p>

        {/* Total */}
        <div className="bg-orange-50 rounded-xl px-4 py-3 flex justify-between items-center mb-5">
          <span className="text-sm text-gray-600 font-medium">Total</span>
          <span className="text-orange-600 font-bold text-xl">₱{total.toLocaleString()}</span>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
            {error}
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={handleConfirm}
            disabled={placing}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-60"
          >
            {placing && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            <span>{placing ? 'Placing…' : 'Confirm Order'}</span>
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const RestaurantDashboard = ({ currentUser, onLogout, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [produce, setProduce] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderModal, setOrderModal] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState(null);
  const [myRatings, setMyRatings] = useState({});   // product_id → rating value

  const loadMyRatings = async () => {
    const { data } = await supabase
      .from('ratings')
      .select('product_id, rating')
      .eq('restaurant_id', currentUser.id);
    if (data) setMyRatings(Object.fromEntries(data.map(r => [r.product_id, r.rating])));
  };

  const submitRating = async (productId, rating) => {
    await supabase.from('ratings').upsert(
      { product_id: productId, restaurant_id: currentUser.id, rating },
      { onConflict: 'product_id,restaurant_id' }
    );
    setMyRatings(prev => ({ ...prev, [productId]: rating }));
    // Reload produce so the average updates
    loadProduce();
  };

  const confirmReceipt = async (orderId) => {
    const { error } = await supabase.from('orders').update({ status: 'Completed' }).eq('id', orderId);
    if (!error) {
      const updated = { ...detailsModal, status: 'Completed' };
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Completed' } : o));
      setDetailsModal(updated);
    }
  };

  const NAV = [
    { id: 'dashboard', label: 'Dashboard',       Icon: DashboardIcon },
    { id: 'browse',    label: 'Browse Products', Icon: BrowseIcon },
    { id: 'orders',    label: 'My Orders',       Icon: OrdersIcon },
  ];

  useEffect(() => {
    loadProduce();
    loadOrders();
    loadMyRatings();
  }, [currentUser]);

  const loadProduce = async () => {
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: ratingsData } = await supabase
      .from('ratings')
      .select('product_id, rating');

    if (productsData) {
      // Build average rating map
      const avgMap = {};
      ratingsData?.forEach(r => {
        if (!avgMap[r.product_id]) avgMap[r.product_id] = { sum: 0, count: 0 };
        avgMap[r.product_id].sum += Number(r.rating);
        avgMap[r.product_id].count += 1;
      });

      const farmerIds = [...new Set(productsData.map(p => p.farmer_id).filter(Boolean))];
      let nameMap = {};
      if (farmerIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles').select('id, name').in('id', farmerIds);
        nameMap = Object.fromEntries((profiles || []).map(p => [p.id, p.name]));
      }
      setProduce(productsData.map(p => {
        const avg = avgMap[p.id];
        return {
          ...p,
          farm: p.farmer_name || nameMap[p.farmer_id] || 'Unknown Farm',
          img: p.img_url || null,
          rating: avg ? avg.sum / avg.count : null,
          ratingCount: avg ? avg.count : 0,
        };
      }));
    }
    setLoading(false);
  };

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('restaurant_id', currentUser.id)
      .order('created_at', { ascending: false });
    if (data) setOrders(data.map(o => ({
      ...o,
      date: new Date(o.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: o.amount,
    })));
  };

  const handlePlaceOrder = async (item, quantity) => {
    const amount = item.price * quantity;

    // 1. Create the order; embed names directly so farmer/restaurant portals never rely on cross-user profile lookups
    const basePayload = {
      restaurant_id: currentUser.id,
      restaurant_name: currentUser.name || '',
      farmer_id: item.farmer_id || null,
      farmer_name: item.farm || '',
      items: `${item.name} (${quantity}kg)`,
      amount,
      status: 'Pending',
    };

    let { data: orderData, error } = await supabase
      .from('orders').insert({ ...basePayload, product_id: item.id }).select().single();

    // Retry without columns that may not exist in the schema yet
    if (error) {
      const msg = error.message || '';
      if (msg.includes('product_id') || msg.includes('restaurant_name') || msg.includes('farmer_name')) {
        const { restaurant_name, farmer_name, ...minimalPayload } = basePayload;
        const retry = await supabase.from('orders').insert(minimalPayload).select().single();
        orderData = retry.data;
        error = retry.error;
      }
    }

    if (error) {
      console.error('Order error:', error);
      return { error: error.message || 'Could not place order. Please try again.' };
    }

    if (orderData) {
      // 2. Auto-create a logistics delivery job immediately
      const fee = Math.max(150, Math.round(amount * 0.1));
      const { error: deliveryError } = await supabase.from('deliveries').insert({
        order_id: orderData.id,
        from_location: item.farm,
        to_location: currentUser.name,
        items: `${item.name} (${quantity}kg)`,
        fee,
        status: 'Waiting',
      });
      if (deliveryError) console.error('Delivery creation error:', deliveryError);

      setOrders(prev => [{
        ...orderData,
        date: new Date(orderData.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
        total: orderData.amount,
      }, ...prev]);
      setOrderModal(null);
    }
    return {};
  };

  const filtered = produce.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.farm.toLowerCase().includes(search.toLowerCase())
  );

  const ProduceGrid = ({ items }) =>
    loading ? (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    ) : items.length === 0 ? (
      <p className="text-center text-gray-400 py-8 col-span-3">
        {search ? 'No produce found.' : 'No products available yet.'}
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ProduceCard key={item.id} item={item} onOrder={setOrderModal} />
        ))}
      </div>
    );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col flex-shrink-0 transform transition-transform duration-300 ease-in-out md:relative md:w-52 md:translate-x-0 md:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ backgroundColor: '#7c2d12' }}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-orange-900">
          <div className="flex items-center space-x-2">
            <PeopleIcon />
            <span className="text-white font-bold text-lg">BayaniTrade</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-orange-300 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === id ? 'text-white' : 'text-orange-200 hover:text-white'
              }`}
              style={activeTab === id ? { backgroundColor: '#c2410c' } : {}}
            >
              <Icon /><span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="px-3 pb-5 border-t border-orange-900 space-y-1 pt-3">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-orange-200 hover:text-white transition-colors"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ backgroundColor: '#c2410c' }}>
              {currentUser?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <span className="truncate">{currentUser?.name || 'My Profile'}</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-orange-200 hover:text-white transition-colors"
          >
            <LogoutIcon /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto w-full min-w-0">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-5">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1 rounded-lg hover:bg-gray-100 text-gray-600 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Welcome back, {currentUser?.name || 'Restaurant'}!</h1>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">

          {/* ── Stat Cards (dashboard only) ── */}
          {activeTab === 'dashboard' && <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: '#f97316' }}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-orange-100 text-sm font-medium">Total Orders</span>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"><CartIcon /></div>
              </div>
              <p className="text-4xl font-bold mb-1">{orders.length}</p>
              <p className="text-orange-100 text-sm">All time</p>
            </div>
            <div className="bg-blue-500 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <span className="text-blue-100 text-sm font-medium">Pending Orders</span>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"><TrendIcon /></div>
              </div>
              <p className="text-4xl font-bold mb-1">{orders.filter(o => o.status === 'Pending').length}</p>
              <p className="text-blue-100 text-sm">Being processed</p>
            </div>
            <div className="bg-green-600 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <span className="text-green-100 text-sm font-medium">Available Produce</span>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"><TrendIcon /></div>
              </div>
              <p className="text-4xl font-bold mb-1">{produce.length}</p>
              <p className="text-green-200 text-sm">From local farmers</p>
            </div>
          </div>}

          {/* ── DASHBOARD TAB ── */}
          {activeTab === 'dashboard' && (
            <>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900">Available Fresh Produce</h2>
                <p className="text-orange-500 text-sm mt-0.5 mb-5">Browse quality products from local farmers</p>
                <div className="relative mb-5">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2"><SearchIcon /></div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                  />
                </div>
                <ProduceGrid items={filtered} />
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                <p className="text-gray-400 text-sm mt-0.5 mb-5">Track your purchase history</p>
                {orders.length === 0 ? (
                  <p className="text-center text-gray-400 py-6">No orders placed yet.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => <OrderRow key={order.id} order={order} onViewDetails={setDetailsModal} />)}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── BROWSE TAB ── */}
          {activeTab === 'browse' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900">Browse Fresh Produce</h2>
              <p className="text-gray-400 text-sm mt-0.5 mb-5">Order directly from local farmers</p>
              <div className="relative mb-5">
                <div className="absolute left-4 top-1/2 -translate-y-1/2"><SearchIcon /></div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                />
              </div>
              <ProduceGrid items={filtered} />
            </div>
          )}

          {/* ── ORDERS TAB ── */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900">My Orders</h2>
              <p className="text-gray-400 text-sm mt-0.5 mb-5">Track your purchase history and deliveries</p>
              {orders.length === 0 ? (
                <p className="text-center text-gray-400 py-6">No orders placed yet. Browse produce to order!</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => <OrderRow key={order.id} order={order} onViewDetails={setDetailsModal} />)}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* ── Order Modal ── */}
      {orderModal && (
        <OrderModal
          item={orderModal}
          onConfirm={handlePlaceOrder}
          onCancel={() => setOrderModal(null)}
        />
      )}

      {/* ── Order Details Modal ── */}
      {detailsModal && (
        <OrderDetailsModal
          order={detailsModal}
          onClose={() => setDetailsModal(null)}
          onConfirmReceipt={confirmReceipt}
          myRatings={myRatings}
          onRate={submitRating}
        />
      )}

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

export default RestaurantDashboard;
