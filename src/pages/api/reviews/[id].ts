import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;
  if (!productId || typeof productId !== "string") {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("dreamlv");

    // Fetch reviews for the product, sorting by newest first
    const reviews = await db.collection("reviews")
      .find({ productId })
      .sort({ createdAt: -1 })
      .toArray();

    // Optionally, you can join user info if you want (like username)
    // For now, just return review data
    const reviewsClean = reviews.map(r => ({
      id: r._id.toString(),
      userId: r.userId,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
    }));

    res.status(200).json(reviewsClean);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
