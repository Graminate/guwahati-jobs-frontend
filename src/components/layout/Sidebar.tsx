import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faGear,
  faRightFromBracket,
  faPaperclip,
  faQuestionCircle,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

type CandidateMenuItem = {
  icon: typeof faHome;
  label: string;
  href?: string;
};

const candidateMenuItems: CandidateMenuItem[] = [
  { icon: faHome, label: "Home", href: "/talent" },
  { icon: faPaperclip, label: "Applications", href: "/talent/applications" },
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
  userDropdownItems?: Array<{
    href?: string;
    onClick?: () => void;
    label: string;
  }>;
  loginUrl?: string;
  registerUrl?: string;
  currentPath?: string;
  homepageLinks?: HomepageLink[];
};

const Sidebar = ({
  isMobile = false,
  onClose = () => {},
  isLoggedIn = false,
  user = null,
  currentPath: currentPathProp,
  homepageLinks = [],
}: SidebarProps) => {
  const router = useRouter();
  const currentPath = currentPathProp || router.pathname;
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const mainNavLinks =
    isLoggedIn && currentPath?.startsWith("/talent")
      ? candidateMenuItems
      : homepageLinks;

  const bottomMenuItems = [
    {
      icon: faUser,
      label: "Profile",
      href: "/talent/profile",
    },
    {
      icon: faGear,
      label: "Go to settings",
      href: "/talent/settings/account",
    },
    {
      icon: faQuestionCircle,
      label: "Support & Help Center",
      href: "/support",
    },
  ];

  const UserMenuContent = () => (
    <ul className="space-y-1 bg-white">
      {bottomMenuItems.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="flex items-center p-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-400"
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="w-5 h-5 mr-3 flex-shrink-0 text-gray-300"
            />
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
      <li>
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="w-5 h-5 mr-3 flex-shrink-0"
          />
          <span>Log out</span>
        </button>
      </li>
    </ul>
  );

  return (
    <aside
      className={`bg-gray-50 p-4 transition-all duration-300 ease-in-out flex flex-col ${
        isMobile
          ? "h-full w-full"
          : `fixed h-screen top-0 left-0 z-50 ${isCollapsed ? "w-20" : "w-72"}`
      }`}
    >
      {!isMobile && (
        <div
          className={`w-full mb-4 flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
          style={{ minHeight: "48px" }}
        >
          {!isCollapsed && (
            <Link href="/" className="font-bold text-lg">
              <Image
                src="/images/logo.png"
                alt="Company Logo"
                width={120}
                height={32}
                priority
              />
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-gray-400"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FontAwesomeIcon
              icon={isCollapsed ? faChevronRight : faChevronLeft}
            />
          </button>
        </div>
      )}

      <nav className="flex-grow">
        <ul className="space-y-1">
          {mainNavLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href || "#"}
                onClick={handleLinkClick}
                className={`flex items-center p-3 rounded-lg transition-colors text-gray-700 font-medium ${
                  currentPath === item.href
                    ? "bg-gray-400 text-black"
                    : "hover:bg-gray-400"
                } ${isCollapsed && "justify-center"}`}
                title={isCollapsed ? item.label : ""}
              >
                {item.icon && (
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="w-5 h-5 flex-shrink-0"
                  />
                )}
                {!isCollapsed && (
                  <span className="whitespace-nowrap ml-4">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        {!isMobile && user && (
          <div className="relative">
            {isUserMenuOpen && isCollapsed && (
              <div className="absolute bottom-full mb-2 w-60 rounded-lg bg-white p-2 shadow-lg">
                <UserMenuContent />
              </div>
            )}

            <div
              className={`${
                !isCollapsed ? "rounded-lg p-2" : ""
              }`}
            >
              {isUserMenuOpen && !isCollapsed && (
                <>
                  <UserMenuContent />
                  <hr className="my-2 border-gray-400" />
                </>
              )}
              <div
                className={`flex items-center p-1 rounded-lg cursor-pointer transition-colors hover:bg-gray-400 ${
                  isCollapsed ? "justify-center" : "justify-between"
                }`}
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
              >
                <div className="flex items-center">
                  <img
                    src={`https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                      user.first_name
                    )}+${encodeURIComponent(
                      user.last_name
                    )}&size=250&background=e0e7ff&color=4f46e5`}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  {!isCollapsed && (
                    <span className="ml-3 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {user.first_name.charAt(0)}. {user.last_name}
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <FontAwesomeIcon
                    icon={isUserMenuOpen ? faChevronUp : faChevronDown}
                    className="w-4 h-4 text-gray-500"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
