import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

export default function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Login attempted with:", { email, password });
  };

  return (
    <>
      <Head>
        <title>Company Login | GuwahatiJobs.in</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/images/logo-small.png"
              alt="Logo"
              width={500}
              height={500}
              className="h-40 w-40 rounded-full"
              priority
            />
          </Link>

          <div className="text-center">
            <p className="text-sm text-gray-600">Enter your credentials.</p>

            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Log into Guwahati-Jobs
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md">
              <div>
                <TextField
                  name="email"
                  label="Your email"
                  type="email"
                  value={email}
                  onChange={(value: string) => setEmail(value)}
                  placeholder="name@company.comm"
                  isRequired
                />
              </div>

              <TextField
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(value: string) => setPassword(value)}
                placeholder="Password"
                isRequired
              />

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col ">
              <Button
                text={isLoading ? "Logging in..." : "Login"}
                style="primary"
                type="submit"
                isDisabled={isLoading}
              />
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            No employer account yet?{" "}
            <a
              href="/auth/company_register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
