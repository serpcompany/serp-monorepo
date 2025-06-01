# JSDoc Reference Documentation

This document provides examples and best practices for writing JSDoc documentation in our TypeScript codebase.

## Basic Function Documentation

### Simple Function
```javascript
/**
 * Adds two numbers together.
 * @param {number} a - The first number to add
 * @param {number} b - The second number to add
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  return a + b;
}
```

### With Examples
```javascript
/**
 * Calculates the sum of two numbers.
 * @param {number} a - The first number to add
 * @param {number} b - The second number to add
 * @returns {number} The sum of a and b
 * @throws {Error} If either input is not a number
 * @example
 * const result = addNumbers(5, 3); // Returns 8
 * @example <caption>Example with variables</caption>
 * const x = 10;
 * const y = 20;
 * const sum = addNumbers(x, y); // Returns 30
 * @since 1.0.0
 */
function addNumbers(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Inputs must be numbers');
  }
  return a + b;
}
```

## TypeScript Async Functions and Promises

### Async Function with Promise Return Type
```typescript
/**
 * Fetches user data from an API endpoint.
 * @param {string} userId - The unique identifier for the user
 * @returns {Promise<User>} A promise that resolves to user data
 * @throws {Error} If the API request fails or user is not found
 * @example
 * const user = await fetchUser('123');
 * console.log(user.name);
 */
async function fetchUser(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  return response.json();
}
```

### Generic Promise Types
```typescript
/**
 * Makes a cached API request with generic typing.
 * @template T - The type of data returned by the API
 * @param {string} url - The API endpoint URL
 * @returns {Promise<T>} A promise that resolves to the requested data
 * @example
 * const albums = await useFetchWithCache<Album[]>('/api/albums');
 * const user = await useFetchWithCache<User>('/api/user/123');
 */
async function useFetchWithCache<T>(url: string): Promise<T> {
  // Implementation here
}
```

## API Composables Documentation

### Data Fetching Functions
```typescript
/**
 * Fetches paginated entities with filtering options.
 * @param {number} [page=1] - Page number for pagination
 * @param {number} [limit=50] - Number of items per page
 * @param {string} [categorySlug=''] - Filter by category slug
 * @param {string} [module=''] - Filter by module type
 * @returns {Promise<Entities>} Paginated entities data with metadata
 * @throws {Error} If the API request fails
 * @example
 * // Fetch first page with default settings
 * const entities = await useEntities();
 * 
 * @example <caption>Fetch specific page with filters</caption>
 * const filteredEntities = await useEntities(2, 25, 'technology', 'software');
 * @since 1.0.0
 */
export const useEntities = async (
  page = 1,
  limit = 50,
  categorySlug = '',
  module = ''
): Promise<Entities> => {
  // Implementation
}
```

### Single Item Fetching
```typescript
/**
 * Fetches a single entity by its slug identifier.
 * @param {string} slug - The unique slug identifier for the entity
 * @param {string} [module=''] - Optional module filter for entity type
 * @returns {Promise<Entity>} The entity data
 * @throws {Error} If entity is not found or API request fails
 * @example
 * const company = await useEntity('acme-corp', 'company');
 * @example
 * // Without module filter
 * const entity = await useEntity('example-slug');
 */
export const useEntity = async (slug: string, module = ''): Promise<Entity> => {
  // Implementation
}
```

## Server API Documentation

### Event Handler Functions
```typescript
/**
 * API endpoint handler for fetching paginated entities.
 * Supports filtering, sorting, and user-specific data like votes.
 * @param {H3Event} event - The H3 event object containing request data
 * @returns {Promise<EntitiesResponse>} Paginated entities with user context
 * @throws {H3Error} 400 for invalid parameters, 404 for no results, 500 for server errors
 * @example
 * // GET /api/entities?page=1&limit=50&module=company
 * // Returns paginated company entities
 */
export default defineEventHandler(async (event: H3Event): Promise<EntitiesResponse> => {
  // Implementation
}
```

## Common JSDoc Tags Reference

### Essential Tags
- `@param {type} name - description` - Documents function parameters
- `@returns {type} description` - Documents return value
- `@throws {ErrorType} description` - Documents possible exceptions
- `@example` - Provides usage examples
- `@since version` - Documents when feature was added
- `@deprecated` - Marks deprecated features

### TypeScript Specific
- `@template T` - Documents generic type parameters
- `Promise<T>` - For async function return types
- Union types: `{string | number}`
- Optional params: `{string} [optionalParam]`
- Default values: `{number} [page=1]`

### Advanced Examples
- `@example <caption>Title</caption>` - Named examples
- `@see {@link OtherFunction}` - Cross-references
- `@todo description` - Notes for future improvements
- `@internal` - Marks internal-only APIs

## Best Practices

### Writing Style
1. **Be descriptive but concise** - Clear explanations without excessive verbosity
2. **Document the "what" and "when"** - Avoid explaining obvious implementation details
3. **Use proper grammar** - End descriptions with periods
4. **Include common usage examples** - Make documentation immediately actionable

### TypeScript Integration
1. **Use generic types** - Document template parameters with `@template`
2. **Specify Promise types** - Always include the resolved type for async functions
3. **Document optional parameters** - Use bracket notation `[param]` for optional params
4. **Include default values** - Show defaults in parameter documentation

### Maintenance
1. **Document as you code** - Don't leave documentation as an afterthought
2. **Update examples** - Keep code examples current with API changes
3. **Review regularly** - Ensure documentation matches current implementation
4. **Use version tags** - Track when features were introduced with `@since`

## Examples for Our Codebase

### Composable Functions
```typescript
/**
 * Fetches comments for a specific entity.
 * @param {number} id - The entity ID
 * @param {string} [module=''] - The module type (e.g., 'company', 'product')
 * @returns {Promise<Comment[]>} Array of comments for the entity
 * @throws {Error} If the API request fails or entity is not found
 * @example
 * const comments = await useEntityComments(123, 'company');
 * console.log(comments.length); // Number of comments
 */
export const useEntityComments = async (id: number, module = ''): Promise<Comment[]>
```

### Utility Functions
```typescript
/**
 * Validates and normalizes user input for search queries.
 * @param {string} input - Raw user input
 * @param {number} [maxLength=100] - Maximum allowed length
 * @returns {string} Sanitized and normalized search query
 * @throws {Error} If input is empty or exceeds maximum length
 * @example
 * const query = sanitizeSearchInput('  Hello World!  '); // Returns 'hello world!'
 */
export function sanitizeSearchInput(input: string, maxLength = 100): string
```