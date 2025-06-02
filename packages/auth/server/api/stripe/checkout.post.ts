import { getDb } from '@serp/db/server/database';
import {
  createCustomer,
  getCustomerByTeamId,
  getCustomerByUserId,
} from '@serp/db/server/database/queries/customers';
import { getEntityById } from '@serp/db/server/database/queries/entities';
import { getTeamById } from '@serp/db/server/database/queries/teams';
import { category, price, subscription } from '@serp/db/server/database/schema';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { stripeService } from '../../services/stripe';
import { validateTeamOwnership } from '../../utils/teamValidation';

interface CheckoutBody {
  priceId: string;
  teamId?: string;
  teamSlug?: string;
  // Featured position specific fields
  entityId?: number;
  categoryId?: number;
  module?: string;
}

async function getOrCreateCustomer(
  teamId: string | undefined = undefined,
  user: { id: string; email: string },
): Promise<string> {
  try {
    if (!teamId || !user.id) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Team ID and User ID are required to get or create a customer',
      });
    }
    if (teamId) {
      const customerRecord = await getCustomerByTeamId(teamId);
      if (customerRecord) {
        return customerRecord.id;
      }

      const newCustomerId = await stripeService.createCustomer(
        teamId,
        user.email,
      );
      await createCustomer({
        id: newCustomerId,
        teamId,
        userId: user.id,
      });
      return newCustomerId;
    } else if (user.id) {
      const customerRecord = await getCustomerByUserId(user.id);
      if (customerRecord) {
        return customerRecord.id;
      }
      const newCustomerId = await stripeService.createCustomer(
        user.id,
        user.email,
      );
      await createCustomer({
        id: newCustomerId,
        userId: user.id,
      });
      return newCustomerId;
    }
    throw createError({
      statusCode: 400,
      statusMessage:
        'Either team ID or user ID must be provided to get or create a customer',
    });
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get or create customer',
    });
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    const body = await readBody<CheckoutBody>(event);

    if (!body.priceId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Price ID is required',
      });
    }

    if (body.teamId) {
      await validateTeamOwnership(event, body.teamId);
    }

    // Check if this is a featured position price
    const [priceRecord] = await getDb()
      .select()
      .from(price)
      .where(eq(price.id, body.priceId))
      .limit(1)
      .execute();

    const isFeaturedPosition =
      priceRecord?.description?.includes('Featured Placement');
    let featuredMetadata = {};

    if (isFeaturedPosition) {
      if (!body.teamId) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Team ID is required for featured position purchases',
        });
      }
      if (!body.categoryId) {
        throw createError({
          statusCode: 400,
          statusMessage:
            'Category ID is required for featured position purchases',
        });
      }
      // Get team details to auto-fill entity information
      const team = await getTeamById(body.teamId);
      if (!team?.entityId) {
        throw createError({
          statusCode: 400,
          statusMessage:
            'Team must be associated with an entity to purchase featured positions',
        });
      }

      // Get entity details
      const entity = await getEntityById(team.entityId);
      if (!entity) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Entity not found',
        });
      }

      // Use entity information from team if not provided
      const entityId = body.entityId || team.entityId;
      const module = body.module || entity.module;

      // Extract position from price description
      const positionMatch = priceRecord.description?.match(
        /Featured\s+Placement\s+(\d+)/i,
      );
      if (!positionMatch) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Invalid featured position price',
        });
      }

      const position = Number.parseInt(positionMatch[1], 10);

      // CRITICAL: Check if this team already has a featured subscription in this category
      const teamExistingFeatured = await getDb()
        .select()
        .from(subscription)
        .where(
          and(
            eq(subscription.teamId, Number.parseInt(body.teamId)),
            inArray(subscription.status, ['active', 'trialing']),
            body.categoryId
              ? sql`${subscription.metadata}->>'categoryId' = ${body.categoryId}`
              : sql`${subscription.metadata}->>'categoryId' IS NULL`,
            sql`${subscription.metadata}->>'type' = 'featured'`,
          ),
        )
        .limit(1)
        .execute();

      if (teamExistingFeatured.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage:
            'You already have a featured position in this category. Please use the Manage Subscription button to change your position.',
        });
      }

      // Check if position is already taken by another team
      const existingSubscription = await getDb()
        .select()
        .from(subscription)
        .where(
          and(
            eq(subscription.priceId, body.priceId),
            inArray(subscription.status, ['active', 'trialing']),
            body.categoryId
              ? sql`${subscription.metadata}->>'categoryId' = ${body.categoryId}`
              : sql`${subscription.metadata}->>'categoryId' IS NULL`,
            sql`${subscription.metadata}->>'module' = ${module}`,
            sql`${subscription.metadata}->>'type' = 'featured'`,
          ),
        )
        .limit(1)
        .execute();

      if (existingSubscription.length > 0) {
        throw createError({
          statusCode: 409,
          statusMessage: `Featured position ${position} is already taken for this category`,
        });
      }

      // Get category slug if categoryId is provided
      let categorySlug = null;
      if (body.categoryId) {
        const [categoryRecord] = await getDb()
          .select({ slug: category.slug })
          .from(category)
          .where(eq(category.id, body.categoryId))
          .limit(1)
          .execute();

        if (categoryRecord) {
          categorySlug = categoryRecord.slug;
        }
      }

      featuredMetadata = {
        type: 'featured',
        placement: position,
        entityId,
        categoryId: body.categoryId || null,
        categorySlug,
        module,
      };
    }

    const customerId = body.teamId
      ? await getOrCreateCustomer(body.teamId, user)
      : await getOrCreateCustomer(undefined, user);
    if (!customerId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create or retrieve customer',
      });
    }

    const session = await stripeService.createCheckoutSession({
      customerId,
      priceId: body.priceId,
      teamSlug: body.teamSlug || undefined, // Optional for user context
      metadata: featuredMetadata,
    });

    return session.url;
  } catch (error) {
    // If it's already a handled error, rethrow it
    if (error instanceof Error) throw error;

    // Otherwise, create a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create checkout session',
    });
  }
});
