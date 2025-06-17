import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Only PATCH allowed" });
  }

  // Check if user is admin
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  const { status } = req.body;
  const validStatuses = ["pending", "completed", "cancelled"];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("DreamLiving");

    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
