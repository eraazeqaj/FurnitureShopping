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



const getDb = async () => {
  const client = await clientPromise;
  return client.db("dreamlv");
}

export async function createProducts(data: Product) {
  const db = await getDb();
  return db.collection<Product>("products").insertOne({...data});
}

export async function getProducts(): Promise<Product[]>{
  const db = await getDb();
  return db.collection<Product>("products").find().sort({_id: -1}).toArray();
}

export async function getProductById(id: string): Promise<Product | null>{
  const db = await getDb();
  return db.collection<Product>("products").findOne({_id: new ObjectId(id)});
}

export async function createUser(data: User){
  const db = await getDb();
  return db.collection<User>("users").insertOne({...data});
}

export async function getUserByEmail(email: string): Promise<User | null> {
  console.log("getUserByEmail called with:", email);
  const db = await getDb();
  const user = await db.collection<User>("users").findOne({ email: { $regex: `^${email}$`, $options: "i" } });
  console.log("Found user:", user ? user.email : null);
  return user;
}





export async function createCategory(data: Category) {
  const db = await getDb();
  return db.collection<Category>("categories").insertOne({ ...data });
}

export async function createOrder(data: Order) {
  const db = await getDb();
  return db.collection<Order>("orders").insertOne({ ...data });
}

export async function createReview(data: Review) {
  const db = await getDb();
  return db.collection<Review>("reviews").insertOne({ ...data });
}

export async function createAdminLog(data: AdminLog) {
  const db = await getDb();
  return db.collection<AdminLog>("admin_logs").insertOne({ ...data });
}