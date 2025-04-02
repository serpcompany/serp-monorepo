import { db } from '@serp/utils/server/api/db';
import { companySubmitForm } from '@serp/utils/server/api/db/schema';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);

    const email = session.user?.email;
    if (!email) {
      return {
        status: 401,
        message: 'Unauthorized'
      };
    }

    const { id } = getQuery(event);
    if (!id) {
      const results = await db
        .select({
          id: companySubmitForm.id,
          name: companySubmitForm.name,
          domain: companySubmitForm.domain,
          description: companySubmitForm.description,
          oneLiner: companySubmitForm.oneLiner,
          pricing: companySubmitForm.pricing,
          categories: companySubmitForm.categories,
          uuid: companySubmitForm.uuid,
          isPriority: companySubmitForm.isPriority,
          approved: companySubmitForm.approved,
          createdAt: companySubmitForm.createdAt,
          logo: companySubmitForm.logo,
          reviewedAt: companySubmitForm.reviewedAt,
          reviewedBy: companySubmitForm.reviewedBy,
          reviewedNotes: companySubmitForm.reviewedNotes
        })
        .from(companySubmitForm)
        .where(eq(companySubmitForm.submittingEmail, email))
        .execute();

      return results;
    } else {
      const results = await db
        .select({
          id: companySubmitForm.id,
          name: companySubmitForm.name,
          domain: companySubmitForm.domain,
          description: companySubmitForm.description,
          oneLiner: companySubmitForm.oneLiner,
          pricing: companySubmitForm.pricing,
          categories: companySubmitForm.categories,
          uuid: companySubmitForm.uuid,
          isPriority: companySubmitForm.isPriority,
          approved: companySubmitForm.approved,
          createdAt: companySubmitForm.createdAt,
          logo: companySubmitForm.logo,
          tags: companySubmitForm.tags,
          reviewedAt: companySubmitForm.reviewedAt,
          reviewedBy: companySubmitForm.reviewedBy,
          reviewedNotes: companySubmitForm.reviewedNotes
        })
        .from(companySubmitForm)
        .where(
          and(
            eq(companySubmitForm.submittingEmail, email),
            eq(companySubmitForm.id, id)
          )
        )
        .execute();

      return results.length ? results[0] : null;
    }
  } catch (error) {
    console.error('Error fetching company submissions:', error);
    return {
      status: error.statusCode || 500,
      message: error.message
    };
  }
});
