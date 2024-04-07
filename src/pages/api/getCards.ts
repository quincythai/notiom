import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('notiom');
      
      const result = await db.collection('cards').find().toArray()

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch cards' });
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
