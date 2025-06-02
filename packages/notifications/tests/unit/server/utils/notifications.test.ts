import type { NotificationOptions } from '../../../../server/utils/notifications'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../../../server/utils/providers/slack', () => ({
  sendSlackNotification: vi
    .fn()
    .mockResolvedValue({ sent: true, provider: 'slack' }),
}))

describe('notifications Module', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()

    process.env.DEFAULT_NOTIFICATION_PROVIDER = 'slack'
  })

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  describe('sendNotification', () => {
    it('should use the specified provider', async () => {
      const { sendNotification } = await import(
        '../../../../server/utils/notifications'
      )
      const { sendSlackNotification } = await import(
        '../../../../server/utils/providers/slack'
      )

      const options: NotificationOptions = {
        provider: 'slack',
        message: 'Test notification message',
        channel: 'test-channel',
      }

      await sendNotification(options)

      expect(sendSlackNotification).toHaveBeenCalledWith({
        message: 'Test notification message',
        channel: 'test-channel',
      })
    })

    it('should use the default provider when none is specified', async () => {
      const { sendNotification } = await import(
        '../../../../server/utils/notifications'
      )
      const { sendSlackNotification } = await import(
        '../../../../server/utils/providers/slack'
      )

      const options: NotificationOptions = {
        message: 'Test notification message',
      }

      await sendNotification(options)

      expect(sendSlackNotification).toHaveBeenCalledWith({
        message: 'Test notification message',
      })
    })

    it('should use the DEFAULT_NOTIFICATION_PROVIDER environment variable', async () => {
      process.env.DEFAULT_NOTIFICATION_PROVIDER = 'slack'

      const { sendNotification } = await import(
        '../../../../server/utils/notifications'
      )
      const { sendSlackNotification } = await import(
        '../../../../server/utils/providers/slack'
      )

      const options: NotificationOptions = {
        message: 'Test notification message',
      }

      await sendNotification(options)

      expect(sendSlackNotification).toHaveBeenCalledWith({
        message: 'Test notification message',
      })
    })

    it('should be case-insensitive when checking providers', async () => {
      const { sendNotification } = await import(
        '../../../../server/utils/notifications'
      )
      const { sendSlackNotification } = await import(
        '../../../../server/utils/providers/slack'
      )

      const options: NotificationOptions = {
        provider: 'SLACK',
        message: 'Test notification message',
      }

      await sendNotification(options)

      expect(sendSlackNotification).toHaveBeenCalledWith({
        message: 'Test notification message',
      })
    })

    it('should throw an error for unsupported providers', async () => {
      const { sendNotification } = await import(
        '../../../../server/utils/notifications'
      )

      const options: NotificationOptions = {
        provider: 'unsupported-provider',
        message: 'Test notification message',
      }

      await expect(sendNotification(options)).rejects.toThrow(
        'Unsupported notification provider',
      )
    })

    it('should pass through the response from the provider', async () => {
      const { sendNotification } = await import(
        '../../../../server/utils/notifications'
      )

      const options: NotificationOptions = {
        message: 'Test notification message',
      }

      const result = await sendNotification(options)

      expect(result).toEqual({ sent: true, provider: 'slack' })
    })
  })
})
