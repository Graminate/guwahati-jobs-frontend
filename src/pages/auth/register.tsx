import { useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import Head from "next/head";
import Link from "next/link";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheckCircle, faX } from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTextFieldChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("Data being sent to API:", form);

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    if (form.phone_number && !/^\+?[\d\s-]{10,}$/.test(form.phone_number)) {
      setError("Please enter a valid phone number (at least 10 digits)");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        email: form.email.trim(),
        password: form.password,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        phone_number: form.phone_number ? form.phone_number.trim() : null,
      };

      console.log("Registering with data:", payload);
      const response = await axiosInstance.post("/auth/register", payload);
      console.log("Registration response:", response);

      if (response.status === 201 || response.status === 200) {
        router.push({
          pathname: "/auth/login",
          query: { registered: "true", email: form.email },
        });
      } else {
        setError(
          response.data?.message ||
            "Registration successful, but something unexpected occurred."
        );
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.response) {
        setError(
          err.response.data.message ||
            err.response.data.error ||
            "Registration failed. Please check your input."
        );
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred during registration.");
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
            <Link href="/auth/login" legacyBehavior>
              <a className="text-white hover:underline">Login</a>
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
        <h1 className="text-4xl font-bold mb-8 text-white">
          Welcome to Guwahati Jobs!
        </h1>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="inline-block rounded-full p-1 mr-3">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
            <span className="text-white">Find local job opportunities</span>
          </li>
          <li className="flex items-center">
            <span className="inline-block rounded-full p-1 mr-3">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
            <span className="text-white">
              Apply easily to verified listings
            </span>
          </li>
          <li className="flex items-center">
            <span className="inline-block rounded-full p-1 mr-3">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
            <span className="text-white">Manage your applications</span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Register | Guwahati Jobs</title>
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
          } bg-indigo-600 text-white p-6 transition-transform duration-300 ease-in-out lg:hidden`}
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
        <div className="w-full lg:w-3/5 flex flex-col bg-white">
          <div className="flex justify-between items-center p-4 lg:p-6">
            <div className="flex items-center justify-between w-full lg:hidden">
              <div className="text-2xl font-bold text-gray-800">
                Guwahati Jobs
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            <div className="hidden lg:block text-2xl font-bold text-transparent">
              Guwahati Jobs
            </div>
            <div className="hidden md:block text-sm">
              <span className="text-gray-600 mr-2">
                Already have an account?
              </span>
              <Link href="/auth/login" legacyBehavior>
                <a className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-400 font-medium">
                  Login
                </a>
              </Link>
            </div>
          </div>

          <div className="flex-grow flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <form onSubmit={handleRegister} className="w-full space-y-5">
                <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center lg:text-left">
                  Create your account
                </h2>
                {error && (
                  <p className="text-red-500 text-sm text-center -mt-3 mb-4">
                    {error}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <TextField
                      label="First Name"
                      value={form.first_name}
                      onChange={(value: string) =>
                        handleTextFieldChange("first_name", value)
                      }
                      placeholder="John"
                      isRequired
                      name="first_name"
                    />
                  </div>
                  <div className="flex-1">
                    <TextField
                      label="Last Name"
                      value={form.last_name}
                      onChange={(value: string) =>
                        handleTextFieldChange("last_name", value)
                      }
                      placeholder="Doe"
                      isRequired
                      name="last_name"
                    />
                  </div>
                </div>
                <div>
                  <TextField
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(value: string) =>
                      handleTextFieldChange("email", value)
                    }
                    placeholder="you@example.com"
                    isRequired
                    name="email"
                  />
                </div>
                <div>
                  <TextField
                    label="Phone Number (Optional)"
                    type="tel"
                    value={form.phone_number}
                    onChange={(value: string) =>
                      handleTextFieldChange("phone_number", value)
                    }
                    placeholder="+91 12345 67890"
                    name="phone_number"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <TextField
                    label="Password"
                    type="password"
                    value={form.password}
                    onChange={(value: string) =>
                      handleTextFieldChange("password", value)
                    }
                    placeholder="Password"
                    helperText="Minimum 8 characters"
                    isRequired
                    name="password"
                    autoComplete="new-password"
                  />
                </div>
                <div className="flex flex-col pt-2">
                  <Button
                    text={isLoading ? "Registering..." : "Register"}
                    style="primary"
                    type="submit"
                    isDisabled={isLoading}
                  />
                </div>
                <p className="text-sm text-center mt-4 md:hidden">
                  Already have an account?{" "}
                  <Link href="/auth/login" legacyBehavior>
                    <a className="text-indigo-600 hover:underline font-medium">
                      Login
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
