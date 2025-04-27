import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Swal from "sweetalert2";
import Image from "next/image";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import axiosInstance from "@/utils/axiosInstance";

const ResetPasswordPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email") || "";
    const tokenParam = urlParams.get("token") || "";

    if (!emailParam || !tokenParam) {
      Swal.fire({
        title: "Invalid Link",
        text: "This password reset link is invalid or expired.",
        icon: "error",
        confirmButtonColor: "#3b82f6",
        confirmButtonText: "Go Home",
      }).then(() => {
        router.push("/");
      });
      return;
    }

    setEmail(emailParam);
    setToken(tokenParam);
    setIsTokenValid(true);
  }, [router]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      Swal.fire({
        title: "Password Too Short",
        text: "Password must be at least 6 characters long.",
        icon: "warning",
        confirmButtonColor: "#3b82f6",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post("/password/reset", {
        email,
        token,
        newPassword,
      });

      Swal.fire({
        title: "Success!",
        text: "Your password has been successfully reset. You can now log in.",
        icon: "success",
        confirmButtonColor: "#3b82f6",
        confirmButtonText: "Login",
      }).then(() => {
        router.push("/auth/login");
      });
    } catch (error: any) {
      console.error("Password Reset Error:", error);
      Swal.fire({
        title: "Reset Failed",
        text:
          error.response?.data?.error ||
          "An error occurred while resetting your password. Please try the link again or request a new one.",
        icon: "error",
        confirmButtonColor: "#3b82f6",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Password - JOIN</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-white">
        {/* Header */}
        <header className="w-full border-b border-gray-500 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Guwahati-Jobs Logo"
                  width={80}
                  height={20}
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm">
            {isTokenValid ? (
              <>
                <h1 className="mb-6 text-center text-xl font-semibold text-gray-900">
                  Please create a new password.
                </h1>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <TextField
                      id="new-password"
                      label="New password"
                      type="password"
                      value={newPassword}
                      onChange={(value: string) => setNewPassword(value)}
                      placeholder="6+ characters"
                      isRequired
                      isDisabled={isLoading}
                    />
                  </div>

                  <div>
                    <Button
                      text={isLoading ? "Setting..." : "Set new password"}
                      type="submit"
                      isDisabled={isLoading}
                      width="large"
                      style="primary"
                    />
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center text-gray-500">Loading...</div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ResetPasswordPage;
