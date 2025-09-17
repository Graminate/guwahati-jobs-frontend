import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

type HomepageLink = {
  href: string;
  label: string;
  icon?: any;
};

const homepageNavLinks: HomepageLink[] = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/company", label: "Company" },
  { href: "/resources", label: "Resources" },
];

type User = {
  first_name: string;
  last_name: string;
};

type Props = {
  children: React.ReactNode;
  noSidebar?: boolean;
};

const DefaultLayout = ({ children, noSidebar = false }: Props) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setIsLoggedIn(false);
        setUser(null);
        return;
      }
      try {
        const decoded = decodeToken(token);
        let isValidForNow = false;
        if (decoded && decoded.exp * 1000 > Date.now()) {
          if (decoded.first_name && decoded.last_name) {
            setUser({
              first_name: decoded.first_name,
              last_name: decoded.last_name,
            });
            setIsLoggedIn(true);
            isValidForNow = true;
          } else {
            console.warn("Token decoded but missing required fields.");
          }
        } else if (decoded) {
          console.warn("Token decoded but expired.");
          await handleLogout();
          setLoading(false);
          return;
        } else {
          await handleLogout();
          setLoading(false);
          return;
        }

        const verified = await verifyToken(token);
        if (!verified && isValidForNow) {
          await handleLogout();
        }
      } catch (error) {
        console.error("Auth check/verification error:", error);
        if (!axios.isAxiosError(error) || error.response?.status === 401) {
          await handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        checkAuth();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const decodeToken = (
    token: string
  ): { first_name: string; last_name: string; exp: number } | null => {
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decoded = JSON.parse(jsonPayload);
      if (
        typeof decoded.first_name === "string" &&
        typeof decoded.last_name === "string" &&
        typeof decoded.exp === "number"
      ) {
        return decoded;
      }
      return null;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  };

  const verifyToken = async (token: string) => {
    try {
      const response = await axiosInstance.get("/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data.user) {
        if (
          !user ||
          user.first_name !== response.data.user.first_name ||
          user.last_name !== response.data.user.last_name
        ) {
          setUser(response.data.user);
        }

        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
        return true;
      }

      await handleLogout();
      return false;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.log("Token verification failed (401): Logging out.");
        await handleLogout();
      } else {
        console.error("Token verification request failed:", error);
      }
      return false;
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);

    router.push("/");
  };

  const userDropdownItems = [
    { href: "/candidate/profile", label: "Profile" },
    { href: "/candidate/settings/account", label: "Settings" },
    { onClick: handleLogout, label: "Logout" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {noSidebar && (
        <Navbar
          isLoggedIn={isLoggedIn}
          user={user}
          loading={loading}
          handleLogout={handleLogout}
          userDropdownItems={userDropdownItems}
          homepageNavLinks={homepageNavLinks}
        />
      )}
      <div className="flex flex-1 w-full mx-auto">
        {!noSidebar && (
          <div className="hidden md:block flex-shrink-0 w-0">
            <Sidebar
              isMobile={false}
              isLoggedIn={isLoggedIn}
              user={user}
              currentPath={currentPath}
              homepageLinks={homepageNavLinks}
            />
          </div>
        )}

        <main
          className={`flex-1 ${
            noSidebar ? "pt-16" : ""
          } transition-all duration-300 ease-in-out ${
            !noSidebar
              ? `${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} md:pl-6`
              : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
