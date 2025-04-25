import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  userId: number;
  email: string;
  first_name: string;
  last_name: string;

}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeTokenAndGetUser = (token: string): User | null => {
  try {
    if (!token || token.split(".").length !== 3) return null;

    const decoded = jwtDecode<{
      userId: number;
      email: string;
      first_name: string;
      last_name: string;
      exp: number;
    }>(token);

    if (decoded.exp * 1000 < Date.now()) {
      console.warn("Token expired.");
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
    };
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null; // Decoding failed
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = decodeTokenAndGetUser(token);
      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        // Invalid or expired token found
        localStorage.removeItem("token"); // Clean up
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
    setIsLoadingAuth(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    // Optionally redirect here or let components handle redirect
    window.location.href = "/"; // Simple redirect example
  };

  const value = {
    isLoggedIn,
    isLoadingAuth,
    user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
