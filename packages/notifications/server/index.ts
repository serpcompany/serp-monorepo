// Export the main notifications API
export { sendNotification } from './utils/notifications'
export type {
  NotificationOptions,
  NotificationProvider,
} from './utils/notifications'

// Export provider-specific APIs for direct use if needed
export { sendSlackNotification } from './utils/providers/slack'
export type { SlackNotificationOptions } from './utils/providers/slack'
