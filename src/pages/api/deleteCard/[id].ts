import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const client = await clientPromise;
      const db = client.db("notiom");
      const id = req.query; // gets the id string from the /api/deleteCard/${id}'

      // console.log(id);

      // specify _id of the ObjectId as a string
      const result = await db
        .collection("cards")
        .deleteOne({ _id: new ObjectId(id as string) });

      // console.log("Delete operation result:", result);

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Card deleted successfully" });
      } else {
        res.status(404).json({ message: "Card not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete card" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
