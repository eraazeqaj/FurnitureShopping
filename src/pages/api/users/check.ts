// pages/api/users/check.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail } from "@/api/services/products";
import { compare } from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      id: (user._id as any).toString(),
      email: user.email,
      isAdmin: user.isAdmin || false,
    });
  } catch (error) {
    console.error("Error in /api/users/check:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
