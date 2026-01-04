import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHouse,
  faBriefcase,
  faInbox,
  faUsers,
  faEnvelope,
  faGear,
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";

interface RecruiterSidebarProps {
  user?: {
    first_name?: string;
    last_name?: string;
  } | null;
}

const RecruiterSidebar = ({ user }: RecruiterSidebarProps) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: faHouse, href: "/onboarding/dashboard" },
    {
      label: "Jobs",
      icon: faBriefcase,
      hasDropdown: true,
      isOpen: isJobsOpen,
      setIsOpen: setIsJobsOpen,
      subItems: [
        { label: "Active", href: "/jobs/active" },
        { label: "Drafts", href: "/jobs/drafts" },
        { label: "Archived", href: "/jobs/archived" },
      ],
    },
    {
      label: "Applications",
      icon: faInbox,
      hasDropdown: true,
      isOpen: isApplicationsOpen,
      setIsOpen: setIsApplicationsOpen,
      subItems: [
        { label: "Active", href: "/recruiter/applications/active" },
        { label: "Hired", href: "/recruiter/applications/hired" },
        { label: "Rejected", href: "/recruiter/applications/rejected" },
      ],
    },
    { label: "Talent Pool", icon: faUsers, href: "/onboarding/talent-pool" },
    {
      label: "Mailbox",
      icon: faEnvelope,
      hasDropdown: true,
      isOpen: isMailboxOpen,
      setIsOpen: setIsMailboxOpen,
      subItems: [
        { label: "Inbox", href: "/recruiter/mailbox/inbox" },
        { label: "Sent", href: "/recruiter/mailbox/sent" },
        { label: "Scheduled", href: "/recruiter/mailbox/scheduled" },
      ],
    },
    { label: "Settings", icon: faGear, href: "/onboarding/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const UserMenuContent = () => (
    <div className="bg-white rounded-xl shadow-xl py-1 min-w-[200px]">
      <Link
        href="/recruiter/settings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
      >
        User settings
      </Link>
      
      <div className="border-t border-gray-400 my-1" />
      
      <Link
        href="/support"
        className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span>Help & Support</span>
        <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-gray-400" />
      </Link>
      
      <Link
        href="/updates"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
      >
        Product updates
      </Link>
      
      <Link
        href="/feedback"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
      >
        Give feedback
      </Link>
      
      <div className="border-t border-gray-400 my-1" />
      
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium rounded-lg"
      >
        Log out
      </button>
    </div>
  );

  return (
    <aside
      className="bg-gray-50 p-4 transition-all duration-300 ease-in-out flex flex-col fixed h-screen top-0 left-0 z-50 w-72"
    >
      {/* Header */}
      <div
        className="w-full mb-6 flex items-center justify-between"
        style={{ minHeight: "48px" }}
      >
        <Link href="/" className="font-bold text-lg">
          <Image
            src="/images/logo.png"
            alt="Company Logo"
            width={120}
            height={32}
            priority
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto space-y-1">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.hasDropdown ? (
                <div className="flex flex-col">
                  <button
                    onClick={() =>
                      item.setIsOpen && item.setIsOpen(!item.isOpen)
                    }
                    className="flex items-center justify-between p-3 rounded-lg transition-colors text-gray-700 font-medium hover:bg-gray-400 w-full"
                  >
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="w-5 h-5 flex-shrink-0"
                      />
                      <span className="whitespace-nowrap ml-4">
                        {item.label}
                      </span>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`w-2 h-2 transition-transform duration-200 ${
                        item.isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {item.isOpen && item.subItems && (
                    <div className="pl-12 space-y-1 mt-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className={`block py-1 px-3 text-sm font-medium rounded-lg transition-colors ${
                            currentPath === subItem.href
                              ? "bg-gray-400 text-black"
                              : "text-gray-600 hover:bg-gray-400 hover:text-gray-900"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={`flex items-center p-3 rounded-lg transition-colors font-medium ${
                    currentPath === item.href
                      ? "bg-gray-400 text-black"
                      : "text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <span className="whitespace-nowrap ml-4">{item.label}</span>
                </Link>
              )}
            </li>
          ))}

          {/* Setup Item */}
          <li>
            <Link
              href="/onboarding/setup"
              className="flex items-center justify-between p-3 rounded-lg transition-colors font-medium bg-gray-400 hover:bg-gray-400"
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className="w-5 h-5 flex-shrink-0 animate-spin-slow"
                />
                <span className="whitespace-nowrap ml-4">Setup</span>
              </div>
              <span className="bg-gray-500 text-gray-100 px-2 py-0.5 rounded text-xs px-2">
                40%
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="mt-auto space-y-4 pt-4">
        <Button text="Create job" style="primary" width="large" onClick={() => router.push("/jobs/new")} />

        {/* User Profile */}
        <div className="relative">
          {isUserMenuOpen && (
            <div className="absolute bottom-full mb-2 z-50 w-full">
              <UserMenuContent />
            </div>
          )}

          <div className="w-full">
            <div
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-400"
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm">
                  BP
                </div>
                <span className="ml-3 text-sm font-semibold text-gray-800 whitespace-nowrap">
                  {user?.first_name 
                    ? `${user.first_name} ${user.last_name?.charAt(0) || ""}.` 
                    : "Borneel P."}
                </span>
              </div>
              <FontAwesomeIcon
                icon={isUserMenuOpen ? faChevronUp : faChevronDown}
                className="w-2 h-2"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RecruiterSidebar;

