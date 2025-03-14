import { pgSchema, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
  email: varchar('email', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 255 }),
  username: varchar('username', { length: 255 }).unique(),
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});
