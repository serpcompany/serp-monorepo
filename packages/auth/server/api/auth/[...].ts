import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';
import { users } from '@serp/auth/server/api/dbAuth/schema';
import { authDb } from '@serp/auth/server/api/dbAuth';
import { eq } from 'drizzle-orm';
import GithubProvider from 'next-auth/providers/github';

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,

  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET
    })
    // @ts-expect-error Use .default here for it to work during SSR.
    // RedditProvider.default({
    //   clientId: process.env.REDDIT_CLIENT_ID,
    //   clientSecret: process.env.REDDIT_CLIENT_SECRET
    // }),
    // @ts-expect-error Use .default here for it to work during SSR.
    // GoogleProvider.default({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // });
  ]

  // providers: [
  // @ts-expect-error Use .default here for it to work during SSR.
  // CredentialsProvider.default({
  //   name: 'Credentials',
  //   credentials: {
  //     username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
  //     password: { label: 'Password', type: 'password' }
  //   },
  //   async authorize(credentials, req) {
  //     // Fetch user by username
  //     const results = await authDb
  //       .select()
  //       .from(users)
  //       .where(eq(users.username, credentials.username))
  //       .limit(1)
  //       .execute();

  //     if (results.length) {
  //       const user = results[0];

  //       // Compare provided password with stored hash
  //       const isValid = await bcrypt.compare(
  //         credentials.password,
  //         user.password
  //       );
  //       if (isValid) {
  //         return user;
  //       }
  //     }
  //     // Return null if user data could not be retrieved
  //     return null;
  //   }
  // })
  // ]
});
