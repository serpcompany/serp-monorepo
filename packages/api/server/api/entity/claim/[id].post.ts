import { getDb } from '@serp/db/server/database'
import {
  entity,
  team,
  teamMember,
  verification,
} from '@serp/db/server/database/schema'
import { eq } from 'drizzle-orm'

/**
 * Claims ownership of an entity by verifying user's email domain matches entity domain.
 * Creates team structures and verification records for entity ownership.
 *
 * @param {H3Event} event - The event object containing entity ID in route params
 * @returns {Promise<{status: number, message: string, id?: string, teamId?: string}>}
 * @throws {Error} If entity verification or team creation fails
 * @example
 * // POST /api/entity/claim/123
 * // Claims entity 123 for authenticated user with matching email domain
 */
export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)
    const user = session?.user as { id: string, email: string } | undefined
    const userId = user?.id
    const email = user?.email
    if (!userId)
      return { status: 401, message: 'Unauthorized' }
    if (!email)
      return { status: 401, message: 'Email is required' }

    const { id } = getRouterParams(event)
    if (!id)
      return { status: 400, message: 'ID is required' }

    // Verify entity exists and grab slug/domain
    const entityResult = await getDb()
      .select({
        name: entity.name,
        slug: entity.slug,
      })
      .from(entity)
      .where(eq(entity.id, id))
      .limit(1)
      .execute()
    if (!entityResult || entityResult.length === 0) {
      return { status: 404, message: 'Entity not found' }
    }

    // Check if already verified
    const verificationResult = await getDb()
      .select({
        id: verification.id,
        user: verification.user,
      })
      .from(verification)
      .where(eq(verification.entity, id))
      .limit(1)
      .execute()
    if (verificationResult && verificationResult.length > 0) {
      // Check if verified with the same user
      if (verificationResult[0].user === userId) {
        return { status: 400, message: 'Entity already verified by you' }
      }
      return {
        status: 400,
        message: 'Entity already verified by another user',
      }
    }

    // Finally assert that the domain is in the user's email
    const emailSplit = email.split('@')
    const emailDomain = emailSplit[emailSplit.length - 1]
    const domain
      = process.env.NODE_ENV === 'production'
        ? entityResult[0].slug
        : emailDomain
    if (emailDomain !== domain) {
      return {
        status: 400,
        message:
          'Domain does not match user email, please create an account using an email with your entity\'s domain',
      }
    }

    // Insert verification request
    const newVerification = {
      entity: id,
      user: userId,
    }

    const inserted = await getDb()
      .insert(verification)
      .values(newVerification)
      .returning()
    if (!inserted || inserted.length === 0) {
      return { status: 500, message: 'Failed to insert verification request' }
    }

    // If team exists, add user to team as owner, else add to team as member
    const teamResult = await getDb()
      .select({
        id: team.id,
        ownerId: team.ownerId,
      })
      .from(team)
      .where(eq(team.entityId, id))
      .limit(1)
      .execute()

    let teamId = null

    if (
      teamResult
      && teamResult.length > 0
      && teamResult[0].ownerId !== userId
    ) {
      // Add user as team member
      await getDb()
        .insert(teamMember)
        .values({
          teamId: teamResult[0].id,
          userId,
          role: 'member',
        })
        .execute()

      teamId = teamResult[0].id
    }
    else if (teamResult && teamResult.length > 0 && !teamResult[0].ownerId) {
      // Placeholder team to preserve slug, add user as owner
      await getDb()
        .insert(teamMember)
        .values({
          teamId: teamResult[0].id,
          userId,
          role: 'owner',
        })
        .execute()
      await getDb()
        .update(team)
        .set({ ownerId: userId })
        .where(eq(team.id, teamResult[0].id))
        .execute()

      teamId = teamResult[0].id
    }
    else if (!teamResult || teamResult.length === 0) {
      // Create a new team and add user as owner
      const newTeam = {
        entityId: id,
        ownerId: userId,
        name: entityResult[0].name,
        slug: entityResult[0].slug,
      }
      const [newTeamRecord] = await getDb()
        .insert(team)
        .values(newTeam)
        .returning()
        .execute()
      if (!newTeamRecord) {
        return { status: 500, message: 'Failed to create team' }
      }
      await getDb()
        .insert(teamMember)
        .values({
          teamId: newTeamRecord.id,
          userId,
          role: 'owner',
        })
        .execute()

      teamId = newTeamRecord.id
    }

    return {
      status: 200,
      message: 'success',
      id: inserted[0].id,
      teamId,
    }
  }
  catch (error) {
    return { status: 500, message: error.message }
  }
})
