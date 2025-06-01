import { getDb } from '@serp/db/server/database';
import {
  verification,
  verificationRequest,
  entity,
  team,
  teamMember
} from '@serp/db/server/database/schema';
import { eq } from 'drizzle-orm';
import { defineEventHandler, readBody } from 'h3';

/**
 * Verifies an entity email with the provided verification code.
 * Creates a verification record and sets up team ownership for the verified entity.
 * 
 * @param event - The H3 event object containing the request data
 * @returns Object with verification status and team information
 */
export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const user = session?.user as { id: string } | undefined;
  const userId = user?.id;
  if (!userId) return { status: 401, message: 'Unauthorized' };

  const { requestId, code } = (await readBody(event)) as {
    requestId?: number;
    code?: string;
  };
  if (!requestId || !code) {
    return { error: 'requestId and code are required' };
  }

  // grab the pending request
  const [req] = await getDb()
    .select()
    .from(verificationRequest)
    .where(eq(verificationRequest.id, requestId))
    .limit(1)
    .execute();

  if (!req) {
    return { error: 'verification request not found' };
  }

  // only the creator can verify it
  if (req.user !== userId) {
    return { error: 'forbidden' };
  }

  // check if already used
  if (req.verification) {
    return { ok: true, error: 'already verified' };
  }

  // code match + expiry
  if (req.code !== code) {
    return { error: 'invalid code' };
  }
  if (new Date(req.expiresAt) < new Date()) {
    return { error: 'code expired' };
  }

  const [ver] = await getDb()
    .insert(verification)
    .values({
      entity: req.entity,
      user: userId
    })
    .returning();

  // mark the request as verified
  await getDb()
    .update(verificationRequest)
    .set({ verification: ver.id })
    .where(eq(verificationRequest.id, requestId))
    .execute();

  // fetch the entity
  const [ent] = await getDb()
    .select({ name: entity.name, slug: entity.slug })
    .from(entity)
    .where(eq(entity.id, req.entity))
    .limit(1)
    .execute();

  if (!ent) {
    return { status: 500, message: 'entity not found' };
  }

  // see if a team already exists for this entity
  const [existingTeam] = await getDb()
    .select({ id: team.id, ownerId: team.ownerId })
    .from(team)
    .where(eq(team.entityId, req.entity))
    .limit(1)
    .execute();

  let teamId: number | null = null;

  if (existingTeam) {
    if (!existingTeam.ownerId) {
      await getDb()
        .insert(teamMember)
        .values({ teamId: existingTeam.id, userId, role: 'owner' })
        .execute();

      await getDb()
        .update(team)
        .set({ ownerId: userId })
        .where(eq(team.id, existingTeam.id))
        .execute();
    } else if (existingTeam.ownerId !== userId) {
      await getDb()
        .insert(teamMember)
        .values({ teamId: existingTeam.id, userId, role: 'member' })
        .onConflictDoNothing()
        .execute();
    }

    teamId = existingTeam.id;
  } else {
    const [newTeam] = await getDb()
      .insert(team)
      .values({
        entityId: req.entity,
        ownerId: userId,
        name: ent.name,
        slug: ent.slug
      })
      .returning()
      .execute();

    await getDb()
      .insert(teamMember)
      .values({ teamId: newTeam.id, userId, role: 'owner' })
      .execute();

    teamId = newTeam.id;
  }

  return { ok: true, verificationId: ver.id, teamId };
});
