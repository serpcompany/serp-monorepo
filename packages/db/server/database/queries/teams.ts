import { and, eq, max, or } from 'drizzle-orm'
import { getDb } from '../index'
import { entity, team, teamInvite, teamMember, user } from '../schema'

type Team = typeof team.$inferSelect
type InsertTeam = typeof team.$inferInsert
type TeamInvite = typeof teamInvite.$inferSelect
type InsertTeamInvite = typeof teamInvite.$inferInsert

// Define invite status types for better type safety
type InviteStatus = (typeof INVALID_STATUSES)[number]
const INVALID_STATUSES = ['accepted', 'rejected', 'cancelled'] as const

export async function findUserTeams(userId: string): Promise<Array<Team & { role: string | null, entity: { id: number, name: string, module: string, slug: string } | null }>> {
  try {
    const teams = await getDb()
      .select({
        id: team.id,
        name: team.name,
        ownerId: team.ownerId,
        logo: team.logo,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
        role: max(teamMember.role),
        slug: team.slug,
        entity: {
          id: entity.id,
          name: entity.name,
          module: entity.module,
          slug: entity.slug,
          data: entity.data,
          categories: entity.categories,
        },
      })
      .from(team)
      .leftJoin(
        teamMember,
        and(eq(team.id, teamMember.teamId), eq(teamMember.userId, userId)),
      )
      .leftJoin(entity, eq(team.entityId, entity.id))
      .where(or(eq(team.ownerId, userId), eq(teamMember.userId, userId)))
      .groupBy(team.id, entity.id)
      .execute()
    return teams
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find user teams',
    })
  }
}

export async function getTeam(teamId: string): Promise<Team | null> {
  const [team_] = await getDb()
    .select()
    .from(team)
    .where(eq(team.id, teamId))
    .execute()
  return team_
}

export async function getTeamById(teamId: string): Promise<Team | null> {
  const [team_] = await getDb()
    .select()
    .from(team)
    .where(eq(team.id, Number(teamId)))
    .execute()
  return team_
}

export async function getAllTeams(limit = 50, offset = 0): Promise<Team[]> {
  const teams = await getDb()
    .select()
    .from(team)
    .limit(limit)
    .offset(offset)
    .execute()
  return teams
}

export async function createTeam(payload: InsertTeam): Promise<Team> {
  try {
    const [team_] = await getDb()
      .insert(team)
      .values(payload)
      .returning()
      .execute()

    await getDb()
      .insert(teamMember)
      .values({
        teamId: team_.id,
        userId: payload.ownerId,
        role: 'owner',
      })
      .execute()

    return team_
  }
  catch (error) {
    if (error instanceof Error) {
      throw new TypeError(error.message)
    }
    throw new Error('Failed to create team')
  }
}

export async function updateTeam(teamId: string, payload: Partial<Team>): Promise<Team> {
  try {
    const [record] = await getDb()
      .update(team)
      .set(payload)
      .where(eq(team.id, teamId))
      .returning()
      .execute()
    return record
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update team',
    })
  }
}

export async function deleteTeam(teamId: string): Promise<void> {
  try {
    await getDb().delete(team).where(eq(team.id, teamId)).execute()
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete team',
    })
  }
}

export async function inviteTeamMember(payload: InsertTeamInvite): Promise<TeamInvite> {
  try {
    const [invite] = await getDb()
      .insert(teamInvite)
      .values(payload)
      .returning()
      .execute()
    return invite
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to invite team member',
    })
  }
}

export async function getActiveTeamMembers(teamId: string): Promise<Array<{ user: typeof user.$inferSelect, role: string }>> {
  const members = await getDb()
    .select({
      id: teamMember.id,
      teamId: teamMember.teamId,
      userId: teamMember.userId,
      role: teamMember.role,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      lastLoginAt: user.lastActive,
      createdAt: teamMember.createdAt,
    })
    .from(teamMember)
    .leftJoin(user, eq(teamMember.userId, user.id))
    .where(eq(teamMember.teamId, teamId))
    .execute()
  return members
}

export async function getTeamInvites(teamId: string): Promise<TeamInvite[]> {
  const invites = await getDb()
    .select({
      id: teamInvite.id,
      teamId: teamInvite.teamId,
      email: teamInvite.email,
      role: teamInvite.role,
      status: teamInvite.status,
      expiresAt: teamInvite.expiresAt,
      acceptedAt: teamInvite.acceptedAt,
      acceptedBy: teamInvite.acceptedBy,
      createdAt: teamInvite.createdAt,
      acceptedByEmail: user.email,
    })
    .from(teamInvite)
    .leftJoin(user, eq(teamInvite.acceptedBy, user.id))
    .where(eq(teamInvite.teamId, teamId))
    .execute()
  return invites
}

export async function cancelInvite(inviteId: string): Promise<TeamInvite> {
  await getDb().delete(teamInvite).where(eq(teamInvite.id, inviteId)).execute()
}

/**
 * @param token
 * @throws {H3Error}
 */
export async function getInvite(token: string): Promise<TeamInvite> {
  const [invite] = await getDb()
    .select()
    .from(teamInvite)
    .where(eq(teamInvite.token, token))
    .execute()

  if (!invite) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invite not found or invalid',
    })
  }

  if (invite.expiresAt < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invite expired',
    })
  }

  if (INVALID_STATUSES.includes(invite.status as InviteStatus)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invite already ${invite.status}`,
    })
  }
  return invite
}

export async function updateInviteStatus(inviteId: string, status: string, userId?: string): Promise<{ success: boolean, message: string, invite?: TeamInvite }> {
  const updateData: { status: string, acceptedAt?: Date, acceptedBy?: string }
    = { status }

  // If the status is 'accepted', set the acceptedAt timestamp and acceptedBy user ID
  if (status === 'accepted' && userId) {
    updateData.acceptedAt = new Date()
    updateData.acceptedBy = userId
  }

  await getDb()
    .update(teamInvite)
    .set(updateData)
    .where(eq(teamInvite.id, inviteId))
    .execute()
}

export async function acceptTeamInvite(invite: TeamInvite, userId: string): Promise<void> {
  try {
    await getDb()
      .insert(teamMember)
      .values({ teamId: invite.teamId, userId, role: invite.role })
      .execute()
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add user to team',
    })
  }
}

export async function isTeamMember(teamId: string, userId: string): Promise<boolean> {
  try {
    const [member] = await getDb()
      .select({ id: teamMember.id })
      .from(teamMember)
      .where(and(eq(teamMember.teamId, teamId), eq(teamMember.userId, userId)))
      .execute()

    return !!member
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to check if user is already in team',
    })
  }
}

export async function findTeamInvite(inviteId: string): Promise<TeamInvite | null> {
  const [invite] = await getDb()
    .select()
    .from(teamInvite)
    .where(eq(teamInvite.id, inviteId))
    .execute()
  return invite
}

export async function updateTeamInvite(inviteId: string, payload: Partial<TeamInvite>): Promise<TeamInvite> {
  await getDb()
    .update(teamInvite)
    .set(payload)
    .where(eq(teamInvite.id, inviteId))
    .execute()
}

export async function deleteTeamMember(teamId: string, memberId: string): Promise<void> {
  try {
    await getDb()
      .delete(teamMember)
      .where(and(eq(teamMember.teamId, teamId), eq(teamMember.id, memberId)))
      .execute()
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete team member',
    })
  }
}

export async function checkSlugConflict(userId: string, slug: string): Promise<boolean> {
  try {
    const [existingTeam] = await getDb()
      .select({
        id: team.id,
        name: team.name,
        slug: team.slug,
      })
      .from(team)
      .leftJoin(
        teamMember,
        and(eq(team.id, teamMember.teamId), eq(teamMember.userId, userId)),
      )
      .where(
        and(
          eq(team.slug, slug),
          or(eq(team.ownerId, userId), eq(teamMember.userId, userId)),
        ),
      )
      .execute()

    return existingTeam
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to check slug conflict',
    })
  }
}
