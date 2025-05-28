import clientPromise from "../../lib/mongodb";
import {
  Product,
  User,
  Category,
  Order,
  Review,
  AdminLog,
} from "../../api/models/products";
import { ObjectId } from "mongodb";



export async function createProduct(data: Product) {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("products").insertOne({ ...data});
}

export async function getProducts(): Promise<Product[]> {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("products").find().sort({ _id: -1 }).toArray();
}

// 👤 USERS
export async function createUser(data: User) {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("users").insertOne({ ...data });
}

export async function getUsers(): Promise<User[]> {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("users").find().toArray();
}

// 📦 CATEGORIES
export async function createCategory(data: Category) {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("categories").insertOne({ ...data });
}

export async function getCategories(): Promise<Category[]> {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("categories").find().toArray();
}

// 🧾 ORDERS
export async function createOrder(data: Order) {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("orders").insertOne({ ...data });
}

export async function getOrders(): Promise<Order[]> {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("orders").find().sort({ createdAt: -1 }).toArray();
}

// 🌟 REVIEWS
export async function createReview(data: Review) {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("reviews").insertOne({ ...data });
}

export async function getReviews(): Promise<Review[]> {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("reviews").find().sort({ createdAt: -1 }).toArray();
}

// 🧑‍💼 ADMIN LOGS
export async function createAdminLog(data: AdminLog) {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("admin_logs").insertOne({ ...data });
}

export async function getAdminLogs(): Promise<AdminLog[]> {
  const client = await clientPromise;
  const db = client.db("dreamlv");
  return db.collection("admin_logs").find().sort({ timestamp: -1 }).toArray();
}