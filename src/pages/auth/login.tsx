import { useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Head from "next/head";
import DefaultLayout from "@/layout/DefaultLayout";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

      const redirectPath =
        response.data.role === "employer"
          ? "/dashboard/employer"
          : "/dashboard/employee";
      router.push(redirectPath);
    } catch (err: any) {
      console.error("Login error:", err);

      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else if (err.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Guwahati Jobs | Register</title>
      </Head>
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-md rounded-md p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Login
            </h2>

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <div className="flex flex-col gap-4">
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(value: string) => setEmail(value)}
                placeholder="you@example.com"
                isRequired
                name="email"
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(value: string) => setPassword(value)}
                placeholder="Password"
                helperText="Minimum 8 characters"
                isRequired
                autoComplete="new-password"
              />

              <Button text="Login" style="primary" type="submit" />
            </div>
          </form>
        </div>
      </DefaultLayout>
    </>
  );
}
