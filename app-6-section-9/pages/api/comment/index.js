import { getMongoClient } from "../../../helpers/api-util";

async function handler(req, res) {
  let success = false;
  try {
    const client = await getMongoClient();
    const db = await client.db();

    if (req.method === "POST") {
      const { name, email, comment, eventId } = req.body;

      if (
        !email ||
        email.trim() === "" ||
        !name ||
        name.trim() === "" ||
        !comment ||
        comment.trim() === ""
      ) {
        await client.close();
        return res
          .status(322)
          .json({ success, message: "Error parsing data!" });
      }

      const newComment = {
        name,
        email,
        comment,
        eventId,
      };

      await db.collection("Comments").insertOne(newComment);
      await client.close();
      success = true;
      return res.status(201).json({ success, message: "Comment added!" });
    }

    const data = db.collection("Comments").find().sort({ _id: -1 }).toArray();
    await client.close();
    success = true;
    return res.status(200).json({ success, comments: data });
  } catch (error) {
    return res.status(402).json({ success, error: "Internal Server Error" });
  }
}

export default handler;
