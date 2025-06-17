import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const client = await clientPromise;
  const db = client.db("DreamLiving");
  const userEmail = session.user.email;

  const user = await db.collection("users").findOne({ email: userEmail });
  if (!user) return res.status(404).json({ message: "User not found" });

  // Convert to ObjectId for queries
  const userId = new ObjectId(user._id);

  switch (req.method) {
    case "GET": {
      // Aggregate cart items with product details
      const cartItems = await db
        .collection("cartitems")
        .aggregate([
          { $match: { userId } },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $project: {
              _id: 1,
              quantity: 1,
              addedAt: 1,
              product: {
                _id: 1,
                name: 1,
                price: 1,
                pictureUrl: 1,
              },
            },
          },
        ])
        .toArray();

      return res.status(200).json(cartItems);
    }

    case "POST": {
      const { productId, quantity } = req.body;
      if (!productId || !quantity) {
        return res.status(400).json({ message: "Missing productId or quantity" });
      }

      // Convert productId to ObjectId
      const productObjectId = new ObjectId(productId);

      // Check if item already exists in cart
      const existing = await db.collection("cartitems").findOne({
        userId,
        productId: productObjectId,
      });

      if (existing) {
        // If exists, update quantity
        await db.collection("cartitems").updateOne(
          { _id: existing._id },
          { $inc: { quantity } }
        );
        return res.status(200).json({ message: "Updated quantity in cart" });
      } else {
        // Insert new item
        const result = await db.collection("cartitems").insertOne({
          userId,
          productId: productObjectId,
          quantity,
          addedAt: new Date(),
        });
        return res.status(201).json({ message: "Added to cart", id: result.insertedId });
      }
    }

    case "DELETE": {
      const { itemId } = req.body;
      if (!itemId) return res.status(400).json({ message: "Missing itemId" });

      await db.collection("cartitems").deleteOne({
        _id: new ObjectId(itemId),
        userId,
      });

      return res.status(200).json({ message: "Item removed" });
    }

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
