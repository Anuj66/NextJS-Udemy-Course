import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import {connectToDatabase} from "../../../lib/db";
import {verifyPassword} from "../../../lib/auth";

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProviders({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const usersCollection = await client.db().collection("users");

                const user = await usersCollection.findOne({
                    email: credentials.email,
                });

                if (!user) {
                    await client.close();
                    throw new Error(" User not found! ");
                }

                const matchPassword = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!matchPassword) {
                    await client.close();
                    throw new Error(" Password do not match! ");
                }

                await client.close();
                return {email: user.email};
            },
        }),
    ],
});