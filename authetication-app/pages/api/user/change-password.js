import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    return res.status(401).json({ message: "Not authorized!" });
  }
  console.log(session);
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = await client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    client.close();
    return res.status(401).json({ message: "User not found" });
  }

  const currentPassword = user.password;
  const checkValidPassword = await verifyPassword(oldPassword, currentPassword);
  if (!checkValidPassword) {
    client.close();
    return res.status(403).json({ message: "Old Password is not correct" });
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  return res.status(200).json({ message: "Password Updated!", result });
}

export default handler;
