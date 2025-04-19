import { useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import Head from "next/head";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import DefaultLayout from "@/layout/DefaultLayout";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "employee",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/register", form);

      if (response.status === 201) {
        router.push(`/dashboard/${form.role}`);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
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
            onSubmit={handleRegister}
            className="bg-white shadow-md rounded-md p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Register
            </h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-4">
                <TextField
                  label="First Name"
                  value={form.first_name}
                  onChange={(value: string) =>
                    handleChange({
                      target: { name: "first_name", value },
                    } as any)
                  }
                  placeholder="John"
                  isRequired
                />

                <TextField
                  label="Last Name"
                  value={form.last_name}
                  onChange={(value: string) =>
                    handleChange({
                      target: { name: "last_name", value },
                    } as any)
                  }
                  placeholder="Doe"
                  isRequired
                />
              </div>

              <TextField
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(value: string) =>
                  handleChange({ target: { name: "email", value } } as any)
                }
                placeholder="you@example.com"
                isRequired
                name="email"
              />

              <TextField
                label="Password"
                type="password"
                value={form.password}
                onChange={(value: string) =>
                  setForm({ ...form, password: value })
                }
                placeholder="Password"
                helperText="Minimum 8 characters"
                isRequired
                autoComplete="new-password"
              />

              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6"
              >
                <option value="employee">Employee</option>
                <option value="employer">Employer</option>
              </select>

              <div className="flex flex-col">
                <Button text="Register" style="primary" type="submit" />
              </div>

            </div>
          </form>
        </div>
      </DefaultLayout>
    </>
  );
}
