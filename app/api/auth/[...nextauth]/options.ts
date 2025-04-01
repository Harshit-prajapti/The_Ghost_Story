import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHUbProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/models/user";
import dbConnect from "@/lib/db";
import bcrypt from "bcrypt"
export const options: NextAuthOptions = {
  providers: [
    GitHUbProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        await dbConnect();
        console.log("Creentiilas are : ",credentials);
        const user = await UserModel.findOne({
          username: credentials?.username,
        }).lean();
        console.log("This is the user", user);
        if (!user) {
          throw new Error("User not found");
        }
        console.log("Password matching...");
        const isMatch = await bcrypt.compare(credentials?.password as string,user.password as string)
        console.log(isMatch)
        if (!isMatch) {
          throw new Error("Incorrect password!");
        }
        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          image : user.avatar
        };
      },
    }),
  ],
  pages: {
    signIn: "/api/login",
    signOut: "/api/signOut",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();
      // console.log("🟢 User:", user);
      // console.log("🟡 Account:", account);
      // console.log("🔵 Profile:", profile);
      if (account?.provider === "google" || account?.provider === "github") {
        let existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          // Create a new user in the database
          try {
            const newUser = await UserModel.create({
              username: user.name?.split(" ").join("").toLowerCase(),
              email: user.email,
              avatar: user.image,
              provider: account.provider,
              password: null,
              fullname: user.name,
            });
            console.log("New User Created", newUser);
          } catch (error) {
            console.log("Error in creating new user", error);
            throw new Error("Failed to create a new user");
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.name;
        token.email = user.email;
      }
      // console.log("Token after update",token)
      return token;
    },
    async session({ session, token }) {
      // console.log("Session before update", session);
      const dbUser = await UserModel.findOne({ email: session?.user?.email });
      // console.log(dbUser)
      if (dbUser) {
        (session.user as any).id = dbUser._id?.toString();
      }
      console.log("Session after update",session)
      return session;
    },
  },
};
