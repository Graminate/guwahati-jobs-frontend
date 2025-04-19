import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";

interface Interview {
  id: number;
  application_id: number;
  interview_date: string;
  interview_status: string;
  location?: string;
  notes?: string;
}

export default function EmployerInterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/interviews")
      .then((response) => {
        setInterviews(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching interviews:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Manage Interviews</h1>
      </header>
      {loading ? (
        <p>Loading interviews...</p>
      ) : interviews.length === 0 ? (
        <p>No interviews scheduled.</p>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div key={interview.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">
                Interview for Application ID: {interview.application_id}
              </h2>
              <p className="text-gray-600">
                Date: {new Date(interview.interview_date).toLocaleString()}
              </p>
              <p className="text-gray-600">
                Status: {interview.interview_status}
              </p>
              {interview.location && (
                <p className="text-gray-600">Location: {interview.location}</p>
              )}
              {interview.notes && (
                <p className="text-gray-700">Notes: {interview.notes}</p>
              )}
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
