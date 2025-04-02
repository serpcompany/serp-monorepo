import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyCategoryCache,
  companySubmitForm
} from '@serp/utils/server/api/db/schema';
import { eq, inArray } from 'drizzle-orm';

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

    const requiredFields = [
      'name',
      'domain',
      'pricing',
      'oneLiner',
      'description',
      'uuid'
    ];

    const data = await readBody(event);
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length) {
      return {
        status: 400,
        message: `Missing required fields: ${missingFields.join(', ')}`
      };
    }

    // Ensure categories is an array of ids and that all exist in companyCategoryCache
    if (data.categories) {
      if (!Array.isArray(data.categories)) {
        return {
          status: 400,
          message: 'Categories must be an array'
        };
      }

      const categories = await db
        .select()
        .from(companyCategoryCache)
        .where(inArray(companyCategoryCache.id, data.categories))
        .limit(data.categories.length)
        .execute();

      if (categories.length !== data.categories.length) {
        return {
          status: 400,
          message: 'Invalid categories'
        };
      }
    }

    // Ensure domain doesn't already exist
    const existingCompany = await db
      .select()
      .from(companyCache)
      .where(eq(companyCache.domain, data.domain))
      .limit(1)
      .execute();

    if (existingCompany.length) {
      return {
        status: 400,
        message: 'Company with domain already exists'
      };
    }

    if (!data.id) {
      // Not an update
      // Ensure domain hasn't already been submitted
      const existingCompanyForm = await db
        .select()
        .from(companySubmitForm)
        .where(eq(companySubmitForm.domain, data.domain))
        .limit(1)
        .execute();

      if (existingCompanyForm.length) {
        return {
          status: 400,
          message: 'Company with domain already submitted'
        };
      }
    }

    let tags = data.tags;
    if (typeof tags === 'string') {
      tags = tags.split(',').map((tag: string) => tag.trim());
    }
    tags = [...new Set(tags)];

    if (data.id) {
      // Update existing submission
      await db
        .update(companySubmitForm)
        .set({
          name: data.name,
          domain: data.domain,
          categories: data.categories,
          pricing: data.pricing,
          tags,
          oneLiner: data.oneLiner,
          description: data.description,
          logo: data.logo
        })
        .where(eq(companySubmitForm.id, data.id))
        .execute();
    } else {
      await db
        .insert(companySubmitForm)
        .values({
          submittingEmail: email,
          name: data.name,
          domain: data.domain,
          categories: data.categories,
          pricing: data.pricing,
          tags,
          oneLiner: data.oneLiner,
          description: data.description,
          logo: data.logo,
          uuid: data.uuid
        })
        .execute();
    }

    return {
      message: 'success'
    };
  } catch (error) {
    return {
      status: error.statusCode || 500,
      message: error.message
    };
  }
});
