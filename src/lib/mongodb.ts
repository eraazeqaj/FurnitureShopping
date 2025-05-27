import {MongoClient} from "mongodb";
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const url = process.env.MONGODB_URL as string;
const client = new MongoClient(url);

let clientPromise: Promise<MongoClient> ;

if(!global._mongoClientPromise){
    global._mongoClientPromise = client.connect();
} 

clientPromise = global._mongoClientPromise;
export default clientPromise;

