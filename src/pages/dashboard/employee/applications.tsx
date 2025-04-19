import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";

interface Application {
  id: number;
  job_posting_id: number;
  title: string;
  status: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axiosInstance.get("/applications");
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Applications</h1>
      </header>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{app.title}</h2>
              <p className="text-gray-600">Status: {app.status}</p>
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
        <Link href="/dashboard/employee">
          <p className="text-blue-600 hover:underline">Back to Dashboard</p>
        </Link>
      </div>
    </div>
  );
}
