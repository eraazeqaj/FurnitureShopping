import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("DreamLiving");
  const { id } = req.query;

  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const objectId = new ObjectId(id);

  switch (req.method) {
    case "GET":
      try {
        const product = await db.collection("products").findOne({ _id: objectId });
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
      } catch (error) {
        console.error("GET /api/admin/products/[id] error:", error);
        return res.status(500).json({ message: "Failed to fetch product" });
      }

    case "PUT":
      try {
        const { name, description, price, pictureUrl, categoryId } = req.body;

        if (!name || !description || typeof price !== "number") {
          return res.status(400).json({ message: "Missing or invalid fields" });
        }

        const updateResult = await db.collection("products").updateOne(
          { _id: objectId },
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

        return res.status(200).json({ message: "Updated successfully", result: updateResult });
      } catch (error) {
        console.error("PUT /api/admin/products/[id] error:", error);
        return res.status(500).json({ message: "Failed to update product" });
      }

    case "DELETE":
      try {
        const deleteResult = await db.collection("products").deleteOne({ _id: objectId });
        return res.status(200).json({ message: "Deleted successfully", result: deleteResult });
      } catch (error) {
        console.error("DELETE /api/admin/products/[id] error:", error);
        return res.status(500).json({ message: "Failed to delete product" });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
