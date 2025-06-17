import NextAuth, { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

interface User {
  _id: ObjectId;
  email: string;
  name?: string;
  password: string;
  isAdmin?: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  console.log("Trying login for email:", credentials?.email);
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Email and password required");
  }

  const client = await clientPromise;
  const db = client.db("DreamLiving");

  const user = await db.collection("users").findOne({ email: credentials.email });
  console.log("User found:", user);

  if (!user) {
    throw new Error("No user found with this email");
  }

  const isValid = await compare(credentials.password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name || null,
    isAdmin: user.isAdmin || false,
  };
}
,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // correct typing: "jwt" | "database"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.isAdmin = (user as any).isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        (session.user as any).id = token.id;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
