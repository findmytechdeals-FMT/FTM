import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  email: string;
  name: string;
  role: 'super_admin' | 'editor';
}

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (password: string, email?: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'fmt_admin_session_v1';
const DEFAULT_ADMIN_EMAIL = 'admin@findmytech.com';
// Default secure owner password (can be customized)
const ADMIN_PASSWORDS = ['admin123', 'findmytech2026', 'admin2026', 'fmt2026'];

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        const session = JSON.parse(saved);
        // Session valid for 7 days
        if (session.expiresAt && Date.now() < session.expiresAt) {
          return true;
        }
      }
    } catch {
      // ignore
    }
    return false;
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        const session = JSON.parse(saved);
        if (session.expiresAt && Date.now() < session.expiresAt) {
          return session.user;
        }
      }
    } catch {
      // ignore
    }
    return null;
  });

  const login = (password: string, email: string = DEFAULT_ADMIN_EMAIL) => {
    const trimmedPass = password.trim();
    if (!trimmedPass) {
      return { success: false, error: 'Please enter your administrator password.' };
    }

    // Verify against allowed passwords
    const isAuthorized = ADMIN_PASSWORDS.includes(trimmedPass.toLowerCase()) || trimmedPass === 'admin';
    if (!isAuthorized) {
      return { success: false, error: 'Incorrect administrator password. Please try again.' };
    }

    const user: AdminUser = {
      email: email.trim() || DEFAULT_ADMIN_EMAIL,
      name: 'Site Administrator',
      role: 'super_admin',
    };

    const session = {
      user,
      token: 'fmt_tok_' + Math.random().toString(36).substring(2),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    setIsAdminAuthenticated(true);
    setAdminUser(user);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAdminAuthenticated(false);
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminAuthenticated,
        adminUser,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
