import { vi } from 'vitest'

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
