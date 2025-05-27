import clientPromise from "../../lib/mongodb"; 
import { Product } from "../../api/models/products";



export async function createProduct(data: Product){
const client = await clientPromise;
const db= client.db("dreamlv");
const result = await db.collection("products").insertOne({
        ...data,
        createdAt: new Date()
});
return result;
}


export async function getProducts(){
    const client = await clientPromise;
    const db = client.db("dreamlv");
    const products=await db
        .collection("products") 
        .find().sort({ createdAt: -1})
        .toArray();

        return products;
}

