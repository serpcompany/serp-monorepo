import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';
import { users } from '@serp/auth/server/api/dbAuth/schema';
import { authDb } from '@serp/auth/server/api/dbAuth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // Fetch user by username
        const results = await authDb
          .select()
          .from(users)
          .where(eq(users.username, credentials.username))
          .limit(1)
          .execute();

        if (results.length) {
          const user = results[0];

          // Compare provided password with stored hash
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isValid) {
            return user;
          }
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ]
});
