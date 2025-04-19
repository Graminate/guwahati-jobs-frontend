import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand and Social */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Guwahati Jobs
            </h3>
            <p className="text-sm mb-4">
              Connecting talent with opportunities in Guwahati.
            </p>
          </div>

          {/* Column 2: Job Seekers */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Job Seekers
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Your Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/alerts"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link
                  href="/saved-jobs"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Employers */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Employers
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/post-job"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/dashboard"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} Guwahati Jobs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
