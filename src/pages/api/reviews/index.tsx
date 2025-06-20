import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed");
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const client = await clientPromise;
  const db = client.db("DreamLiving");

  const user = await db.collection("users").findOne({ email: session.user.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const { productId, rating, comment } = req.body;

  if (!productId || !rating || !comment) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const result = await db.collection("reviews").insertOne({
    userId: user._id.toString(),
    productId,
    rating,
    comment,
    createdAt: new Date(),
  });

  res.status(201).json({ message: "Review submitted", id: result.insertedId });
}
