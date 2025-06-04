import type { NotificationOptions } from '../../../../server/utils/notifications';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../../server/utils/providers/slack', () => ({
  sendSlackNotification: vi
    .fn()
    .mockResolvedValue({ sent: true, provider: 'slack' }),
}))

let sendNotification: typeof import('../../../../server/utils/notifications').sendNotification;
let sendSlackNotification: typeof import('../../../../server/utils/providers/slack').sendSlackNotification;

describe('notifications module', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    vi.stubEnv('DEFAULT_NOTIFICATION_PROVIDER', 'slack');

    ({ sendNotification } = await import(
      '../../../../server/utils/notifications'
    ));
    ({ sendSlackNotification } = await import(
      '../../../../server/utils/providers/slack'
    ));
  });

  describe('sendNotification', () => {
    it('should use the specified provider', async () => {
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
      const options: NotificationOptions = {
        message: 'Test notification message',
      }

      await sendNotification(options)

      expect(sendSlackNotification).toHaveBeenCalledWith({
        message: 'Test notification message',
      })
    })

    it('should use the DEFAULT_NOTIFICATION_PROVIDER environment variable', async () => {
      vi.stubEnv('DEFAULT_NOTIFICATION_PROVIDER', 'slack');

      const options: NotificationOptions = {
        message: 'Test notification message',
      }

      await sendNotification(options)

      expect(sendSlackNotification).toHaveBeenCalledWith({
        message: 'Test notification message',
      })
    })

    it('should be case-insensitive when checking providers', async () => {
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
      const options: NotificationOptions = {
        provider: 'unsupported-provider',
        message: 'Test notification message',
      }

      await expect(sendNotification(options)).rejects.toThrow(
        'Unsupported notification provider',
      )
    })

    it('should pass through the response from the provider', async () => {
      const options: NotificationOptions = {
        message: 'Test notification message',
      }

      const result = await sendNotification(options)

      expect(result).toEqual({ sent: true, provider: 'slack' })
    })
  })
})
