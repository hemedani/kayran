import { MongoClient } from "https://deno.land/x/mongo@v0.20.0/mod.ts";

const client = new MongoClient();
// await client.connect("mongodb://localhost:27017");
await client.connect({ servers: [] });

const db = client.database("kayran");

export default db;
