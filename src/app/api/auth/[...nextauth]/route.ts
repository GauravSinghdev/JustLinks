import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) {
        console.error("No email found in the user object");
        return false;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          console.log(`Creating new user with email: ${user.email}`);
          await prisma.user.create({
            data: {
              email: user.email,
              provider: "Google",
            },
          });
        } else {
          console.log(`User with email ${user.email} already exists.`);
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }

      // Returning a true value indicates a successful sign-in
      return true;
    },
    async redirect({ baseUrl }) {
      // On successful login, redirect to the dashboard with success=true
      return `${baseUrl}/dashboard?success=true`; // Adjust the URL if your dashboard route is different
    },
  },
  pages: {
    signOut: '/', // Redirect to the home page ("/") after sign out
  },
});

export { handler as GET, handler as POST };
