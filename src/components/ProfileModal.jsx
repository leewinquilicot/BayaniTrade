import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const THEME = {
  farmer:     { ring: 'focus:ring-green-500',  btn: 'bg-green-600 hover:bg-green-700',   avatar: 'bg-green-100 text-green-700'  },
  restaurant: { ring: 'focus:ring-orange-400', btn: 'bg-orange-600 hover:bg-orange-700', avatar: 'bg-orange-100 text-orange-700' },
  logistics:  { ring: 'focus:ring-blue-500',   btn: 'bg-blue-600 hover:bg-blue-700',     avatar: 'bg-blue-100 text-blue-700'    },
};

const NAME_LABEL = {
  farmer:     'Farm / Full Name',
  restaurant: 'Restaurant Name',
  logistics:  'Driver Full Name',
};

const ProfileModal = ({ currentUser, onClose, onSave }) => {
  const [name,  setName]  = useState(currentUser?.name  || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);

  const role  = currentUser?.role || 'farmer';
  const theme = THEME[role] || THEME.farmer;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('Name cannot be empty.'); return; }
    setSaving(true);
    setError('');

    const { error: err } = await supabase
      .from('profiles')
      .update({ name: name.trim(), phone: phone.trim() })
      .eq('id', currentUser.id);

    if (err) {
      setError('Failed to save: ' + err.message);
    } else {
      setSuccess(true);
      onSave({ ...currentUser, name: name.trim(), phone: phone.trim() });
      setTimeout(() => { setSuccess(false); onClose(); }, 1200);
    }
    setSaving(false);
  };

  const initial = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Profile Settings</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="px-6 py-5 space-y-4">

          {/* Avatar */}
          <div className="flex justify-center">
            <div className={`w-16 h-16 rounded-full ${theme.avatar} flex items-center justify-center`}>
              <span className="text-2xl font-bold">{initial}</span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {NAME_LABEL[role]}
            </label>
            <input
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              required
              placeholder="Enter your name"
              className={`w-full px-4 py-2.5 bg-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 ${theme.ring} focus:bg-white transition-all`}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+63 912 345 6789"
              className={`w-full px-4 py-2.5 bg-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 ${theme.ring} focus:bg-white transition-all`}
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <div className="px-4 py-2.5 bg-gray-50 rounded-xl text-gray-400 text-sm truncate">
              {currentUser?.email || '—'}
            </div>
          </div>

          {/* Role (read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
            <div className="px-4 py-2.5 bg-gray-50 rounded-xl text-gray-400 text-sm capitalize">
              {role}
            </div>
          </div>

          {error   && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm font-medium">✓ Profile updated!</p>}

          <button
            type="submit"
            disabled={saving}
            className={`w-full ${theme.btn} text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center space-x-2`}
          >
            {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            <span>{saving ? 'Saving…' : 'Save Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
