import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { userApi } from "../services/api";

const AuthContext = createContext(null);

// Cookie helper utilities
export const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
};

export const setCookie = (name, value, days = 7) => {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

export const deleteCookie = (name) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

export const AuthProvider = ({ children }) => {
  // Read initial user state from client cookie if available
  const [user, setUser] = useState(() => {
    try {
      const stored = getCookie("jokevault_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  // Derived RBAC permissions
  const roles = user?.role ? (Array.isArray(user.role) ? user.role : [user.role]) : [];
  const isAdmin = roles.includes("admin");
  const isAuthenticated = !!user;

  // Sync client-side user cookie
  useEffect(() => {
    if (user) {
      setCookie("jokevault_user", JSON.stringify(user), 7);
      setCookie("jv_authenticated", "true", 7);
    } else {
      deleteCookie("jokevault_user");
      deleteCookie("jv_authenticated");
    }
  }, [user]);

  // Verify cookie session with Fastify backend on mount
  const checkSession = useCallback(async () => {
    try {
      const res = await userApi.getMe();
      if (res?.payload?.user) {
        setUser(res.payload.user);
        return res.payload.user;
      }
    } catch {
      // Cookies expired, invalid, or missing
      setUser(null);
    } finally {
      setIsLoading(false);
    }
    return null;
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Login handler: Fastify sets httpOnly accessToken and refreshToken cookies
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await userApi.login(credentials);
      if (response?.payload?.user) {
        setUser(response.payload.user);
        return { success: true, user: response.payload.user };
      }
      return { success: false, message: response?.message || "Login failed" };
    } catch (err) {
      return { success: false, message: err?.message || "Invalid credentials" };
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler (Default role is user; admin can be passed with dev admin key)
  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await userApi.register(userData);
      return { success: true, message: response?.message || "Account registered successfully" };
    } catch (err) {
      return { success: false, message: err?.message || "Registration failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler: Clears Fastify backend cookies and local session cookies
  const logout = async () => {
    try {
      await userApi.logout();
    } catch {
      // Ignore network errors on logout
    }
    setUser(null);
    deleteCookie("jokevault_user");
    deleteCookie("jv_authenticated");
  };

  // Update profile handler
  const updateProfile = async (profileData) => {
    try {
      const res = await userApi.updateProfile(profileData);
      if (res?.payload?.user) {
        setUser((prev) => ({ ...prev, ...res.payload.user }));
        return { success: true, user: res.payload.user };
      }
      return { success: false, message: res?.message };
    } catch (err) {
      return { success: false, message: err?.message || "Update failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        isAdmin,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        checkSession,
        updateProfile,
        setUser,
        getCookie,
        setCookie,
        deleteCookie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
