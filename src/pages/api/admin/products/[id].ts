import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (req.method === "DELETE") {
    try {
      await db.collection("products").deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Failed to delete" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { name, description, price, pictureUrl, categoryId } = req.body;

      const updatedProduct = {
        name,
        description,
        price,
        pictureUrl,
        categoryId,
      };

      await db
        .collection("products")
        .updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });

      return res.status(200).json({ message: "Updated successfully" });
    } catch (err) {
      console.error("Update error:", err);
      return res.status(500).json({ message: "Failed to update" });
    }
  }

  res.setHeader("Allow", ["DELETE", "PUT"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

