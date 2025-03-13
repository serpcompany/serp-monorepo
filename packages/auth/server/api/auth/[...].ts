import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';
import { users } from '@serp/auth/server/api/dbAuth/schema';
import { authDb } from '@serp/auth/server/api/dbAuth';
import { eq } from 'drizzle-orm';
import GithubProvider from 'next-auth/providers/github';
// import RedditProvider from 'next-auth/providers/reddit';
import GoogleProvider from 'next-auth/providers/google';

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,

  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    // RedditProvider.default({
    //   clientId: process.env.AUTH_REDDIT_CLIENT_ID,
    //   clientSecret: process.env.AUTH_REDDIT_CLIENT_SECRET
    // }), // doesn't provide email
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const email_ = email || user?.email;
      if (!email_ || !user) {
        return false;
      }

      const results = await authDb
        .select()
        .from(users)
        .where(eq(users.email, email_))
        .limit(1)
        .execute();

      if (!results.length) {
        await authDb
          .insert(users)
          .values({
            email: email_
          })
          .execute();
      }

      return true;
    }
  }
});
