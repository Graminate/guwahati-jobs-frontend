import { useEffect, useState } from "react";
import Link from "next/link";

interface Candidate {
  id: number;
  user_id: number;
  resume_text?: string;
  skills?: string;
  education?: string;
  experience?: string;
  portfolio_url?: string;
}

export default function CandidatesIndex() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/candidates")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching candidates:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Candidates</h1>
      </header>
      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">
                Candidate #{candidate.id}
              </h2>
              {candidate.skills && (
                <p className="text-gray-700">Skills: {candidate.skills}</p>
              )}
              {candidate.education && (
                <p className="text-gray-700">
                  Education: {candidate.education}
                </p>
              )}
              <Link href={`/candidates/${candidate.id}`}>
                <p className="mt-4 inline-block text-blue-600 hover:underline">
                  View Profile
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
