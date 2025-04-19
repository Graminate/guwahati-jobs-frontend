import { useEffect, useState } from "react";
import Link from "next/link";

interface Review {
  id: number;
  user_id: number;
  rating: number;
  review_text?: string;
  created_at: string;
}

export default function EmployerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded company id = 1 for demonstration
    fetch("http://localhost:3000/reviews/company/1")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Company Reviews</h1>
      </header>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow">
              <p className="text-lg font-semibold">Rating: {review.rating}/5</p>
              {review.review_text && (
                <p className="text-gray-700">{review.review_text}</p>
              )}
              <p className="text-gray-500 text-sm">
                Posted on: {new Date(review.created_at).toLocaleDateString()}
              </p>
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
