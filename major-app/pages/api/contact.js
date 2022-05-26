import {MongoClient} from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res
        .status(400)
        .json({ Success: false, message: "Data not provided properly" });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    const mongoUrl = `mongodb://localhost:27017/${process.env.mongodb_database}`
    let client;
    try {
      client = await MongoClient.connect(mongoUrl)
    } catch (error) {
      return res.status(500).json({message: error.message})
    }

    let result;
    try {
      const db = await client.db()
      result = await db.collection('contacts').insertOne(newMessage)
    }catch (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(201).json({ success: true, message: newMessage, result: result });
  }
}

export default handler;
