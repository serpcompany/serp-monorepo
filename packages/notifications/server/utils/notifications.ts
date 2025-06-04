import type { SlackNotificationOptions } from './providers/slack'
import process from 'node:process'
import { sendSlackNotification } from './providers/slack'

// Provider types
export type NotificationProvider = 'slack' | string

// Generic notification options
export interface NotificationOptions {
  provider?: NotificationProvider
  message: string
  channel?: string // For Slack
  // Add other provider-specific options as needed
}

/**
 * Send a notification using the specified provider
 * @param options The notification options
 * @returns Promise that resolves when the notification is sent
 */
export async function sendNotification(
  options: NotificationOptions,
): Promise<void> {
  const { provider = process.env.DEFAULT_NOTIFICATION_PROVIDER || 'slack' }
    = options

  switch (provider.toLowerCase()) {
    case 'slack':
      return sendSlackNotification({
        message: options.message,
        channel: options.channel,
      } as SlackNotificationOptions)

      // Add other providers here as they are implemented
      // case 'email':
      //   return sendEmailNotification(options);
      // case 'teams':
      //   return sendTeamsNotification(options);

    default:
      throw new Error(`Unsupported notification provider: ${provider}`)
  }
}
