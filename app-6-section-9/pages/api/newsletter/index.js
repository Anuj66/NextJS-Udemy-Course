import { getMongoClient } from "../../../helpers/api-util";

async function handler(req, res) {
  let success = false;

  try {
    const client = await getMongoClient();
    const db = await client.db();

    if (req.method === "POST") {
      const userEmail = req.body.email;
      await db.collection("Newsletter").insertOne({ email: userEmail });
      await client.close();
      success = true;
      return res.status(201).json({ success, newEmail: userEmail });
    }

    const data = await db.collection("Newsletter").find();
    await client.close();
    success = true;
    return res.status(200).json({ success, users: data });
  } catch (error) {
    return res.status(402).json({ success, error: "Internal Server Error" });
  }
}

export default handler