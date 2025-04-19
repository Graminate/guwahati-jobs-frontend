import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";

interface Job {
  id: number;
  company_id: number;
  title: string;
  description: string;
  requirements?: string;
  salary_range?: string;
  location?: string;
  employment_type?: string;
  benefits?: string;
  posted_at?: string;
  expires_at?: string;
  is_featured?: boolean;
}

export default function JobsIndex() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axiosInstance.get("/jobs");
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Job Listings</h1>
      </header>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              {job.location && (
                <p className="text-gray-700">Location: {job.location}</p>
              )}
              {job.employment_type && (
                <p className="text-gray-700">Type: {job.employment_type}</p>
              )}
              <Link href={`/jobs/${job.id}`}>
                <p className="mt-4 inline-block text-blue-600 hover:underline">
                  View Details
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
