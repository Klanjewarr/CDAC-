import React, { createContext, useContext, useState, useEffect } from "react";
import { IUser } from "../types";
import api from "../services/api";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(() => {
    const saved = localStorage.getItem("job_portal_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("job_portal_token");
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("job_portal_dark") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("job_portal_dark", darkMode ? "true" : "false");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await api.get("/users/profile");
          if (res.data.success && res.data.user) {
            const userData: IUser = {
              id: res.data.user._id,
              name: res.data.user.name,
              email: res.data.user.email,
              role: res.data.user.role,
              phone: res.data.user.phone,
              company: res.data.company ? { id: res.data.company._id, name: res.data.company.name } : null,
            };
            setUser(userData);
            localStorage.setItem("job_portal_user", JSON.stringify(userData));
          }
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.success) {
        const { user: loggedInUser, accessToken } = res.data;
        setUser(loggedInUser);
        setToken(accessToken);
        localStorage.setItem("job_portal_token", accessToken);
        localStorage.setItem("job_portal_user", JSON.stringify(loggedInUser));
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Invalid email or password",
      };
    }
  };

  const register = async (data: any) => {
    try {
      const res = await api.post("/auth/register", data);
      if (res.data.success) {
        const { user: registeredUser, accessToken } = res.data;
        setUser(registeredUser);
        setToken(accessToken);
        localStorage.setItem("job_portal_token", accessToken);
        localStorage.setItem("job_portal_user", JSON.stringify(registeredUser));
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("job_portal_token");
    localStorage.removeItem("job_portal_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        darkMode,
        toggleDarkMode,
        login,
        register,
        logout,
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
