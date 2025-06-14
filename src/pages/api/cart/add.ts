import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { productId, quantity } = req.body;

  if (!productId || typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({ message: "Missing or invalid productId or quantity" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("dreamlv");

    // Convert productId and userId to ObjectId
    const productObjectId = new ObjectId(productId);
    const userObjectId = new ObjectId(session.user.id);

    const existing = await db.collection("cartitems").findOne({
      userId: userObjectId,
      productId: productObjectId,
    });

    if (existing) {
      await db.collection("cartitems").updateOne(
        { _id: existing._id },
        { $inc: { quantity } }
      );
    } else {
      await db.collection("cartitems").insertOne({
        userId: userObjectId,
        productId: productObjectId,
        quantity,
        createdAt: new Date(),
      });
    }

    res.status(200).json({ message: "Added to cart" });
  } catch (error) {
    console.error("Error adding to cart", error);
    res.status(500).json({ message: "Internal server error" });
  }
}