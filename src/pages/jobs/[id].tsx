import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setJob(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching job:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="p-8">Loading job details...</p>;
  if (!job) return <p className="p-8">Job not found.</p>;

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-dark">{job.title}</h1>
      </header>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700 mb-4">{job.description}</p>
        {job.requirements && (
          <p className="text-gray-700 mb-4">
            <strong>Requirements:</strong> {job.requirements}
          </p>
        )}
        {job.salary_range && (
          <p className="text-gray-700 mb-4">
            <strong>Salary:</strong> {job.salary_range}
          </p>
        )}
        {job.location && (
          <p className="text-gray-700 mb-4">
            <strong>Location:</strong> {job.location}
          </p>
        )}
        {job.employment_type && (
          <p className="text-gray-700 mb-4">
            <strong>Type:</strong> {job.employment_type}
          </p>
        )}
        {job.benefits && (
          <p className="text-gray-700 mb-4">
            <strong>Benefits:</strong> {job.benefits}
          </p>
        )}
      </div>
      <div className="mt-8">
        <Link href="/jobs">
          <p className="text-blue-600 hover:underline">Back to Jobs</p>
        </Link>
      </div>
    </div>
  );
}
