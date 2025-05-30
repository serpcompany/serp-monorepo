import { getDb } from '../index';
import { team, teamInvite, teamMember, user, entity } from '../schema';
import { and, eq, or, max } from 'drizzle-orm';

type Team = typeof team.$inferSelect;
type InsertTeam = typeof team.$inferInsert;
type TeamInvite = typeof teamInvite.$inferSelect;
type InsertTeamInvite = typeof teamInvite.$inferInsert;

// Define invite status types for better type safety
type InviteStatus = (typeof INVALID_STATUSES)[number];
const INVALID_STATUSES = ['accepted', 'rejected', 'cancelled'] as const;

export const findUserTeams = async (userId: string) => {
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
          categories: entity.categories
        }
      })
      .from(team)
      .leftJoin(
        teamMember,
        and(eq(team.id, teamMember.teamId), eq(teamMember.userId, userId))
      )
      .leftJoin(entity, eq(team.entityId, entity.id))
      .where(or(eq(team.ownerId, userId), eq(teamMember.userId, userId)))
      .groupBy(team.id, entity.id)
      .execute();
    return teams;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find user teams'
    });
  }
};

export const getTeam = async (teamId: string) => {
  const [team_] = await getDb()
    .select()
    .from(team)
    .where(eq(team.id, teamId))
    .execute();
  return team_;
};

export const getTeamById = async (teamId: string) => {
  const [team_] = await getDb()
    .select()
    .from(team)
    .where(eq(team.id, Number(teamId)))
    .execute();
  return team_;
};

export const getAllTeams = async (limit = 50, offset = 0) => {
  const teams = await getDb()
    .select()
    .from(team)
    .limit(limit)
    .offset(offset)
    .execute();
  return teams;
};

export const createTeam = async (payload: InsertTeam) => {
  try {
    const [team_] = await getDb()
      .insert(team)
      .values(payload)
      .returning()
      .execute();

    await getDb()
      .insert(teamMember)
      .values({
        teamId: team_.id,
        userId: payload.ownerId,
        role: 'owner'
      })
      .execute();

    return team_;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to create team');
  }
};

export const updateTeam = async (teamId: string, payload: Partial<Team>) => {
  try {
    const [record] = await getDb()
      .update(team)
      .set(payload)
      .where(eq(team.id, teamId))
      .returning()
      .execute();
    return record;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update team'
    });
  }
};

export const deleteTeam = async (teamId: string) => {
  try {
    await getDb().delete(team).where(eq(team.id, teamId)).execute();
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete team'
    });
  }
};

export const inviteTeamMember = async (payload: InsertTeamInvite) => {
  try {
    const [invite] = await getDb()
      .insert(teamInvite)
      .values(payload)
      .returning()
      .execute();
    return invite;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to invite team member'
    });
  }
};

export const getActiveTeamMembers = async (teamId: string) => {
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
      createdAt: teamMember.createdAt
    })
    .from(teamMember)
    .leftJoin(user, eq(teamMember.userId, user.id))
    .where(eq(teamMember.teamId, teamId))
    .execute();
  return members;
};

export const getTeamInvites = async (teamId: string) => {
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
      acceptedByEmail: user.email
    })
    .from(teamInvite)
    .leftJoin(user, eq(teamInvite.acceptedBy, user.id))
    .where(eq(teamInvite.teamId, teamId))
    .execute();
  return invites;
};

export const cancelInvite = async (inviteId: string) => {
  await getDb().delete(teamInvite).where(eq(teamInvite.id, inviteId)).execute();
};

/**
 * @throws {H3Error}
 */
export const getInvite = async (token: string): Promise<TeamInvite> => {
  const [invite] = await getDb()
    .select()
    .from(teamInvite)
    .where(eq(teamInvite.token, token))
    .execute();

  if (!invite) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invite not found or invalid'
    });
  }

  if (invite.expiresAt < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invite expired'
    });
  }

  if (INVALID_STATUSES.includes(invite.status as InviteStatus)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invite already ${invite.status}`
    });
  }
  return invite;
};

export const updateInviteStatus = async (
  inviteId: string,
  status: string,
  userId?: string
) => {
  const updateData: { status: string; acceptedAt?: Date; acceptedBy?: string } =
    { status };

  // If the status is 'accepted', set the acceptedAt timestamp and acceptedBy user ID
  if (status === 'accepted' && userId) {
    updateData.acceptedAt = new Date();
    updateData.acceptedBy = userId;
  }

  await getDb()
    .update(teamInvite)
    .set(updateData)
    .where(eq(teamInvite.id, inviteId))
    .execute();
};

export const acceptTeamInvite = async (invite: TeamInvite, userId: string) => {
  try {
    await getDb()
      .insert(teamMember)
      .values({ teamId: invite.teamId, userId, role: invite.role })
      .execute();
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add user to team'
    });
  }
};

export const isTeamMember = async (teamId: string, userId: string) => {
  try {
    const [member] = await getDb()
      .select({ id: teamMember.id })
      .from(teamMember)
      .where(and(eq(teamMember.teamId, teamId), eq(teamMember.userId, userId)))
      .execute();

    return !!member;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to check if user is already in team'
    });
  }
};

export const findTeamInvite = async (inviteId: string) => {
  const [invite] = await getDb()
    .select()
    .from(teamInvite)
    .where(eq(teamInvite.id, inviteId))
    .execute();
  return invite;
};

export const updateTeamInvite = async (
  inviteId: string,
  payload: Partial<TeamInvite>
) => {
  await getDb()
    .update(teamInvite)
    .set(payload)
    .where(eq(teamInvite.id, inviteId))
    .execute();
};

export const deleteTeamMember = async (teamId: string, memberId: string) => {
  try {
    await getDb()
      .delete(teamMember)
      .where(and(eq(teamMember.teamId, teamId), eq(teamMember.id, memberId)))
      .execute();
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete team member'
    });
  }
};

export const checkSlugConflict = async (userId: string, slug: string) => {
  try {
    const [existingTeam] = await getDb()
      .select({
        id: team.id,
        name: team.name,
        slug: team.slug
      })
      .from(team)
      .leftJoin(
        teamMember,
        and(eq(team.id, teamMember.teamId), eq(teamMember.userId, userId))
      )
      .where(
        and(
          eq(team.slug, slug),
          or(eq(team.ownerId, userId), eq(teamMember.userId, userId))
        )
      )
      .execute();

    return existingTeam;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to check slug conflict'
    });
  }
};
