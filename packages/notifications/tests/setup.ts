import { vi } from 'vitest'

// Create a dynamic mock for process.env that can be modified per test
const mockEnv = {
  NODE_ENV: 'production',
  SLACK_BOT_TOKEN: 'test-slack-token',
  SLACK_CHANNEL_ID: 'test-channel-id',
  DEFAULT_NOTIFICATION_PROVIDER: 'slack',
}

// Mock node:process with dynamic environment
vi.mock('node:process', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    default: {
      get env() {
        return mockEnv
      },
    },
  }
})

// Export helper to modify environment in tests
export { mockEnv }

// Mock Slack client
const mockPostMessage = vi.fn().mockResolvedValue({ ok: true })
export const mockSlackClient = {
  chat: {
    postMessage: mockPostMessage,
  },
}

// Mock WebClient constructor
export const mockWebClient = vi.fn().mockImplementation(() => mockSlackClient)

// Mock the @slack/web-api module
vi.mock('@slack/web-api', () => ({
  WebClient: mockWebClient,
}))

// Mock console to prevent logs during tests
vi.spyOn(console, 'log').mockImplementation(() => {})
vi.spyOn(console, 'error').mockImplementation(() => {})
