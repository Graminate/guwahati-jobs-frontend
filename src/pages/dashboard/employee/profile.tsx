import { useEffect, useState } from "react";
import Link from "next/link";

interface CandidateProfile {
  id: number;
  user_id: number;
  resume_text?: string;
  skills?: string;
  education?: string;
  experience?: string;
  portfolio_url?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [form, setForm] = useState({
    resume_text: "",
    skills: "",
    education: "",
    experience: "",
    portfolio_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch the candidate profile (hardcoded user id = 1 for demo)
  useEffect(() => {
    fetch("http://localhost:3000/candidates/1")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setForm({
          resume_text: data.resume_text || "",
          skills: data.skills || "",
          education: data.education || "",
          experience: data.experience || "",
          portfolio_url: data.portfolio_url || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const response = await fetch("http://localhost:3000/candidates/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setMessage("Profile updated successfully.");
    } else {
      setMessage("Failed to update profile.");
    }
    setSaving(false);
  };

  if (loading) {
    return <p className="p-8">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
      </header>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow max-w-2xl"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Resume</label>
          <textarea
            name="resume_text"
            value={form.resume_text}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Skills</label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            type="text"
            placeholder="e.g. React, Node.js"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Education</label>
          <input
            name="education"
            value={form.education}
            onChange={handleChange}
            type="text"
            placeholder="e.g. B.Tech in Computer Science"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Experience</label>
          <input
            name="experience"
            value={form.experience}
            onChange={handleChange}
            type="text"
            placeholder="e.g. 3 years in software development"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Portfolio URL</label>
          <input
            name="portfolio_url"
            value={form.portfolio_url}
            onChange={handleChange}
            type="url"
            placeholder="https://portfolio.com"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </form>
      <div className="mt-8">
        <Link href="/dashboard/employee">
          <p className="text-blue-600 hover:underline">Back to Dashboard</p>
        </Link>
      </div>
    </div>
  );
}
