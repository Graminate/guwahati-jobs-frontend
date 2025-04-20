import React, { useState, Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faX,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    first_name: string;
    last_name: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded = decodeToken(token);
        if (decoded) {
          setUser(decoded);
          setIsLoggedIn(true);

          verifyToken(token).catch((error) => {
            console.error("Background token verification failed:", error);
          });
        }
      } catch (error) {
        console.error("Auth error:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
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

      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleLogout();
      }
      throw error;
    }
  };

  const toEmployerLogin = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/auth/employer";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  };

  const jobSeekerLinks = [
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/profile", label: "Your Profile" },
    { href: "/alerts", label: "Job Alerts" },
    { href: "/saved-jobs", label: "Saved Jobs" },
  ];

  const employerLinks: Array<{
    href?: string;
    onClick?: () => void;
    label: string;
  }> = [{ onClick: toEmployerLogin, label: "Employer Login" }];

  const userDropdownItems = [
    { href: "/candidate/profile", label: "Profile" },
    { href: "/candidate/settings/account", label: "Settings" },
    { onClick: handleLogout, label: "Logout" },
  ];

  if (loading) {
    return (
      <nav className="bg-white w-full top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse bg-gray-500 h-8 w-32 rounded" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-xs w-full top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Guwahati-Jobs.in Logo"
                width={200}
                height={200}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {!isLoggedIn && (
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  For Employers
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2 h-4 w-4 text-gray-400"
                  />
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
                    {employerLinks.map((link) => (
                      <MenuItem key={link.label}>
                        {({ focus }) =>
                          "href" in link ? (
                            <Link
                              href={link.href!}
                              className={`${
                                focus ? "bg-gray-500" : ""
                              } block rounded-md px-4 py-2 text-sm text-dark`}
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <div
                              onClick={link.onClick}
                              className={`${
                                focus ? "bg-gray-500" : ""
                              } block rounded-md px-4 py-2 text-sm text-dark cursor-pointer`}
                            >
                              {link.label}
                            </div>
                          )
                        }
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Transition>
              </Menu>
            )}
            {isLoggedIn && user ? (
              <Menu as="div" className="relative ml-3">
                <MenuButton className="flex items-center space-x-3">
                  <img
                    src={`https://eu.ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&size=250`}
                    alt="Profile Picture"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-gray-700">
                    {user.first_name} {user.last_name}
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="h-4 w-4 text-gray-400"
                  />
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
                    {userDropdownItems.map((item) => (
                      <MenuItem key={item.label}>
                        {({ focus }) => (
                          <div
                            onClick={item.onClick}
                            className={`${
                              focus ? "bg-gray-500" : ""
                            } px-4 py-2 text-sm text-dark cursor-pointer`}
                          >
                            {item.href ? (
                              <Link
                                href={item.href}
                                className="flex items-center"
                              >
                                {item.label}
                              </Link>
                            ) : (
                              <div className="flex items-center">
                                {item.label}
                              </div>
                            )}
                          </div>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-600 hover:text-indigo-200 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-200 hover:bg-indigo-100"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600"
            >
              <span className="sr-only">Open menu</span>
              <FontAwesomeIcon
                icon={mobileMenuOpen ? faX : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={mobileMenuOpen}
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden absolute top-16 inset-x-0 p-2 bg-white shadow-lg z-40">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="w-full flex justify-between items-center px-3 py-2 text-left text-sm font-medium">
                    For Job Seekers
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`${open ? "rotate-180" : ""} h-4 w-4`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="pl-3">
                    {jobSeekerLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href || "#"}
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
            // In the Desktop Navigation section, replace the Menu component
            with:
            {!isLoggedIn && (
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  For Employers
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2 h-4 w-4 text-gray-400"
                  />
                </MenuButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
                    {employerLinks.map((link) => (
                      <MenuItem key={link.label}>
                        {({ focus }) =>
                          "href" in link ? (
                            <Link
                              href={link.href!}
                              className={`${
                                focus ? "bg-gray-500" : ""
                              } block rounded-md px-4 py-2 text-sm text-dark`}
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <div
                              onClick={link.onClick}
                              className={`${
                                focus ? "bg-gray-500" : ""
                              } block rounded-md px-4 py-2 text-sm text-dark cursor-pointer`}
                            >
                              {link.label}
                            </div>
                          )
                        }
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Transition>
              </Menu>
            )}
            <div className="pt-4 border-t">
              {isLoggedIn && user ? (
                <>
                  <div className="flex items-center px-3 py-2">
                    <div className="flex-shrink-0 bg-gray-100 p-2 rounded-full">
                      <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 space-y-1">
                    {userDropdownItems.map((item) => (
                      <div
                        key={item.label}
                        onClick={() => {
                          item.onClick?.();
                          setMobileMenuOpen(false);
                        }}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex gap-2 px-3">
                  <Link
                    href="/auth/login"
                    className="flex-1 text-center px-4 py-2 text-sm border rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex-1 text-center px-4 py-2 text-sm text-white bg-indigo-600 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;
