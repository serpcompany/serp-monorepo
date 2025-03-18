import { db } from '@serp/utils/server/api/db';
import {
  companySubmitForm,
  companyCache,
  companyCategoryCache
} from '@serp/utils/server/api/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { useRuntimeConfig } from '#imports';

const getSession = async (event) => {
  const config = useRuntimeConfig();
  if (!config.public.useAuth) {
    return { user: { email: 'system@example.com' } }; // Default when auth is disabled
  }

  try {
    // Import auth only when needed (inside function)
    const { getServerSession } = await import('#auth');
    return getServerSession(event);
  } catch (error) {
    console.error('Error importing auth:', error);
    return null;
  }
};

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) {
      return {
        status: 401,
        message: 'Unauthorized'
      };
    }

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
      'description'
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

    let tags = data.tags;
    if (typeof tags === 'string') {
      tags = tags.split(',').map((tag: string) => tag.trim());
    }
    tags = [...new Set(tags)];

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
        logo: data.logo
      })
      .execute();

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
