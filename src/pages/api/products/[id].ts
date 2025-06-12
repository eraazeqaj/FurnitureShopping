import clientPromise from "@/lib/mongodb";
import {ObjectId} from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse){
    const { id } = req.query;

    if(!id || typeof id !== "string" || !ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid product ID"});
    }

    try{
        const client = await clientPromise;
        const db = client.db("dreamlv");

        const product = await db.collection("products").findOne({_id: new ObjectId(id)});

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json(product);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Something went wrong"});
    }
    
}