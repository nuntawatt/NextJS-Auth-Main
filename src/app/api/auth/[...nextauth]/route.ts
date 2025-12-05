import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { initDataSource } from "@/lib/typeorm/data-source";
import { User } from "@/entities/User";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.NEXTAUTH_SECRET) {
  console.warn("NextAuth: missing GOOGLE_CLIENT_ID/SECRET or NEXTAUTH_SECRET");
}

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }: any) {
      try {
        console.log('[nextauth] signIn callback - email:', user?.email);
        if (!user?.email) return true;
        const ds = await initDataSource();
        const repo = ds.getRepository(User);
        let dbUser = await repo.findOne({ where: { email: user.email } });
        if (dbUser) {
          console.log('[nextauth] signIn - found existing user id=', (dbUser as any).id);
        } else {
          dbUser = repo.create({
            name: user.name ?? profile?.name ?? null,
            email: user.email,
            password: null,
            provider: account?.provider ?? 'google',
            providerId: account?.providerAccountId ?? profile?.sub ?? null,
          });
          const saved = await repo.save(dbUser);
          console.log('[nextauth] signIn - created user id=', (saved as any).id);
        }
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('[nextauth] signIn upsert error', msg);
        return true;
      }
    },

    async jwt({ token, user }: any) {
      try {
        if (user?.email) {
          const ds = await initDataSource();
          const repo = ds.getRepository(User);
          const dbUser = await repo.findOne({ where: { email: user.email } });
          if (dbUser) token.uid = dbUser.id;
        }
      } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error('[nextauth] jwt error', msg);
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token?.uid) (session as any).user = { ...(session.user || {}), id: token.uid };
      else if (token?.sub) (session as any).user = { ...(session.user || {}), id: token.sub };
      return session;
    },
  },
  logger: {
    error(code: any, metadata?: any) {
      console.error("[next-auth][error]", code, metadata);
    },
    warn(code: any) {
      console.warn("[next-auth][warn]", code);
    },
    debug() {
    },
  },
};

const handler = NextAuth(options as any);

export { handler as GET, handler as POST };
