import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PostJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    company_id: 1, // Hardcoded for demo; use your actual company id from context
    title: "",
    description: "",
    requirements: "",
    salary_range: "",
    location: "",
    employment_type: "",
    benefits: "",
    expires_at: "",
    is_featured: false,
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const response = await fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setMessage("Job posted successfully!");
      router.push("/dashboard/employer");
    } else {
      setMessage("Failed to post job.");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Post a New Job</h1>
      </header>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow max-w-2xl"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Job Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Requirements</label>
          <textarea
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Salary Range</label>
          <input
            name="salary_range"
            value={form.salary_range}
            onChange={handleChange}
            type="text"
            placeholder="e.g. 60,000 - 80,000"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Guwahati or Remote"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Employment Type</label>
          <input
            name="employment_type"
            value={form.employment_type}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Full-time, Part-time"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Benefits</label>
          <input
            name="benefits"
            value={form.benefits}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Health insurance, PTO"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expires At</label>
          <input
            name="expires_at"
            value={form.expires_at}
            onChange={handleChange}
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="is_featured"
              checked={form.is_featured}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">Featured Job</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {saving ? "Posting..." : "Post Job"}
        </button>
      </form>
      <div className="mt-8">
        <Link href="/dashboard/employer">
          <p className="text-blue-600 hover:underline">Back to Dashboard</p>
        </Link>
      </div>
    </div>
  );
}
