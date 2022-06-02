import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return res.status(422).json({ error: "Invalid credentials provided" });
    }
    const hashedPassword = await hashPassword(password);

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      await client.close()
      return res
        .status(401)
        .json({ message: "User with this email already exists!" });
    }

    const response = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });
    await client.close();
    return res
      .status(201)
      .json({ message: "User Created Successfully!", response });
  }
}

export default handler;
