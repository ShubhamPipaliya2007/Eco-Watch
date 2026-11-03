import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_USERS_KEY = "ecowatch_registered_users";
const STORAGE_CURRENT_USER_KEY = "ecowatch_auth_user";

const DEFAULT_DEMO_USERS = [
  {
    id: "usr_aarav_demo",
    fullName: "Aarav Sharma",
    phone: "+91 98100 45678",
    email: "aarav@ecowatch.org",
    password: "password123",
    createdAt: "2026-04-01T08:00:00.000Z",
  },
];

export function AuthProvider({ children }) {
  // Ensure default demo user is present in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      if (!stored || JSON.parse(stored).length === 0) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_DEMO_USERS));
      }
    } catch (e) {
      console.error("Failed to seed demo users into localStorage", e);
    }
  }, []);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Failed to read auth user from localStorage", e);
      return null;
    }
  });

  // Auth modal control
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login"); // 'login' | 'signup'
  const [authPromptMessage, setAuthPromptMessage] = useState("");
  const [authSuccessCallback, setAuthSuccessCallback] = useState(null);

  const openAuthModal = (mode = "login", promptMessage = "", onAuthSuccess = null) => {
    setAuthModalMode(mode);
    setAuthPromptMessage(promptMessage);
    if (onAuthSuccess && typeof onAuthSuccess === "function") {
      setAuthSuccessCallback(() => onAuthSuccess);
    } else {
      setAuthSuccessCallback(null);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthPromptMessage("");
    setAuthSuccessCallback(null);
  };

  // Helper to get registered users array
  const getRegisteredUsers = () => {
    try {
      const data = localStorage.getItem(STORAGE_USERS_KEY);
      const parsed = data ? JSON.parse(data) : [];
      return parsed.length > 0 ? parsed : DEFAULT_DEMO_USERS;
    } catch (e) {
      console.error("Failed to parse registered users", e);
      return DEFAULT_DEMO_USERS;
    }
  };

  const signup = ({ fullName, phone, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanPhone || !cleanEmail || !password) {
      throw new Error(
        "All fields (Name, Phone, Email, Password) are required.",
      );
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const users = getRegisteredUsers();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error("An account with this email address already exists.");
    }

    const newUser = {
      id: "usr_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      fullName: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      password: password, // Stored locally for instant testing
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    // Auto-login newly registered user
    const sessionUser = {
      id: newUser.id,
      fullName: newUser.fullName,
      phone: newUser.phone,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);

    if (authSuccessCallback) {
      authSuccessCallback(sessionUser);
    }

    closeAuthModal();
    return sessionUser;
  };

  const login = ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      throw new Error("Email and password are required.");
    }

    const users = getRegisteredUsers();
    const matched = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password,
    );

    if (!matched) {
      throw new Error("Invalid email or password. Please verify credentials.");
    }

    const sessionUser = {
      id: matched.id,
      fullName: matched.fullName,
      phone: matched.phone,
      email: matched.email,
      createdAt: matched.createdAt,
    };

    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);

    if (authSuccessCallback) {
      authSuccessCallback(sessionUser);
    }

    closeAuthModal();
    return sessionUser;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        isAuthModalOpen,
        authModalMode,
        authPromptMessage,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}