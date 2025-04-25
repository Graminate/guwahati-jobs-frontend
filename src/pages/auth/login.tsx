import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheckCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token: string): { exp: number } | null => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    if (decoded.exp * 1000 < Date.now()) {
      console.warn("Token expired client-side");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        router.replace("/candidate"); // Simplified redirect to candidate dashboard
      } else {
        localStorage.removeItem("token");
        setIsCheckingAuth(false);
      }
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      router.push("/candidate"); // Always redirect to candidate dashboard after login
    } catch (err: any) {
      console.error("Login error:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("No response from server. Please try again.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const InfoPanelContent = () => (
    <div className="flex flex-col justify-top h-full">
      <div className="lg:hidden mb-4">
        <ul className="space-y-3">
          <li className="flex items-center">
            <Link href="/about" legacyBehavior>
              <a className="text-white hover:underline">About Us</a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/auth/register" legacyBehavior>
              <a className="text-white hover:underline">Registration</a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/" legacyBehavior>
              <a className="text-white hover:underline">Back to Homepage</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h1 className="text-4xl font-bold mb-8 text-white">Welcome back!</h1>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="inline-block rounded-full p-1 mr-3">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
            <span className="text-white">Simply login</span>
          </li>
          <li className="flex items-center">
            <span className="inline-block rounded-full p-1 mr-3">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
            <span className="text-white">Check ongoing applications</span>
          </li>
          <li className="flex items-center">
            <span className="inline-block rounded-full p-1 mr-3">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
            <span className="text-white">
              Simply apply for jobs hosted by Guwahati Jobs
            </span>
          </li>
        </ul>
      </div>
    </div>
  );

  if (isCheckingAuth) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Login | Guwahati Jobs</title>
      </Head>

      <div className="min-h-screen lg:flex">
        <div className="hidden lg:flex lg:flex-col justify-between lg:w-2/5 bg-indigo-200 text-white p-12">
          <div className="text-2xl font-bold text-white">Guwahati Jobs</div>
          <div className="flex-grow flex items-center">
            <InfoPanelContent />
          </div>
          <div></div>
        </div>
        <div
          className={`fixed inset-y-0 left-0 z-30 w-full max-w-sm transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } bg-indigo-200 text-white p-6 transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold text-white">Guwahati Jobs</div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-gray-200"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
          <InfoPanelContent />
        </div>
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
        {/* --- Main Content Area (Form) --- */}
        <div className="w-full lg:w-3/5 flex flex-col bg-white">
          <div className="flex justify-between items-center p-4 lg:p-6">
            <div className="flex items-center justify-between w-full lg:hidden">
              <div className="text-2xl font-bold text-dark">Guwahati Jobs</div>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>

            <div className="lg:block"></div>

            {/* Registration Link (Top Right) */}
            <div className="hidden md:block text-sm">
              <span className="text-gray-600 mr-2">No account yet?</span>
              <Link href="/auth/register" legacyBehavior>
                <a className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-400 font-medium">
                  Registration
                </a>
              </Link>
            </div>
          </div>

          {/* Form Container */}
          <div className="flex-grow flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <form onSubmit={handleLogin} className="w-full">
                <p className="flex flex-row mx-auto justify-center text-sm text-gray-200 mb-1">
                  Enter your credentials
                </p>
                <h2 className="flex flex-row mx-auto justify-center text-lg font-semibold mb-12">
                  Log into Guwahati Jobs
                </h2>
                {error && (
                  <p className="text-red-500 text-sm text-center -mt-3 mb-4">
                    {error}
                  </p>
                )}

                <div className="flex flex-col space-y-4">
                  <TextField
                    label="Your email"
                    type="email"
                    value={email}
                    onChange={(value: string) => setEmail(value)}
                    placeholder="name@example.com"
                    isRequired
                    name="email"
                  />
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(value: string) => setPassword(value)}
                    placeholder="Enter your password"
                    isRequired
                  />
                  <Button
                    text={isLoading ? "Logging in..." : "Login"}
                    style="primary"
                    type="submit"
                    isDisabled={isLoading}
                  />
                </div>
                <p className="text-sm text-center mt-4 lg:hidden">
                  No account yet?{" "}
                  <Link href="/auth/register" legacyBehavior>
                    <a className="text-blue-600 hover:underline">
                      Registration
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
