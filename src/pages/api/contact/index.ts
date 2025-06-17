import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Të gjitha fushat janë të detyrueshme." });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const contactCollection = db.collection("contactMessages");

    const result = await contactCollection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Error inserting contact message:", error);
    return res.status(500).json({ error: "Mesazhi nuk u ruajt." });
  }
}
