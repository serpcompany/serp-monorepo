import { getAllPlans } from '@serp/db/server/database/queries/stripe';
import { getTeamById } from '@serp/db/server/database/queries/teams';
import { getEntityById } from '@serp/db/server/database/queries/entities';

interface PlanWithMetadata {
  id: string;
  description: string | null;
  currency: string;
  unitAmount: number;
  type: string;
  interval: string;
  intervalCount: number;
  trialPeriodDays: number | null;
  active: boolean;
  metadata: unknown;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  product: {
    id: string;
    name: string;
    description: string | null;
    active: boolean;
    image: string | null;
    metadata: unknown;
    features: unknown;
    productOrders: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  isFeaturedPosition?: boolean;
  featuredPosition?: number;
}

function parseFeaturedPosition(description: string | null): {
  isFeatured: boolean;
  position?: number;
} {
  if (!description) return { isFeatured: false };

  // Match "Company Featured Placement X" or similar patterns
  const match = description.match(/Featured\s+Placement\s+(\d+)/i);
  if (match) {
    return {
      isFeatured: true,
      position: parseInt(match[1], 10)
    };
  }

  return { isFeatured: false };
}

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);
    const { teamId } = getQuery(event);

    // teamId is optional - if not provided, this is user context

    let isCompanyTeam = false;

    // Only check team entity if this is a team context
    if (session?.user && teamId) {
      // Check if the team is associated with a company entity
      const team = await getTeamById(String(teamId));
      if (team?.entityId) {
        const entity = await getEntityById(team.entityId);
        if (entity?.module === 'company') {
          isCompanyTeam = true;
        }
      }
    }

    const allPlans = await getAllPlans();

    // Process and filter plans
    const processedPlans: PlanWithMetadata[] = allPlans.map((plan) => {
      const { isFeatured, position } = parseFeaturedPosition(plan.description);

      return {
        ...plan,
        isFeaturedPosition: isFeatured,
        featuredPosition: position
      };
    });

    // Filter out featured position plans based on context
    const filteredPlans = processedPlans.filter((plan) => {
      // For user context (no team), always filter out featured position plans
      if (!teamId && plan.isFeaturedPosition) {
        return false;
      }
      // For team context, filter out featured position plans if not a company team
      if (teamId && plan.isFeaturedPosition && !isCompanyTeam) {
        return false;
      }
      return true;
    });

    return filteredPlans;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch plans'
    });
  }
});
