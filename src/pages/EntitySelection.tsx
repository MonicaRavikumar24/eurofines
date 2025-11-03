import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Entity } from '../types/auth';

const EntitySelection: React.FC = () => {
  const { user, selectEntity, logout } = useAuth();
  const navigate = useNavigate();

  const entities: { value: Entity; name: string; color: string; icon: string }[] = [
    { value: 'adgyl', name: 'Adgyl', color: 'blue', icon: '🏭' },
    { value: 'agro', name: 'Agro', color: 'green', icon: '🌾' },
    { value: 'biopharma', name: 'Biopharma', color: 'purple', icon: '💊' },
  ];

  const handleSelectEntity = (entity: Entity) => {
    selectEntity(entity);
    // Redirect to inventory selection
    navigate('/inventory-selection');
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; hover: string; ring: string } } = {
      blue: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        ring: 'focus:ring-blue-500',
      },
      green: {
        bg: 'bg-green-600',
        hover: 'hover:bg-green-700',
        ring: 'focus:ring-green-500',
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        ring: 'focus:ring-purple-500',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4">
      <div className="max-w-4xl w-full">
        {/* Header with company name */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Eurofines</h1>
          <p className="text-xl text-gray-600">Welcome to the management portal</p>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Select Entity</h2>

        {/* Entity cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {entities.map((entity) => {
            const colors = getColorClasses(entity.color);
            return (
              <button
                key={entity.value}
                onClick={() => handleSelectEntity(entity.value)}
                className={`bg-white rounded-2xl shadow-lg p-8 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 ${colors.ring} ${colors.hover} group`}
              >
                <div className="flex flex-col items-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {entity.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{entity.name}</h3>
                  <div className={`w-12 h-1 ${colors.bg} rounded-full`}></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Logout button */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntitySelection;
