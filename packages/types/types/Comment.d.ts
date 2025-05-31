/**
 * Comment interface representing a user comment with nested replies.
 * Used for comment trees and threaded discussions.
 */
export interface Comment {
  id: string
  email?: string
  name: string
  image?: string
  content: string
  createdAt: string
  updatedAt: string
  parent_id?: string | null
  path?: string
  user_id?: string
  depth?: number
  replies: Comment[]
}
