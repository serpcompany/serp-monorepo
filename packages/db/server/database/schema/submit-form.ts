import {
  boolean,
  integer,
  jsonb,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { userSchema } from './schema'

export const submitForm = userSchema.table('submit_form', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity'),
  user: integer('user').notNull(),
  formData: jsonb('form_data').notNull(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  module: varchar('module', { length: 255 }).notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: integer('reviewed_by'),
  reviewNotes: text('review_notes'),
  isPriority: boolean('is_priority').notNull().default(false),
  priorityPayment: integer('priority_payment'),
  backlinkVerified: boolean('backlink_verified').notNull().default(false),
  backlinkVerifiedAt: timestamp('backlink_verified_at', { withTimezone: true }),
  uuid: uuid('uuid').notNull(),
})
