import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.isAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const messages = await db
      .collection("contactMessages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const cleanMessages = messages.map((msg) => ({
      id: msg._id.toString(),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      createdAt: msg.createdAt,
    }));

    res.status(200).json(cleanMessages);
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
