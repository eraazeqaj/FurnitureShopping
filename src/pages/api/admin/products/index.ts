import type { NextApiRequest, NextApiResponse } from "next";
import { getProducts, createProducts } from "@/api/services/products";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const products = await getProducts();
        return res.status(200).json(products);
      } catch (error) {
        console.error("GET /api/products error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

    case "POST":
      try {
        if (typeof req.body !== "object" || req.body === null) {
          return res.status(400).json({ message: "Invalid product data" });
        }
        const product = await createProducts(req.body);
        return res.status(201).json(product);
      } catch (error) {
        console.error("POST /api/products error:", error);
        return res.status(500).json({ message: "Failed to create product" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
