import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { email } from "zod";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("====================================");
        console.log("credentials", credentials);
        console.log("req", req);
        console.log("====================================");
        // Add logic here to look up the user from the credentials supplied
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message);
          }

          console.log("res:", res);
          console.log("====================================");
          console.log("data:", data);
          console.log("====================================");

          const decodec = JSON.parse(JSON.stringify(data));

          return {
            id: data.id,
            user: data.user,
            token: data.token,
          };
        } catch (error) {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
  pages: { signIn: "/signin" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user =  user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.token = token.token;
      }

      return session;
    },
  },
};
