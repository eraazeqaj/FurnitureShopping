import { User } from "@/api/models/products";
import { createUser, getUserByEmail } from "@/api/services/products";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

interface RegisterUserInput extends Partial<User> {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Metoda e kërkesës nuk është e mbështetur" });
  }

  const { name, email, password, isAdmin = false } = req.body as RegisterUserInput;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Ju lutem plotësoni të gjitha fushat" });
  }

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ error: "Email-i është i regjistruar tashmë" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      isAdmin,
    };

    const result = await createUser(newUser);

    return res.status(201).json({
      message: "Përdoruesi u regjistrua me sukses",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Gabim gjatë regjistrimit" });
  }
}
