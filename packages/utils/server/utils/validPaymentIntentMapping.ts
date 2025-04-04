import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyCategoryCache,
  companyFeaturedSubscription,
  companySubmitForm,
  payment
} from '@serp/utils/server/api/db/schema';
import { WebClient } from '@slack/web-api';
import { and, eq, isNull } from 'drizzle-orm';

const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannel_ = process.env.SLACK_CHANNEL_ID;
const slack = new WebClient(slackToken);

async function sendSlackNotification(message, slackChannel = slackChannel_) {
  try {
    // await slack.chat.postMessage({
    //     channel: slackChannel,
    //     text: message,
    // });
    console.log('Slack notification sent', { message, slackChannel });
  } catch (error) {
    console.error('Failed to send Slack notification', {
      error: error.message
    });
  }
}

async function processCompanyFeatured(type: string, data?: unknown) {
  const companyResults = await db
    .select({
      domain: companyCache.domain,
      id: companyCache.id
    })
    .from(companyCache)
    .where(eq(companyCache.id, data.metadata.id))
    .limit(1)
    .execute();
  const company = companyResults[0];

  const categoryResults =
    data.metadata.secondaryId != '0'
      ? await db
          .select({
            id: companyCategoryCache.id,
            name: companyCategoryCache.name
          })
          .from(companyCategoryCache)
          .where(eq(companyCategoryCache.id, data.metadata.secondaryId))
          .limit(1)
          .execute()
      : [];
  const category = data.metadata.secondaryId != '0' ? categoryResults[0] : {};

  const result = await db
    .insert(payment)
    .values({
      customer: data.metadata.customerId,
      type: 'company-priority-queue',
      data: JSON.stringify(data)
    })
    .returning({
      id: payment.id
    })
    .execute();

  const paymentId = result[0].id;

  // Check if the company already has a subscription for the category
  const existingSubscription = await db
    .select()
    .from(companyFeaturedSubscription)
    .where(
      and(
        eq(companyFeaturedSubscription.companyFk, company.id),
        data.metadata.secondaryId != '0'
          ? eq(companyFeaturedSubscription.categoryFk, category.id)
          : isNull(companyFeaturedSubscription.categoryFk)
      )
    )
    .execute();

  if (existingSubscription.length > 0) {
    // Update existing subscription
    await db
      .update(companyFeaturedSubscription)
      .set({
        lastPaymentFk: paymentId,
        isActive: true
      })
      .where(
        and(
          eq(companyFeaturedSubscription.companyFk, company.id),
          data.metadata.secondaryId != '0'
            ? eq(companyFeaturedSubscription.categoryFk, category.id)
            : isNull(companyFeaturedSubscription.categoryFk)
        )
      )
      .execute();
  } else {
    // Insert new subscription
    await db
      .insert(companyFeaturedSubscription)
      .values({
        companyFk: company.id,
        categoryFk: data.metadata.secondaryId != '0' ? category.id : null,
        lastPaymentFk: paymentId,
        placement: type.split('-')[2],
        isActive: true,
        email: data.metadata.email
      })
      .execute();
  }

  return {
    company,
    category
  };
}

export async function processSuccessfulPayment(
  type: string,
  getIsValidOnly = false,
  getInfo = false,
  data?: unknown
) {
  if (type === 'company-priority-queue') {
    if (getIsValidOnly) {
      return true;
    } else if (getInfo) {
      return {
        amount: 99,
        currency: 'usd',
        recurring: false,
        description: 'Priority queue listing'
      };
    }
    // Update database
    const result = await db
      .insert(payment)
      .values({
        customer: data.metadata.customerId,
        type: 'company-priority-queue',
        data: JSON.stringify(data)
      })
      .returning({
        id: payment.id
      })
      .execute();

    await db
      .update(companySubmitForm)
      .set({
        isPriority: true,
        priorityPaymentFk: result[0].id
      })
      .where(eq(companySubmitForm.uuid, data.metadata.id));

    const results = await db
      .select({
        domain: companySubmitForm.domain
      })
      .from(companySubmitForm)
      .where(eq(companySubmitForm.uuid, data.metadata.id));
    const domain = results[0].domain;

    // Ping slack
    await sendSlackNotification(
      `💸 New priority queue listing made by ${data.metadata.email} for domain ${domain} (companySubmitForm.uuid: ${data.metadata.id})`
    );
  } else if (type === 'company-featured-1') {
    if (getIsValidOnly) {
      return true;
    } else if (getInfo) {
      return {
        amount: 500,
        currency: 'usd',
        recurring: true,
        paymentId: 'price_1R96du2NSSG073Y63ztzrmOP',
        description: 'Featured listing (spot 1)'
      };
    }

    const { company, category } = await processCompanyFeatured(type, data);

    // Ping slack
    await sendSlackNotification(
      `💸 New featured listing for category '${category.name}' (spot 1) made by ${data.metadata.email} for domain ${company.domain}`
    );
  } else if (type === 'company-featured-2') {
    if (getIsValidOnly) {
      return true;
    } else if (getInfo) {
      return {
        amount: 400,
        currency: 'usd',
        recurring: true,
        paymentId: 'price_1R96du2NSSG073Y63ztzrmOP',
        description: 'Featured listing  (spot 2)'
      };
    }

    const { company, category } = await processCompanyFeatured(type, data);

    // Ping slack
    await sendSlackNotification(
      `💸 New featured listing for category '${category.name}' (spot 2) made by ${data.metadata.email} for domain ${company.domain}`
    );
  } else if (type === 'company-featured-3') {
    if (getIsValidOnly) {
      return true;
    } else if (getInfo) {
      return {
        amount: 300,
        currency: 'usd',
        recurring: true,
        paymentId: 'price_1R96du2NSSG073Y63ztzrmOP',
        description: 'Featured listing (spot 3)'
      };
    }

    const { company, category } = await processCompanyFeatured(type, data);

    // Ping slack
    await sendSlackNotification(
      `💸 New featured listing for category '${category.name}' (spot 3) made by ${data.metadata.email} for domain ${company.domain}`
    );
  } else if (type === 'company-featured-4') {
    if (getIsValidOnly) {
      return true;
    } else if (getInfo) {
      return {
        amount: 200,
        currency: 'usd',
        recurring: true,
        paymentId: 'price_1R96du2NSSG073Y63ztzrmOP',
        description: 'Featured listing (spot 4)'
      };
    }

    const { company, category } = await processCompanyFeatured(type, data);

    // Ping slack
    await sendSlackNotification(
      `💸 New featured listing for category '${category.name}' (spot 4) made by ${data.metadata.email} for domain ${company.domain}`
    );
  } else if (type === 'company-featured-5') {
    if (getIsValidOnly) {
      return true;
    } else if (getInfo) {
      return {
        amount: 100,
        currency: 'usd',
        recurring: true,
        paymentId: 'price_1R96du2NSSG073Y63ztzrmOP',
        description: 'Featured listing (spot 5)'
      };
    }

    const { company, category } = await processCompanyFeatured(type, data);

    // Ping slack
    await sendSlackNotification(
      `💸 New featured listing for category '${category.name}' (spot 5) made by ${data.metadata.email} for domain ${company.domain}`
    );
  } else {
    if (getIsValidOnly) {
      return false;
    }
    throw new Error('Invalid payment type');
  }
}
