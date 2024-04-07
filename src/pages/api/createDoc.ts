// pages/api/createDoc.ts

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function createDoc(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("your_db_name"); // Replace with your DB name

      // The document to insert
      const doc = req.body;

      // Insert the document into the collection
      const result = await db.collection("your_collection_name").insertOne(doc);

      res.status(201).json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
