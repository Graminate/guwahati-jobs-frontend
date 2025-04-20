import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faBriefcase,
  faUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

type MenuItem = {
  icon: typeof faHome;
  label: string;
  href?: string;
};

const menuItems: MenuItem[] = [
  { icon: faHome, label: "Dashboard", href: "/candidate" },
  { icon: faEnvelope, label: "Messages", href: "/candidate/messages" },
  {
    icon: faBriefcase,
    label: "Jobs for you",
    href: "/candidate/job-recommendations",
  },
  { icon: faUser, label: "Profile", href: "/candidate/profile" },
  { icon: faGear, label: "Settings", href: "/candidate/settings/account" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white p-4">
      <nav>
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="w-5 h-5 text-gray-600"
                />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
