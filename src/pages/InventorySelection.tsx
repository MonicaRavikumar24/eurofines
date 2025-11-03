import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { InventoryType } from '../types/auth';

const InventorySelection: React.FC = () => {
  const { user, selectedEntity, selectInventory, logout } = useAuth();
  const navigate = useNavigate();

  const inventories: { value: InventoryType; name: string; color: string; icon: string }[] = [
    { value: 'test_item', name: 'Test Item', color: 'blue', icon: '🧪' },
    { value: 'study', name: 'Study', color: 'green', icon: '📊' },
    { value: 'facility_doc', name: 'Facility Doc', color: 'purple', icon: '📁' },
  ];

  const handleSelectInventory = (inventory: InventoryType) => {
    selectInventory(inventory);
    // Redirect based on user role
    navigate(user?.role === 'admin' ? '/admin/dashboard' : '/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const getEntityDisplayName = (entity: string | null) => {
    if (!entity) return 'Unknown';
    return entity.charAt(0).toUpperCase() + entity.slice(1);
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
        {/* Header with company name and entity */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Eurofines</h1>
          <p className="text-xl text-indigo-600 font-semibold mb-2">{getEntityDisplayName(selectedEntity)}</p>
          <p className="text-lg text-gray-600">Welcome to the management portal</p>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Select Inventory</h2>

        {/* Inventory cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {inventories.map((inventory) => {
            const colors = getColorClasses(inventory.color);
            return (
              <button
                key={inventory.value}
                onClick={() => handleSelectInventory(inventory.value)}
                className={`bg-white rounded-2xl shadow-lg p-8 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 ${colors.ring} group`}
              >
                <div className="flex flex-col items-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {inventory.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{inventory.name}</h3>
                  <div className={`w-12 h-1 ${colors.bg} rounded-full`}></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/entity-selection')}
            className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            ← Back to Entities
          </button>
          <span className="text-gray-400">|</span>
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

export default InventorySelection;
