import { useEffect, useState } from "react";

interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsListProps {
  productId: string;
}

export default function ReviewsList({ productId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await fetch(`/api/reviews/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (reviews.length === 0) return <p className="text-amber-900">No reviews yet. Be the first to review!</p>;

  return (
    <div>
      <h3 className="text-xl text-amber-900 font-semibold mb-4">Reviews</h3>
      {reviews.map((r) => (
        <div key={r.id} className="border p-4 mb-4 rounded">
          <p className="text-amber-900"><strong>Rating:</strong> {r.rating} / 5</p>
          <p className="text-amber-900">{r.comment}</p>
          <p className="text-sm text-amber-900">
            {new Date(r.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
