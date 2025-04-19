import { useRouter } from "next/router";
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

export default function CandidateDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/candidates/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setCandidate(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching candidate:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="p-8">Loading candidate profile...</p>;
  if (!candidate) return <p className="p-8">Candidate not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Candidate Profile</h1>
      </header>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">
          Candidate #{candidate.id}
        </h2>
        {candidate.resume_text && (
          <p className="text-gray-700 mb-2">
            <strong>Resume:</strong> {candidate.resume_text}
          </p>
        )}
        {candidate.skills && (
          <p className="text-gray-700 mb-2">
            <strong>Skills:</strong> {candidate.skills}
          </p>
        )}
        {candidate.education && (
          <p className="text-gray-700 mb-2">
            <strong>Education:</strong> {candidate.education}
          </p>
        )}
        {candidate.experience && (
          <p className="text-gray-700 mb-2">
            <strong>Experience:</strong> {candidate.experience}
          </p>
        )}
        {candidate.portfolio_url && (
          <p className="text-gray-700 mb-2">
            <strong>Portfolio:</strong>{" "}
            <a
              href={candidate.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Portfolio
            </a>
          </p>
        )}
      </div>
      <div className="mt-8">
        <Link href="/candidates">
          <p className="text-blue-600 hover:underline">Back to Candidates</p>
        </Link>
      </div>
    </div>
  );
}
