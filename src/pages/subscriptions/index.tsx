import { useEffect, useState } from "react";

interface Subscription {
  id: number;
  user_id: number;
  subscription_type: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo, using user id = 2.
    fetch("http://localhost:3000/subscriptions/user/2")
      .then((res) => res.json())
      .then((data) => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching subscriptions:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Subscriptions</h1>
      </header>
      {loading ? (
        <p>Loading subscriptions...</p>
      ) : subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">
                {sub.subscription_type} Plan
              </h2>
              <p className="text-gray-700">Status: {sub.status}</p>
              <p className="text-gray-700">
                Start Date: {new Date(sub.start_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                End Date: {new Date(sub.end_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
