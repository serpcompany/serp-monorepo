import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { SlackNotificationOptions } from '../../../../../server/utils/providers/slack';
import { mockSlackClient, mockWebClient } from '../../../../setup';

let sendSlackNotification: typeof import('../../../../../server/utils/providers/slack').sendSlackNotification;

describe('Slack Provider', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    vi.stubEnv('SLACK_BOT_TOKEN', 'test-slack-token');
    vi.stubEnv('SLACK_CHANNEL_ID', 'test-channel-id');
    vi.stubEnv('NODE_ENV', 'production');

    ({ sendSlackNotification } = await import(
      '../../../../../server/utils/providers/slack'
    ));
  });

  describe('sendSlackNotification', () => {
    it('should send a message to Slack in production environment', async () => {
      const options: SlackNotificationOptions = {
        message: 'Test notification message'
      };

      await sendSlackNotification(options);

      expect(mockWebClient).toHaveBeenCalledWith('test-slack-token');
      expect(mockSlackClient.chat.postMessage).toHaveBeenCalledWith({
        channel: 'test-channel-id',
        text: 'Test notification message'
      });
    });

    it('should use the specified channel when provided', async () => {
      const options: SlackNotificationOptions = {
        message: 'Test notification message',
        channel: 'custom-channel'
      };

      await sendSlackNotification(options);

      expect(mockSlackClient.chat.postMessage).toHaveBeenCalledWith({
        channel: 'custom-channel',
        text: 'Test notification message'
      });
    });

    it('should log instead of sending in non-production environments', async () => {
      vi.stubEnv('NODE_ENV', 'development');

      const consoleSpy = vi.spyOn(console, 'log');

      const options: SlackNotificationOptions = {
        message: 'Test notification message'
      };

      await sendSlackNotification(options);

      expect(mockSlackClient.chat.postMessage).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Slack notification sent', {
        message: 'Test notification message',
        channel: 'test-channel-id'
      });
    });

    it('should handle error if SLACK_BOT_TOKEN is missing', async () => {
      delete process.env.SLACK_BOT_TOKEN;

      const consoleSpy = vi.spyOn(console, 'error');

      const options: SlackNotificationOptions = {
        message: 'Test notification message'
      };

      await sendSlackNotification(options);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to send Slack notification',
        {
          error: expect.stringContaining('Missing SLACK_BOT_TOKEN')
        }
      );
    });

    it('should handle errors when sending to Slack', async () => {
      mockSlackClient.chat.postMessage.mockRejectedValueOnce(
        new Error('Slack API error')
      );

      const consoleSpy = vi.spyOn(console, 'error');

      const options: SlackNotificationOptions = {
        message: 'Test notification message'
      };

      await sendSlackNotification(options);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to send Slack notification',
        {
          error: 'Slack API error'
        }
      );
    });

    it('should reuse the Slack client instance on subsequent calls', async () => {
      await sendSlackNotification({ message: 'First message' });

      mockWebClient.mockClear();

      await sendSlackNotification({ message: 'Second message' });

      expect(mockWebClient).not.toHaveBeenCalled();
      expect(mockSlackClient.chat.postMessage).toHaveBeenCalledTimes(2);
    });
  });
});
