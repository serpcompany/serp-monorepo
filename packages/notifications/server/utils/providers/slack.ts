import process from 'node:process'
import { WebClient } from '@slack/web-api'

// Slack provider implementation
let slackClient: WebClient | null = null

function getSlackClient(): WebClient {
  if (slackClient)
    return slackClient

  const slackToken = process.env.SLACK_BOT_TOKEN

  if (!slackToken) {
    throw new Error('Missing SLACK_BOT_TOKEN environment variable')
  }

  slackClient = new WebClient(slackToken)
  return slackClient
}

export interface SlackNotificationOptions {
  message: string
  channel?: string
}

export async function sendSlackNotification(
  options: SlackNotificationOptions,
): Promise<void> {
  const { message, channel = process.env.SLACK_CHANNEL_ID } = options

  try {
    if (process.env.NODE_ENV === 'production') {
      const client = getSlackClient()
      await client.chat.postMessage({
        channel,
        text: message,
      })
    }
    else {
      // eslint-disable-next-line no-console
      console.log('Slack notification sent', { message, channel })
    }
  }
  catch (error) {
    console.error('Failed to send Slack notification', {
      error: error.message,
    })
  }
}
