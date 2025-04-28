import { db } from '@serp/utils/server/api/db';
import { companySubmitForm } from '@serp/utils/server/api/db/schema';
import { load } from 'cheerio';
import { and, eq, sql } from 'drizzle-orm';
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  const email = session.user?.email;
  if (!email) {
    return {
      status: 401,
      message: 'Unauthorized'
    };
  }

  const { id } = getQuery(event);
  const results = await db
    .select({
      id: companySubmitForm.id,
      domain: companySubmitForm.domain,
      backlinkVerified: companySubmitForm.backlinkVerified
    })
    .from(companySubmitForm)
    .where(
      and(
        eq(companySubmitForm.submittingEmail, email),
        eq(companySubmitForm.id, id)
      )
    )
    .execute();

  if (results[0].backlinkVerified) {
    return { ok: true, verified: true };
  }

  const domain =
    process.env.NODE_ENV === 'production'
      ? results[0].domain
      : 'localhost:3000';

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
      headers: { 'User-Agent': 'SERPBot/1.0' }
    });
    html = await res.text();
  } catch (err) {
    console.error('Error fetching homepage:', err);
    return { ok: false, error: 'Could not fetch homepage' };
  }

  const $ = load(html);
  const links = $('a')
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
    await db
      .update(companySubmitForm)
      .set({ backlinkVerified: true, backlinkVerifiedAt: sql`now()` })
      .where(eq(companySubmitForm.id, id))
      .execute();
  }

  return { ok: true, verified: isVerified };
});
