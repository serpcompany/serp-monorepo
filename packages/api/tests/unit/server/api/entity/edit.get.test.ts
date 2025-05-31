import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDb, mockGetQuery } from '../../../../setup';
import { eq } from 'drizzle-orm';

describe('Entity Edit Get API', () => {
  let handler;
  let mockRequireUserSession;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Setup mock user session
    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123' }
    });
    globalThis.requireUserSession = mockRequireUserSession;

    // Import handler
    handler = (await import('../../../../../server/api/entity/edit.get'))
      .default;
  });

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null });

    const result = await handler({});

    expect(result).toEqual({ status: 401, message: 'Unauthorized' });
  });

  it('should return 400 if entity ID is invalid', async () => {
    mockGetQuery.mockReturnValueOnce({ id: 'not-a-number' });

    const result = await handler({});

    expect(result).toEqual({ status: 400, message: 'Invalid entity ID' });
  });

  it('should return edits for a specific entity when ID is provided', async () => {
    const entityId = 123;
    mockGetQuery.mockReturnValueOnce({ id: entityId.toString() });

    const mockEdits = [
      {
        id: 1,
        entity: entityId,
        user: 'user-123',
        proposedChanges: '{"name":"Updated Name"}',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        entity: entityId,
        user: 'user-456',
        proposedChanges: '{"description":"Updated Description"}',
        status: 'approved',
        createdAt: new Date().toISOString()
      }
    ];

    mockDb.execute.mockResolvedValueOnce(mockEdits);

    const result = await handler({});

    expect(result).toEqual({ edits: mockEdits });
    expect(mockDb.select).toHaveBeenCalled();
    expect(mockDb.from).toHaveBeenCalled();
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), entityId));
  });

  it('should return all edits for the current user when no ID is provided', async () => {
    const userId = 'user-123';
    mockGetQuery.mockReturnValueOnce({});

    const mockEdits = [
      {
        id: 1,
        entity: 123,
        user: userId,
        proposedChanges: '{"name":"Updated Name"}',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        entity: 456,
        user: userId,
        proposedChanges: '{"description":"Updated Description"}',
        status: 'approved',
        createdAt: new Date().toISOString()
      }
    ];

    mockDb.execute.mockResolvedValueOnce(mockEdits);

    const result = await handler({});

    expect(result).toEqual({ edits: mockEdits });
    expect(mockDb.select).toHaveBeenCalled();
    expect(mockDb.from).toHaveBeenCalled();
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), userId));
  });

  it('should handle case with no edits found', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });

    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual({ edits: [] });
  });

  it('should handle database errors gracefully', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });

    // Simulate a database error
    mockDb.execute.mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const result = await handler({});

    expect(result).toEqual({
      status: 500,
      message: 'Database error'
    });
  });
});
