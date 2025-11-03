import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, Entity, InventoryType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [selectedInventory, setSelectedInventory] = useState<InventoryType | null>(null);

  // Load user, selected entity, and inventory from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const storedEntity = localStorage.getItem('selectedEntity');
    if (storedEntity) {
      setSelectedEntity(storedEntity as Entity);
    }
    
    const storedInventory = localStorage.getItem('selectedInventory');
    if (storedInventory) {
      setSelectedInventory(storedInventory as InventoryType);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get all users from localStorage
    const usersJSON = localStorage.getItem('users');
    if (!usersJSON) return false;
    
    const users: User[] = JSON.parse(usersJSON);
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const signup = async (email: string, password: string, role: 'user' | 'admin'): Promise<boolean> => {
    // Get existing users from localStorage
    const usersJSON = localStorage.getItem('users');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      role,
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after signup
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return true;
  };

  const selectEntity = (entity: Entity) => {
    setSelectedEntity(entity);
    localStorage.setItem('selectedEntity', entity);
    // Clear inventory when entity changes
    setSelectedInventory(null);
    localStorage.removeItem('selectedInventory');
  };

  const selectInventory = (inventory: InventoryType) => {
    setSelectedInventory(inventory);
    localStorage.setItem('selectedInventory', inventory);
  };

  const logout = () => {
    setUser(null);
    setSelectedEntity(null);
    setSelectedInventory(null);
    localStorage.removeItem('user');
    localStorage.removeItem('selectedEntity');
    localStorage.removeItem('selectedInventory');
  };

  const value: AuthContextType = {
    user,
    selectedEntity,
    selectedInventory,
    login,
    signup,
    selectEntity,
    selectInventory,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
