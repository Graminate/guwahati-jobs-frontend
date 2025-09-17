import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import DefaultLayout from "@/layout/DefaultLayout";

type SettingsLayoutProps = {
  children: ReactNode;
  isDirty: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

const navItems = [
  { href: "/talent/settings/profile", name: "Personal settings" },
  { href: "/talent/settings/password", name: "Password" },
  { href: "/talent/settings/misc", name: "Misc" },
];

const SettingsLayout = ({
  children,
  isDirty,
  handleSubmit,
}: SettingsLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <DefaultLayout>
        <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-sans">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <button
                type="submit"
                disabled={!isDirty}
                className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg shadow-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save changes
              </button>
            </header>

            <nav className="mb-8">
              <div className="-mb-px flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={`py-2 px-3 text-sm font-medium rounded-md ${
                      router.pathname === item.href
                        ? "bg-light text-gray-200"
                        : "text-gray-200 hover:text-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            <main>{children}</main>
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};

export default SettingsLayout;
