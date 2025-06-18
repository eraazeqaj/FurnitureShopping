import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options: MongoClientOptions = {};

// Extend NodeJS.Global interface to add _mongoClientPromise property
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;

const clientPromise: Promise<MongoClient> = (async () => {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
})();

export default clientPromise;
