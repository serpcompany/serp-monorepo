import { getDb } from '@serp/db/server/database';
import { entity, submitForm } from '@serp/db/server/database/schema';
import { sendSlackNotification } from '@serp/notifications/server';
import { load } from 'cheerio';
import { and, eq, sql } from 'drizzle-orm';
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const userId = session?.user?.id;
  if (!userId) return { status: 401, message: 'Unauthorized' };

  const { id, module = '' } = getQuery(event);
  const results = await getDb()
    .select({
      id: submitForm.id,
      entity: submitForm.entity,
      slug: entity.slug,
      backlinkVerified: submitForm.backlinkVerified
    })
    .from(submitForm)
    .leftJoin(entity, eq(entity.id, submitForm.entity))
    .where(
      and(
        eq(submitForm.user, userId),
        eq(submitForm.id, id),
        eq(submitForm.module, module)
      )
    )
    .execute();

  if (results.length === 0) {
    return { ok: false, error: 'No matching record found' };
  }
  if (results[0].backlinkVerified) {
    return { ok: true, verified: true };
  }

  const domain =
    process.env.NODE_ENV === 'production' ? results[0].slug : 'localhost:3000';

  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const url = `${protocol}://${domain}`;
  const verificationHost =
    process.env.NODE_ENV === 'production'
      ? process.env.NUXT_PUBLIC_DOMAIN
      : 'localhost:3000';

  let html: string;
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'SERPVerificationBot/1.0' }
    });
    html = await res.text();
  } catch {
    return { ok: false, error: 'Could not fetch homepage' };
  }

  const $ = load(html);

  const links = $('a')
    .filter((_, el) => {
      const rel = ($(el).attr('rel') || '').toLowerCase().split(/\s+/);
      return (
        !rel.includes('nofollow') &&
        !rel.includes('ugc') &&
        !rel.includes('sponsored')
      );
    })
    .map((_, el) => $(el).attr('href') || '')
    .get();

  const isVerified = links.some((href) => {
    try {
      const url_ = new URL(href, url);
      return url_.host === verificationHost;
    } catch {
      return false;
    }
  });

  if (isVerified) {
    await getDb()
      .update(submitForm)
      .set({ backlinkVerified: true, backlinkVerifiedAt: sql`now()` })
      .where(eq(submitForm.id, id))
      .execute();

    await sendSlackNotification({
      message: `🔗 Backlink verified for entity submission ${results[0].id} by user ${userId} for slug (${results[0].slug})`
    });
  }

  return { ok: true, verified: isVerified };
});
