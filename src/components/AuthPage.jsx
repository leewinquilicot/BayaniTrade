import React, { useState } from 'react';
import { signUp, login } from '../utils/auth';

const ROLES = [
  {
    id: 'farmer',
    label: 'Farmer',
    description: 'List your fresh produce and connect directly with restaurants',
    iconBg: 'bg-green-500',
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9 6 6 7 4 8c0 4 3 7 8 6V22h1V14c5 1 8-2 8-6-2-1-5-2-8-6z" />
      </svg>
    ),
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    description: 'Source fresh ingredients directly from local farmers',
    iconBg: 'bg-orange-400',
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'logistics',
    label: 'Logistics',
    description: 'Expand your delivery network in the agriculture sector',
    iconBg: 'bg-blue-500',
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

const AuthPage = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', password: '', confirmPassword: '',
  });

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const result = login({ email: formData.email, password: formData.password });
    if (result.error) { setError(result.error); return; }
    onLogin(result.user.role);
  };

  const handleSignUpNext = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSelectRole = (roleId) => {
    const result = signUp({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      role: roleId,
    });
    if (result.error) {
      setError(result.error);
      setStep(1);
      return;
    }
    onLogin(roleId);
  };

  const switchMode = (toLogin) => {
    setIsLogin(toLogin);
    setStep(1);
    setError('');
    setShowPassword(false);
    setShowConfirm(false);
  };

  const EyeIcon = ({ visible }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      {visible ? (
        <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
      ) : (
        <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
      )}
    </svg>
  );

  const inputClass = "w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative"
      style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 40%, #fefce8 100%)' }}
    >
      {/* Back */}
      <button
        onClick={step === 2 ? () => { setStep(1); setError(''); } : onBack}
        className="absolute top-6 left-6 flex items-center space-x-1 text-gray-500 hover:text-green-600 text-sm font-medium transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span>Back</span>
      </button>

      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mb-3 shadow-md">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9 6 6 7 4 8c0 4 3 7 8 6V22h1V14c5 1 8-2 8-6-2-1-5-2-8-6z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">BayaniTrade</h1>
        <p className="text-gray-500 text-sm mt-0.5">Agricultural Marketplace Platform</p>
      </div>

      {/* ── Step 2: Role Selection ── */}
      {!isLogin && step === 2 ? (
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">Choose Your Role</h2>
            <p className="text-gray-500 text-sm text-center mb-6">Select how you'll use BayaniTrade</p>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-3">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleSelectRole(role.id)}
                  className="w-full flex items-center space-x-4 p-4 rounded-2xl border-2 border-transparent bg-gray-50 hover:bg-green-50 hover:border-green-300 transition-all duration-200 group"
                >
                  <div className={`w-12 h-12 ${role.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                    {role.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">{role.label}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{role.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-green-500 ml-auto flex-shrink-0 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-5 text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <button onClick={() => switchMode(true)} className="text-green-600 hover:text-green-700 font-semibold underline underline-offset-2 transition-colors">
              Log in here
            </button>
          </p>
        </div>
      ) : (
        /* ── Step 1: Credentials ── */
        <>
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-8">
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-7">
              <button
                onClick={() => switchMode(true)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${isLogin ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Login
              </button>
              <button
                onClick={() => switchMode(false)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${!isLogin ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sign Up
              </button>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={isLogin ? handleLoginSubmit : handleSignUpNext} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Juan Dela Cruz" />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="+63 912 345 6789" />
                  </div>
                </>
              )}

              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="your@email.com" />
              </div>

              <div>
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required className={`${inputClass} pr-12`} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className={`${inputClass} pr-12`} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      <EyeIcon visible={showConfirm} />
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-3.5 rounded-full font-semibold text-sm transition-colors mt-2 shadow-sm">
                {isLogin ? 'Login to Your Account' : 'Continue →'}
              </button>
            </form>

            {isLogin && (
              <div className="text-center mt-4">
                <button className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors">
                  Forgot your password?
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => switchMode(!isLogin)} className="text-green-600 hover:text-green-700 font-semibold underline underline-offset-2 transition-colors">
              {isLogin ? 'Sign up here' : 'Log in here'}
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
