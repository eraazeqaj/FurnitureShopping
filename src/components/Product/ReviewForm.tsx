import { useState } from "react";
import { useSession } from "next-auth/react";

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted?: () => void; // optional callback to refresh reviews or UI
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!session) {
    return <p>You must be logged in to leave a review.</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!comment.trim()) {
      setError("Please enter a comment.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit review");
      }

      setSuccess(true);
      setRating(5);
      setComment("");
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold">Leave a Review</h3>

      <label>
        Rating: 
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={loading}
          className="ml-2 border rounded p-1"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
          ))}
        </select>
      </label>

      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
          rows={4}
          className="w-full border rounded p-2"
          required
        />
      </label>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Review submitted!</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-amber-900 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
