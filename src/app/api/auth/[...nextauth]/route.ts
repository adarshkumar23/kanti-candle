import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Logic",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@kanti.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@kanti.com" && credentials?.password === "password") {
          return { id: "1", name: "Admin", email: "admin@kanti.com", role: "ADMIN" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "kanti-super-secret-key-for-dev-only"
});

export { handler as GET, handler as POST };
