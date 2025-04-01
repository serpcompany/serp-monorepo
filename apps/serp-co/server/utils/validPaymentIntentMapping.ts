import { db } from '@serp/utils/server/api/db';
import { companySubmitForm } from '@serp/utils/server/api/db/schema';
import { WebClient } from '@slack/web-api';
import { eq } from 'drizzle-orm';

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
    await db
      .update(companySubmitForm)
      .set({
        isPriority: true,
        priorityPaymentData: JSON.stringify(data)
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
  } else if (type === 'company-featured') {
    if (getIsValidOnly) {
      return true;
    } else if (getInfo) {
      return {
        amount: 500,
        currency: 'usd',
        recurring: true,
        paymentId: 'price_1R96du2NSSG073Y63ztzrmOP',
        description: 'Featured listing'
      };
    }
    // TODO: Update database/update cache tables to push featured listing to live/etc.
    // Store status and current_period_end in database
  } else {
    if (getIsValidOnly) {
      return false;
    }
    throw new Error('Invalid payment type');
  }
}
