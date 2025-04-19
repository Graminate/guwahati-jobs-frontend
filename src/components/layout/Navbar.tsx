import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const jobSeekerLinks = [
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/profile", label: "Your Profile" },
    { href: "/alerts", label: "Job Alerts" },
    { href: "/saved-jobs", label: "Saved Jobs" },
  ];

  const employerLinks = [{ href: "/employer_login", label: "Employer Login" }];

  return (
    <nav className="bg-white shadow-sm w-full top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={"/images/logo.png"}
                alt="Guwahati-Jobs.in Logo"
                width={200}
                height={200}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex justify-center w-full rounded-md px-3 py-2 text-sm font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 items-center">
                  For Employers
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2 -mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </MenuButton>
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
                <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100rounded-md bg-white shadow-lg focus:outline-none">
                  <div className="px-1 py-1 ">
                    {employerLinks.map((link) => (
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            href={link.href}
                            className={`${
                              focus ? "bg-indigo-200 text-light" : "text-dark"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {link.label}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Transition>
            </Menu>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-gray-600 hover:text-indigo-200 px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center px-4 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-200 hover:bg-indigo-100"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-dark hover:bg-gray-500"
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
                  icon={faBars}
                  className="block size-8"
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
          className="md:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right bg-white shadow-lg ring-1 ring-dark ring-opacity-5 z-40"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex justify-between w-full px-3 py-2 text-left text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                    <span>For Job Seekers</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-gray-400`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-3 pt-2 pb-2 text-sm text-gray-500 space-y-1">
                    {jobSeekerLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-dark"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>

            {/* Mobile Employer Links */}
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex justify-between w-full px-3 py-2 text-left text-sm font-medium text-gray-700  rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-200 focus-visible:ring-opacity-75">
                    <span>For Employers</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-gray-400`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-3 pt-2 pb-2 text-sm text-dark space-y-1">
                    {employerLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-500 hover:text-dark"
                        onClick={() => setMobileMenuOpen(false)} // Close menu on click
                      >
                        {link.label}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>

            {/* Mobile Auth Links */}
            <div className="pt-4 pb-3 border-t border-gray-300">
              <div className="flex items-center px-4 space-x-4">
                <Link
                  href="/auth/login"
                  className="flex-1 text-center text-base font-medium text-dark hover:text-indigo-200 px-3 py-2 rounded-md border border-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 text-center inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-200 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
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
  faBars,
  faBriefcase,
  faChevronDown,
  faHamburger,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default Navbar;
