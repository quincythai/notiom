import { MongoClient } from 'mongodb';
// Interface: can be extended upon by classes
// Type: cannot be extended by classes; preferred when need to use unions or tuples or define type in a way that does not fit the structure of an object
import type { NextApiRequest, NextApiResponse } from 'next';

// Connect to the database
// Only runs when we call it in handler
async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  return client;
}

// runs whenever localhost:3000/api/createDoc is called
// capture request in req, result in res
// default: allows next.js to find it
// async: allows await to wait for promises and not block thread
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const client = await connectToDatabase();
      // client.db('database_name_here')
      const db = client.db('notiom');
      
      // db.collection('collection_name_here')
      const result = await db.collection('documents').insertOne(req.body);

      // 201: Success: Created
      res.status(201).json(result);
    } catch (error) {
      // 500: Server error - internal server error
      res.status(500).json({ error: 'Unable to create document' });
    }
  } else {
    // 405: Client error - Method not allowed (i.e. not supposed to be here)
    res.status(405).json({ error: 'Method not allowed' });
  }
}
