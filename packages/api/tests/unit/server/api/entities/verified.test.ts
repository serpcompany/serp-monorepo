import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDb, mockGetQuery } from '../../../../setup';

// Mock requireUserSession instead of getUserSession
const mockRequireUserSession = vi.fn();
globalThis.requireUserSession = mockRequireUserSession;

describe('Verified Entities API', () => {
  let handler;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    // Reset mockDb.execute
    mockDb.execute.mockReset();
    mockDb.execute.mockImplementation(() => []);

    // Set default user session
    mockRequireUserSession.mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123' }
    });

    handler = (await import('../../../../../server/api/entities/verified'))
      .default;
  });

  it('should return verified entities for a user', async () => {
    // Setup query
    mockGetQuery.mockReturnValue({ module: 'test-module' });

    // Mock database response
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Entity 1',
        slug: 'entity-1',
        module: 'test-module',
        verifiedAt: new Date('2023-01-01')
      },
      {
        id: 2,
        name: 'Entity 2',
        slug: 'entity-2',
        module: 'test-module',
        verifiedAt: new Date('2023-01-02')
      }
    ]);

    // Call the handler
    const result = await handler({});

    // Verify the response
    expect(result.entities).toHaveLength(2);
    expect(result.entities[0].id).toBe(1);
    expect(result.entities[0].name).toBe('Entity 1');
    expect(result.entities[0].module).toBe('test-module');
    expect(result.entities[1].id).toBe(2);

    // Verify DB was queried correctly
    expect(mockDb.execute).toHaveBeenCalledTimes(1);
  });

  it('should filter entities by multiple modules', async () => {
    // Setup query with multiple modules
    mockGetQuery.mockReturnValue({ module: 'module1,module2' });

    // Mock database response
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Entity 1',
        slug: 'entity-1',
        module: 'module1',
        verifiedAt: new Date('2023-01-01')
      },
      {
        id: 3,
        name: 'Entity 3',
        slug: 'entity-3',
        module: 'module2',
        verifiedAt: new Date('2023-01-03')
      }
    ]);

    // Call the handler
    const result = await handler({});

    // Verify the response contains entities from both modules
    expect(result.entities).toHaveLength(2);
    expect(result.entities[0].module).toBe('module1');
    expect(result.entities[1].module).toBe('module2');

    // Verify DB was queried correctly
    expect(mockDb.execute).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no verified entities exist', async () => {
    // Setup query
    mockGetQuery.mockReturnValue({ module: 'test-module' });

    // Mock empty database response
    mockDb.execute.mockResolvedValueOnce([]);

    // Call the handler
    const result = await handler({});

    // Verify the response
    expect(result.entities).toEqual([]);

    // Verify DB was queried correctly
    expect(mockDb.execute).toHaveBeenCalledTimes(1);
  });

  it('should return 401 if user is not authenticated', async () => {
    // Setup query
    mockGetQuery.mockReturnValue({ module: 'test-module' });

    // Mock user session without siteId
    mockRequireUserSession.mockResolvedValue({
      user: { id_: 'user-123' } // No siteId
    });

    // Call the handler
    const result = await handler({});

    // Verify the response is unauthorized
    expect(result.status).toBe(401);
    expect(result.message).toBe('Unauthorized');

    // Verify DB was not queried
    expect(mockDb.execute).not.toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    // Setup query
    mockGetQuery.mockReturnValue({ module: 'test-module' });

    // Mock a database error
    mockDb.execute.mockRejectedValueOnce(new Error('Database error'));

    // Call the handler
    const result = await handler({});

    // Verify the error response
    expect(result.status).toBe(500);
    expect(result.message).toBe('Database error');
  });
});
