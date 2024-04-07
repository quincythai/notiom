import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('notiom');
      
      const result = await db.collection('cards').insertOne(req.body);

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create document' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
