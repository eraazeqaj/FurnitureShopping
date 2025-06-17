import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const client = await clientPromise;
    const db = client.db("DreamLiving");

    const {q} = req.query;
    if(!q || typeof q !== "string"){
        return res.status(400).json({message: "Missing search query"});

    }

    const products = await db.collection("products")
        .find({
            $or: [
                {name: {$regex: q, $options: "i"}},
                {description: {$regex: q, $options: "i"}}
            ]
        })
        .toArray();

        res.status(200).json(products);

}