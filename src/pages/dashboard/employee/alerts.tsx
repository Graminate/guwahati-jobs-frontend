import { useEffect, useState } from "react";
import Link from "next/link";

interface JobAlert {
  id: number;
  criteria: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoding user id = 1 for demonstration.
    fetch("http://localhost:3000/job-alerts/1")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job alerts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Job Alerts</h1>
      </header>
      {loading ? (
        <p>Loading job alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No job alerts found.</p>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700">Criteria: {alert.criteria}</p>
              {/* Additional actions like edit/delete could go here */}
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
