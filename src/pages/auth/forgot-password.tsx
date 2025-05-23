import { useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Head from "next/head";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axiosInstance.post("/password/forgot", {
        email,
      });
      setMessage(
        response.data.message || "Password reset link sent to your email"
      );
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Failed to send reset link. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password | Guwahati-jobs.in</title>
      </Head>

      <div className="flex min-h-screen flex-col">
        <header className="w-full flex-shrink-0 border-b border-gray-500 md:block hidden">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-end px-4">
            <div className="hidden items-center space-x-3 md:flex">
              <p className="text-sm text-gray-600">No candidate account yet?</p>
              <Button
                text="Registration"
                style="secondary"
                type="button"
                onClick={() => router.push("/auth/register")}
              />
            </div>
          </div>
        </header>

        <main className="flex flex-grow items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Forgot your password?
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Don't worry, it happens to the best of us! We'll help you reset
                your password.
              </p>
            </div>

            {message && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-800">{message}</p>
              </div>
            )}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="text-left">
                <TextField
                  label="Your email"
                  type="email"
                  value={email}
                  onChange={(value: string) => setEmail(value)}
                  placeholder="name@example.com"
                  isRequired
                  name="email"
                />
              </div>

              <div className="flex flex-col mx-auto">
                <Button
                  text={isLoading ? "Sending Reset Link..." : "Send Reset Link"}
                  style="primary"
                  type="submit"
                  isDisabled={isLoading}
                />
              </div>
            </form>

            <div className="flex flex-col text-center">
              <Button
                text="Back to login"
                style="ghost"
                type="button"
                onClick={() => router.push("/auth/login")}
              />
            </div>

            <div className="mt-10 border-t border-gray-500 pt-6 text-center md:hidden">
              <p className="text-sm text-gray-600">
                No candidate account yet?{" "}
                <a
                  href="/auth/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Registration
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
