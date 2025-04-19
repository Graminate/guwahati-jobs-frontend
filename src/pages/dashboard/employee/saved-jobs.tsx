import { useEffect, useState } from "react";
import Link from "next/link";

interface SavedJob {
  id: number;
  job_posting_id: number;
  title: string;
  company_name: string;
  location: string;
  employment_type: string;
}

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demonstration, using a hardcoded user id = 1.
    fetch("http://localhost:3000/saved-jobs/1")
      .then((res) => res.json())
      .then((data) => {
        setSavedJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching saved jobs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Saved Jobs</h1>
      </header>
      {loading ? (
        <p>Loading saved jobs...</p>
      ) : savedJobs.length === 0 ? (
        <p>No saved jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.job_posting_id}`}>
              <p className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-blue-600">
                  {job.title}
                </h2>
                <p className="text-gray-700">{job.company_name}</p>
                <p className="text-gray-500 text-sm">
                  {job.location} · {job.employment_type}
                </p>
              </p>
            </Link>
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
