import { stripeService } from '../../services/stripe';
import { validateTeamOwnership } from '../../utils/teamValidation';
import {
  getCustomerByTeamId,
  getCustomerByUserId
} from '@serp/db/server/database/queries/customers';

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    const body = await readBody<{ teamId?: string }>(event);

    let customer;

    if (body.teamId) {
      // Team context - validate ownership and get team customer
      await validateTeamOwnership(event, body.teamId);
      customer = await getCustomerByTeamId(body.teamId);
    } else {
      // User context - get user customer
      customer = await getCustomerByUserId(user.id);
    }

    if (!customer) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Customer not found'
      });
    }

    const session = await stripeService.createBillingPortalSession(customer.id);
    return session.url;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create billing portal session'
    });
  }
});
