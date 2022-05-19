import { getMongoClient } from "../../../helpers/api-util";

async function handler(req, res) {
  let success = false;
  try {
    const eventId = req.query.eventId;

    const client = await getMongoClient();
    const db = await client.db();

    const commentByEventId = await db
      .collection("Comments")
      .find({ eventId: eventId })
      .sort({ _id: -1 })
      .toArray();
    // console.log(commentByEventId);
    success = true;
    await client.close();
    return res.status(200).json({ success, comments: commentByEventId });
  } catch (e) {
    return res.status(402).json({ success, error: "Internal Server Error" });
  }
}

export default handler;
