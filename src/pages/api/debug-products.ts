import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await dbConnect;
  const db = client.db();
  const product = await db.collection("products").findOne();
  res.json({ _id: product?._id, type: typeof product?._id });
}
