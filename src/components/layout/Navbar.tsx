import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faX } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

type User = {
  first_name: string;
  last_name: string;
};

type HomepageLink = {
  href: string;
  label: string;
  icon?: any;
};

type UserDropdownItem = {
  href?: string;
  onClick?: () => void;
  label: string;
};

type NavbarProps = {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  handleLogout: () => void;
  userDropdownItems: UserDropdownItem[];
  homepageNavLinks: HomepageLink[];
};

const Navbar = ({
  isLoggedIn,
  user,
  loading,
  handleLogout,
  userDropdownItems,
  homepageNavLinks,
}: NavbarProps) => {
  const router = useRouter();
  const pathname = router.pathname;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <nav className="bg-white shadow-xs w-full fixed top-0 left-0 z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded" />
            <div className="animate-pulse bg-gray-200 h-8 w-8 rounded md:hidden" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-white shadow-xs w-full fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={200}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            <div className="hidden md:flex md:space-x-6">
              {pathname === "/" && (
                <div className="flex flex-row">
                  {homepageNavLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-medium text-black hover:text-indigo-200 px-3 py-2 rounded-md"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {isLoggedIn && user ? (
                <>
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600">
                      <span className="sr-only">Open user menu</span>
                    </MenuButton>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg">
                        <div className="py-1">
                          {userDropdownItems.map((item) => (
                            <MenuItem key={item.label}>
                              {({ focus }) =>
                                item.href ? (
                                  <Link
                                    href={item.href}
                                    onClick={
                                      item.label === "Logout"
                                        ? handleLogout
                                        : item.onClick
                                    }
                                    className={`${
                                      focus ? "bg-gray-500" : "text-gray-700"
                                    } block px-4 py-2 text-sm`}
                                  >
                                    {item.label}
                                  </Link>
                                ) : (
                                  <button
                                    onClick={
                                      item.label === "Logout"
                                        ? handleLogout
                                        : item.onClick
                                    }
                                    className={`${
                                      focus
                                        ? "bg-gray-500 text-black"
                                        : "text-gray-700"
                                    } block w-full px-4 py-2 text-sm text-left`}
                                  >
                                    {item.label}
                                  </button>
                                )
                              }
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/auth/login"
                      className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="px-4 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-200 hover:bg-indigo-700 "
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-black"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-sidebar"
              >
                <span className="sr-only">Open menu</span>
                <FontAwesomeIcon
                  icon={mobileMenuOpen ? faX : faBars}
                  className="h-6 w-6 text-gray-300"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog
          onClose={() => setMobileMenuOpen(false)}
          className="relative z-40 md:hidden"
        >
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel
              id="mobile-sidebar"
              className="fixed inset-y-0 left-0 w-full bg-white"
            ></DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;
