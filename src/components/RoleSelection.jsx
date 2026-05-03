import React from 'react';

const RoleSelection = ({ onSelectRole }) => {
  const roles = [
    {
      id: 'farmer',
      title: 'Farmer',
      icon: '🌾',
      description: 'List your fresh produce, manage inventory, and connect directly with buyers',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'restaurant',
      title: 'Restaurant Owner',
      icon: '🍽️',
      description: 'Source fresh ingredients directly from local farmers at fair prices',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'logistics',
      title: 'Logistics Partner',
      icon: '🚚',
      description: 'Provide delivery services and help connect farms to restaurants',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
            <span className="text-white text-3xl">🌱</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select how you want to participate in the BayaniTrade community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`${role.bgColor} border-2 ${role.borderColor} rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}
              onClick={() => onSelectRole(role.id)}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                <span className="text-white text-3xl">{role.icon}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                {role.title}
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                {role.description}
              </p>
              
              <button className={`w-full bg-gradient-to-r ${role.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition`}>
                Continue as {role.title} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;