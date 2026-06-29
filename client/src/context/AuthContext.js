"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("blogUser");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("blogUser", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("blogUser");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
