/**
 * User interface matching the database schema from packages/db/server/database/schema.ts
 * Represents authenticated users with all their properties and permissions.
 */
export interface User {
  id: number
  createdAt: Date
  updatedAt: Date
  email: string
  name: string | null
  avatarUrl: string | null
  hashedPassword: string | null
  superAdmin: boolean | null
  banned: boolean | null
  bannedReason: string | null
  bannedUntil: Date | null
  emailVerified: boolean
  phoneNumber: string | null
  onboarded: boolean | null
  proAccount: boolean | null
  lastActive: Date
}
