import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

// A flexible User interface to handle both Job Seekers and Providers
interface User {
  userId: number;
  email: string;
  role: "job_seeker" | "job_provider";
  first_name?: string; // For Job Seekers
  last_name?: string; // For Job Seekers
  company_name?: string; // For Job Providers
}

// The raw decoded token will have one of these shapes
type DecodedToken = {
  exp: number;
} & (
  | {
      userId: number;
      email: string;
      role: "job_seeker";
      first_name: string;
      last_name: string;
    }
  | {
      userId: number;
      email: string;
      role: "job_provider";
      company_name: string;
    }
);

interface AuthContextType {
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  user: User | null;
  login: (token: string) => void; // Added login function
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeTokenAndGetUser = (token: string): User | null => {
  try {
    if (!token || token.split(".").length !== 3) return null;

    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    // Return a unified user object based on the role in the token
    if (decoded.role === "job_seeker") {
      return {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
      };
    } else if (decoded.role === "job_provider") {
      return {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        company_name: decoded.company_name,
      };
    }

    return null;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
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
      }
    }
    setIsLoadingAuth(false);
  }, []);

  // Login function implementation
  const login = (token: string) => {
    const userData = decodeTokenAndGetUser(token);
    if (userData) {
      localStorage.setItem("token", token);
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      // If token is invalid for any reason, ensure logged out state
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const value = {
    isLoggedIn,
    isLoadingAuth,
    user,
    login, // Provide login function to context
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
