import { NextApiRequest, NextApiResponse } from "next";
import { getProducts, createProducts } from "@/api/services/products";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const product = await createProducts(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
