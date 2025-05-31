import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockReadBody, mockDb, mockGetQuery } from '../../../../setup';
import { inArray, eq } from 'drizzle-orm';

describe('Entity Edit Post API', () => {
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
    handler = (await import('../../../../../server/api/entity/edit.post'))
      .default;
  });

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null });

    const result = await handler({});

    expect(result).toEqual({ status: 401, message: 'Unauthorized' });
  });

  it('should return 400 if edit ID is missing', async () => {
    mockGetQuery.mockReturnValueOnce({});

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Missing edit ID in query'
    });
  });

  it('should return 400 if edit ID is invalid', async () => {
    mockGetQuery.mockReturnValueOnce({ id: 'not-a-number' });

    const result = await handler({});

    expect(result).toEqual({ status: 400, message: 'Invalid edit ID' });
  });

  it('should return 400 if no data is provided', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });
    mockReadBody.mockResolvedValueOnce({});

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'No valid fields to update'
    });
  });

  it('should return 400 if categories is not an array', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });
    mockReadBody.mockResolvedValueOnce({
      categories: {} // Not a string or array
    });

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: 'Categories must be an array'
    });
  });

  it('should convert categories string to array', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });
    mockReadBody.mockResolvedValueOnce({
      categories: 'cat1, cat2, cat3',
      name: 'Test Entity'
    });

    // Mock that all categories exist by returning correct number of results
    mockDb.execute.mockResolvedValueOnce([
      { id: 'cat1' },
      { id: 'cat2' },
      { id: 'cat3' }
    ]);

    // Mock that entity exists
    mockDb.execute.mockResolvedValueOnce([{ id: 123 }]);

    // Mock insert
    mockDb.execute.mockResolvedValueOnce([{ id: 'new-edit-id' }]);

    await handler({});

    expect(mockDb.insert).toHaveBeenCalled();
    const insertCallValues = mockDb.values.mock.calls[0][0];

    // Values will be stringified, parse them back
    const proposedChanges = JSON.parse(insertCallValues.proposedChanges);
    expect(proposedChanges.categories).toContain('cat1');
    expect(proposedChanges.categories).toContain('cat2');
    expect(proposedChanges.categories).toContain('cat3');
  });

  it('should return 400 if invalid categories are provided', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });
    mockReadBody.mockResolvedValueOnce({
      categories: ['cat1', 'cat2', 'cat3']
    });

    // Mock that not all categories exist (only returning 2 of 3)
    mockDb.execute.mockImplementationOnce(() => {
      return Promise.resolve([{ id: 'cat1' }, { id: 'cat2' }]);
    });

    const result = await handler({});

    expect(result).toEqual({ status: 400, message: 'Invalid categories' });
    expect(mockDb.where).toHaveBeenCalledWith(
      inArray(expect.anything(), ['cat1', 'cat2', 'cat3'])
    );
  });

  it('should return 400 if topics is not an array', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });
    mockReadBody.mockResolvedValueOnce({
      topics: {} // Not a string or array
    });

    const result = await handler({});

    expect(result).toEqual({ status: 400, message: 'Topics must be an array' });
  });

  it('should convert topics string to array', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });
    mockReadBody.mockResolvedValueOnce({
      topics: 'topic1, topic2',
      name: 'Test Entity'
    });

    // Mock that all topics exist
    mockDb.execute.mockResolvedValueOnce([{ id: 'topic1' }, { id: 'topic2' }]);

    // Mock that entity exists
    mockDb.execute.mockResolvedValueOnce([{ id: 123 }]);

    // Mock insert
    mockDb.execute.mockResolvedValueOnce([{ id: 'new-edit-id' }]);

    await handler({});

    expect(mockDb.insert).toHaveBeenCalled();
    const insertCallValues = mockDb.values.mock.calls[0][0];

    // Values will be stringified, parse them back
    const proposedChanges = JSON.parse(insertCallValues.proposedChanges);
    expect(proposedChanges.topics).toContain('topic1');
    expect(proposedChanges.topics).toContain('topic2');
  });

  it('should return 400 if invalid topics are provided', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });
    mockReadBody.mockResolvedValueOnce({
      topics: ['topic1', 'topic2', 'topic3']
    });

    // Mock that not all topics exist (only returning 2 of 3)
    mockDb.execute.mockImplementationOnce(() => {
      return Promise.resolve([{ id: 'topic1' }, { id: 'topic2' }]);
    });

    const result = await handler({});

    expect(result).toEqual({ status: 400, message: 'Invalid topics' });
    expect(mockDb.where).toHaveBeenCalledWith(
      inArray(expect.anything(), ['topic1', 'topic2', 'topic3'])
    );
  });

  it('should return 400 if entity does not exist', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });
    mockReadBody.mockResolvedValueOnce({
      name: 'Updated Name'
    });

    // Mock that entity doesn't exist
    mockDb.execute.mockImplementationOnce(() => Promise.resolve([]));

    const result = await handler({});

    expect(result).toEqual({
      status: 400,
      message: "Entity with given id doesn't exists"
    });
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), 123));
  });

  it('should successfully create an edit request', async () => {
    const editId = 123;
    const userId = 'user-123';

    mockGetQuery.mockReturnValueOnce({ id: editId.toString() });
    const requestData = {
      name: 'Updated Name',
      description: 'Updated Description'
    };
    mockReadBody.mockResolvedValueOnce(requestData);

    // Mock that entity exists
    mockDb.execute.mockResolvedValueOnce([{ id: editId }]);

    // Mock insert
    mockDb.execute.mockResolvedValueOnce([{ id: 'new-edit-id' }]);

    const result = await handler({});

    expect(result).toEqual({ message: 'success' });
    expect(mockDb.insert).toHaveBeenCalled();
    expect(mockDb.values).toHaveBeenCalledWith({
      user: userId,
      entity: editId,
      proposedChanges: JSON.stringify(requestData),
      status: 'pending'
    });
    expect(mockDb.onConflictDoNothing).toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' });
    mockReadBody.mockResolvedValueOnce({ name: 'Test Entity' });

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
