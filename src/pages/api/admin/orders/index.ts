import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("DreamLiving");

    const orders = await db.collection("orders").find().toArray();

    // Convert _id and userId ObjectId to strings for frontend
    const ordersClean = orders.map((order) => ({
      _id: order._id.toString(),
      userId: order.userId.toString(),
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    }));

    return res.status(200).json(ordersClean);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
