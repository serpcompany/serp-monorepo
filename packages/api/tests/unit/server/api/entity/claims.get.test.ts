import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockGetQuery, mockDb } from '../../../../setup';
import { or } from 'drizzle-orm';

describe('Entity Claims Get API', () => {
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
    handler = (await import('../../../../../server/api/entity/claims.get'))
      .default;
  });

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null });

    const result = await handler({});

    expect(result).toEqual({ status: 401, message: 'Unauthorized' });
  });

  it('should fetch entities claimed by the user for a single module', async () => {
    const module = 'test-module';
    mockGetQuery.mockReturnValueOnce({ module });

    const mockEntities = [
      { id: 1, name: 'Entity 1', slug: 'entity-1', module },
      { id: 2, name: 'Entity 2', slug: 'entity-2', module }
    ];

    mockDb.execute.mockResolvedValueOnce(mockEntities);

    const result = await handler({});

    expect(result).toEqual(mockEntities);
    expect(mockDb.select).toHaveBeenCalled();
    expect(mockDb.from).toHaveBeenCalled();
    expect(mockDb.innerJoin).toHaveBeenCalled();
    expect(mockDb.where).toHaveBeenCalled();
  });

  it('should fetch entities claimed by the user for multiple modules', async () => {
    const modules = 'test-module,other-module';
    mockGetQuery.mockReturnValueOnce({ module: modules });

    const mockEntities = [
      { id: 1, name: 'Entity 1', slug: 'entity-1', module: 'test-module' },
      { id: 2, name: 'Entity 2', slug: 'entity-2', module: 'other-module' }
    ];

    mockDb.execute.mockResolvedValueOnce(mockEntities);

    const result = await handler({});

    expect(result).toEqual(mockEntities);
    expect(mockDb.where).toHaveBeenCalled();
    // Verify the query has OR condition for multiple modules
    expect(or).toHaveBeenCalled();
  });

  it('should return empty array when no entities are found', async () => {
    mockGetQuery.mockReturnValueOnce({ module: 'test-module' });

    mockDb.execute.mockResolvedValueOnce([]);

    const result = await handler({});

    expect(result).toEqual([]);
  });

  it('should handle database errors gracefully', async () => {
    mockGetQuery.mockReturnValueOnce({ module: 'test-module' });

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
