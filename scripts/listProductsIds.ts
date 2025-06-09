import dbConnect from "../src/lib/mongodb";
import { ObjectId } from "mongodb";


async function listProductIds() {
  const client = await dbConnect;
  const db = client.db();

  const products = await db.collection("products").find({}).toArray();

  products.forEach((p) => {
    console.log("Product ID:", p._id, "Type:", typeof p._id);
  });

  process.exit();
}

listProductIds();
