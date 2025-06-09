import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  const { id } = req.query;

  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  switch (req.method) {
    case "GET":
      try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
      } catch (err) {
        return res.status(500).json({ message: "Failed to fetch product" });
      }

    case "PUT":
      try {
        const { name, description, price, pictureUrl, categoryId } = req.body;

        if (!name || !description || !price) {
          return res.status(400).json({ message: "Missing fields" });
        }

        const result = await db.collection("products").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              name,
              description,
              price,
              pictureUrl,
              categoryId,
            },
          }
        );

        return res.status(200).json({ message: "Updated successfully", result });
      } catch (err) {
        return res.status(500).json({ message: "Failed to update" });
      }

    case "DELETE":
      try {
        await db.collection("products").deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ message: "Deleted successfully" });
      } catch (err) {
        return res.status(500).json({ message: "Failed to delete" });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

