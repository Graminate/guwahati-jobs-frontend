import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faGear,
  faX,
  faRightFromBracket,
  faPaperclip,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type CandidateMenuItem = {
  icon: typeof faHome;
  label: string;
  href?: string;
};

const candidateMenuItems: CandidateMenuItem[] = [
  { icon: faHome, label: "Home", href: "/talent" },
  { icon: faPaperclip, label: "Applications", href: "/talent" },
  {
    icon: faUser,
    label: "Profile",
    href: "/talent/profile",
  },
  { icon: faGear, label: "Settings", href: "/talent/settings/account" },
];

type User = {
  first_name: string;
  last_name: string;
};

type HomepageLink = {
  href: string;
  label: string;
  icon?: typeof faHome;
};

type SidebarProps = {
  isMobile?: boolean;
  onClose?: () => void;
  isLoggedIn?: boolean;
  user?: User | null;
  handleLogout?: () => void;
  userDropdownItems?: Array<{
    href?: string;
    onClick?: () => void;
    label: string;
  }>;
  loginUrl?: string;
  registerUrl?: string;
  currentPath?: string;
  homepageLinks?: HomepageLink[];
  isCollapsed?: boolean;
  onToggle?: () => void;
};

const Sidebar = ({
  isMobile = false,
  onClose = () => {},
  isLoggedIn = false,
  user = null,
  handleLogout = () => {},
  userDropdownItems = [],
  loginUrl = "/auth/login",
  registerUrl = "/auth/register",
  currentPath = "/",
  homepageLinks = [],
  isCollapsed = false,
  onToggle = () => {},
}: SidebarProps) => {
  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const handleAuthActionClick = (action?: () => void) => {
    action?.();
    if (isMobile) {
      onClose();
    }
  };

  const mainNavLinks =
    isLoggedIn && currentPath?.startsWith("/talent")
      ? candidateMenuItems
      : homepageLinks;
  const showCandidateIcons = isLoggedIn && currentPath?.startsWith("/talent");

  return (
    <aside
      className={`bg-white p-4 transition-all duration-300 ease-in-out flex flex-col ${
        isMobile
          ? "h-full w-full"
          : `fixed h-[calc(100vh-4rem)] top-16 left-0 z-50 ${
              isCollapsed ? "w-20" : "w-64"
            }`
      }`}
    >
      {isMobile && (
        <div className="flex justify-between w-full mb-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Guwahati-Jobs.in Logo"
              width={200}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faX} className="size-6 text-gray-300" />
          </button>
        </div>
      )}
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-1">
          {mainNavLinks.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href || "#"}
                onClick={handleLinkClick}
                className={`flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900 ${
                  isCollapsed && !isMobile ? "justify-center" : ""
                }`}
              >
                {showCandidateIcons && item.icon && (
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
                  />
                )}
                <span
                  className={`whitespace-nowrap transition-opacity duration-200 ${
                    isCollapsed && !isMobile
                      ? "opacity-0 hidden"
                      : "opacity-100 ml-3"
                  } ${
                    (!showCandidateIcons || !item.icon) && !isCollapsed
                      ? "ml-8"
                      : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!isMobile && (
        <div className="pt-4 border-t border-gray-200 mt-auto">
          <button
            onClick={onToggle}
            className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={isCollapsed ? faChevronRight : faChevronLeft}
              className="w-5 h-5 text-gray-600 flex-shrink-0"
            />
            <span
              className={`whitespace-nowrap transition-opacity duration-200 ${
                isCollapsed ? "opacity-0 hidden" : "opacity-100 ml-3"
              }`}
            >
              Collapse
            </span>
          </button>
        </div>
      )}

      {isMobile && (
        <div className="mt-auto pt-4 flex-shrink-0">
          {isLoggedIn && user ? (
            <>
              <Link
                className="flex items-center px-3 py-2 mb-2"
                href={`/talent`}
              >
                <img
                  src={`https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                    user.first_name
                  )}+${encodeURIComponent(
                    user.last_name
                  )}&size=250&background=e0e7ff&color=4f46e5`}
                  height={200}
                  width={200}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-3 border border-indigo-200 flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </Link>
              <ul className="space-y-1">
                {userDropdownItems.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => handleAuthActionClick(item.onClick)}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 hover:text-gray-900"
                      >
                        {item.label === "Logout" && (
                          <FontAwesomeIcon
                            icon={faRightFromBracket}
                            className="w-5 h-5 text-gray-600 flex-shrink-0"
                          />
                        )}
                        {item.label === "Settings" && (
                          <FontAwesomeIcon
                            icon={faGear}
                            className="w-5 h-5 text-gray-600 flex-shrink-0"
                          />
                        )}
                        {!["Logout", "Settings"].includes(item.label) && (
                          <div className="w-5 h-5 flex-shrink-0"></div>
                        )}
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAuthActionClick(item.onClick)}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 hover:text-gray-900 text-left"
                      >
                        {item.label === "Logout" && (
                          <FontAwesomeIcon
                            icon={faRightFromBracket}
                            className="w-5 h-5 text-gray-600 flex-shrink-0"
                          />
                        )}
                        {item.label === "Settings" && (
                          <FontAwesomeIcon
                            icon={faGear}
                            className="w-5 h-5 text-gray-600 flex-shrink-0"
                          />
                        )}
                        {!["Logout", "Settings"].includes(item.label) && (
                          <div className="w-5 h-5 flex-shrink-0"></div>
                        )}
                        <span>{item.label}</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="space-y-2">
              <li>
                <Link
                  href={registerUrl}
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 p-3 rounded-lg transition-colors text-white bg-indigo-200 hover:bg-indigo-700 justify-center"
                >
                  <span>Get Started for Free</span>
                </Link>
              </li>
              <li>
                <Link
                  href={loginUrl}
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-400 transition-colors text-black justify-center"
                >
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
