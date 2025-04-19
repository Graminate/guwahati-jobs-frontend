import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";

interface Application {
  id: number;
  job_posting_id: number;
  user_id: number;
  resume_url?: string;
  cover_letter?: string;
  status: string;
}

export default function EmployerApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all applications; in a real app, filter by employer's job postings.
    axiosInstance
      .get("/applications")
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching applications:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>
      </header>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">
                Application for Job ID: {app.job_posting_id}
              </h2>
              <p className="text-gray-600">Status: {app.status}</p>
              {app.cover_letter && (
                <p className="text-gray-700">
                  Cover Letter: {app.cover_letter}
                </p>
              )}
              <Link href={`/jobs/${app.job_posting_id}`}>
                <p className="text-blue-600 hover:underline">
                  View Job Details
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8">
        <Link href="/dashboard/employer">
          <p className="text-blue-600 hover:underline">Back to Dashboard</p>
        </Link>
      </div>
    </div>
  );
}
