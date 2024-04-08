// pages/api/updateCard/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const client = await clientPromise;
      const db = client.db("notiom");
      const { id } = req.query;
      const { text } = req.body;

      const result = await db.collection("cards").updateOne(
        { _id: new ObjectId(id as string) },
        { $set: { text: text } }
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Card updated successfully" });
      } else {
        res.status(404).json({ message: "Card not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update card" });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
