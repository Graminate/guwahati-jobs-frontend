import React, { useState, Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const jobSeekerLinks = [
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/profile", label: "Your Profile" },
    { href: "/alerts", label: "Job Alerts" },
    { href: "/saved-jobs", label: "Saved Jobs" },
  ];

  const employerLinks = [
    { href: "/post-job", label: "Post a Job" },
    { href: "/employer/dashboard", label: "Employer Dashboard" },
    { href: "/pricing", label: "Pricing Plans" },
    { href: "/candidates", label: "Browse Candidates" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
              />
              <span className="font-bold text-xl text-gray-800 dark:text-white">
                Guwahati Jobs
              </span>
            </Link>
          </div>

          {/* Center/Right Side: Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* For Employers Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 items-center">
                  For Employers
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2 -mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-600 rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {employerLinks.map((link) => (
                      <Menu.Item key={link.href}>
                        {({ active }) => (
                          <Link
                            href={link.href}
                            className={`${
                              active
                                ? "bg-indigo-500 text-white"
                                : "text-gray-900 dark:text-gray-100"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {link.label}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* For Job Seekers Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 items-center">
                  For Job Seekers
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2 -mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-600 rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {jobSeekerLinks.map((link) => (
                      <Menu.Item key={link.href}>
                        {({ active }) => (
                          <Link
                            href={link.href}
                            className={`${
                              active
                                ? "bg-indigo-500 text-white"
                                : "text-gray-900 dark:text-gray-100"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {link.label}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FontAwesomeIcon
                  icon={faX}
                  className="block h-6 w-6"
                  aria-hidden="true"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHamburger}
                  className="block h-6 w-6"
                  aria-hidden="true"
                />
              )}
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
        <div
          className="md:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-40"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Job Seeker Links */}
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-3 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                    <span>For Job Seekers</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-gray-400`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-3 pt-2 pb-2 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    {jobSeekerLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        onClick={() => setMobileMenuOpen(false)} // Close menu on click
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Mobile Employer Links */}
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-3 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                    <span>For Employers</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-gray-400`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-3 pt-2 pb-2 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    {employerLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        onClick={() => setMobileMenuOpen(false)} // Close menu on click
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Mobile Auth Links */}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-4 space-x-4">
                <Link
                  href="/login"
                  className="flex-1 text-center text-base font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 text-center inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

// Added Disclosure import for mobile dropdowns
import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faChevronDown,
  faHamburger,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default Navbar;
