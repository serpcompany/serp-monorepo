// server/api/auth/register.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import { users } from '@serp/auth/server/api/dbAuth/schema';
import { authDb } from '@serp/auth/server/api/dbAuth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const MIN_PASSWORD_LENGTH = 8;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default defineEventHandler(async (event) => {
  if (event.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
  }

  // Parse request body (assuming JSON payload)
  const data = await readBody(event);
  const { name, email, username, password } = data;

  // Validate required fields
  if (!name || !email || !username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    });
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid Email' });
  }

  // Validate password length
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Password too short, must be at least ${MIN_PASSWORD_LENGTH} characters`
    });
  }

  // Check if email already exists
  const emailExists = await authDb
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .execute();

  if (emailExists.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email already exists'
    });
  }

  // Check if username already exists
  const usernameExists = await authDb
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1)
    .execute();

  if (usernameExists.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username already exists'
    });
  }

  // Hash the password using bcrypt (never store plain text!)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into the database
  const result = await authDb
    .insert(users)
    .values({
      name,
      email,
      username,
      password: hashedPassword
    })
    .returning();

  if (!result || result.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user'
    });
  }

  return { message: 'User created successfully', user: result[0] };
});
