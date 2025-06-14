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
  const db = client.db("dreamlv");

  const user = await db.collection("users").findOne({ email: session.user.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const { items, totalAmount } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid order items" });
  }

  const result = await db.collection("orders").insertOne({
    userId: user._id.toString(),
    items,
    totalAmount,
    status: "pending",
    createdAt: new Date(),
  });

  
  await db.collection("cartitems").deleteMany({ userId: user._id.toString() });

  res.status(201).json({ message: "Order placed", orderId: result.insertedId });
}
