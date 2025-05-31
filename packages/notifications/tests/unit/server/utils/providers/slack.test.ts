import type { SlackNotificationOptions } from '../../../../../server/utils/providers/slack'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockEnv, mockSlackClient, mockWebClient } from '../../../../setup'

describe('slack Provider', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()

    // Reset to default values
    mockEnv.SLACK_BOT_TOKEN = 'test-slack-token'
    mockEnv.SLACK_CHANNEL_ID = 'test-channel-id'
    mockEnv.NODE_ENV = 'production'
  })

  describe('sendSlackNotification', () => {
    it('should send a message to Slack in production environment', async () => {
      const { sendSlackNotification } = await import(
        '../../../../../server/utils/providers/slack'
      )

      const options: SlackNotificationOptions = {
        message: 'Test notification message',
      }

      await sendSlackNotification(options)

      expect(mockWebClient).toHaveBeenCalledWith('test-slack-token')
      expect(mockSlackClient.chat.postMessage).toHaveBeenCalledWith({
        channel: 'test-channel-id',
        text: 'Test notification message',
      })
    })

    it('should use the specified channel when provided', async () => {
      const { sendSlackNotification } = await import(
        '../../../../../server/utils/providers/slack'
      )

      const options: SlackNotificationOptions = {
        message: 'Test notification message',
        channel: 'custom-channel',
      }

      await sendSlackNotification(options)

      expect(mockSlackClient.chat.postMessage).toHaveBeenCalledWith({
        channel: 'custom-channel',
        text: 'Test notification message',
      })
    })

    it('should log instead of sending in non-production environments', async () => {
      mockEnv.NODE_ENV = 'development'

      const consoleSpy = vi.spyOn(console, 'log')
      const { sendSlackNotification } = await import(
        '../../../../../server/utils/providers/slack'
      )

      const options: SlackNotificationOptions = {
        message: 'Test notification message',
      }

      await sendSlackNotification(options)

      expect(mockSlackClient.chat.postMessage).not.toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith('Slack notification sent', {
        message: 'Test notification message',
        channel: 'test-channel-id',
      })
    })

    it('should handle error if SLACK_BOT_TOKEN is missing', async () => {
      delete mockEnv.SLACK_BOT_TOKEN

      const consoleSpy = vi.spyOn(console, 'error')
      const { sendSlackNotification } = await import(
        '../../../../../server/utils/providers/slack'
      )

      const options: SlackNotificationOptions = {
        message: 'Test notification message',
      }

      await sendSlackNotification(options)

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to send Slack notification',
        {
          error: expect.stringContaining('Missing SLACK_BOT_TOKEN'),
        },
      )
    })

    it('should handle errors when sending to Slack', async () => {
      mockSlackClient.chat.postMessage.mockRejectedValueOnce(
        new Error('Slack API error'),
      )

      const consoleSpy = vi.spyOn(console, 'error')
      const { sendSlackNotification } = await import(
        '../../../../../server/utils/providers/slack'
      )

      const options: SlackNotificationOptions = {
        message: 'Test notification message',
      }

      await sendSlackNotification(options)

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to send Slack notification',
        {
          error: 'Slack API error',
        },
      )
    })

    it('should reuse the Slack client instance on subsequent calls', async () => {
      const { sendSlackNotification } = await import(
        '../../../../../server/utils/providers/slack'
      )

      await sendSlackNotification({ message: 'First message' })

      mockWebClient.mockClear()

      await sendSlackNotification({ message: 'Second message' })

      expect(mockWebClient).not.toHaveBeenCalled()
      expect(mockSlackClient.chat.postMessage).toHaveBeenCalledTimes(2)
    })
  })
})
