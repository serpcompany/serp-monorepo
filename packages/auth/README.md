# SERP Auth Package

This package provides authentication functionality for SERP applications, using OAuth providers like GitHub and Google.

## Features

- OAuth authentication with GitHub and Google
- User session management
- Central authentication database

## Installation

This package is automatically available as a Nuxt layer in the SERP monorepo.

## Testing

The auth package includes a comprehensive test suite to ensure the reliability of authentication flows.

### Running Tests

To run all tests:

```bash
# From the auth package directory
pnpm test

# Or from the monorepo root
pnpm --filter @serp/auth test
```

To run tests in watch mode during development:

```bash
pnpm test:watch
```

### Test Coverage

To generate test coverage reports:

```bash
pnpm test -- --coverage
```

Coverage reports will be available in the `./coverage` directory.

### Test Structure

- `tests/unit/server/api/auth/` - Tests for OAuth provider handlers
- `tests/unit/server/utils/` - Tests for utility functions like `handleOAuthSuccess`

## Development

When making changes to the authentication flow, make sure to update or add tests to verify the functionality.

### Testing Strategy

The testing approach focuses on:

1. **Unit tests** for individual functions like OAuth mappers
2. **Integration tests** for full authentication flows
3. **Mocking** external dependencies like the database and session utilities

## Environment Variables

Required environment variables for OAuth providers:

- `AUTH_GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `AUTH_GITHUB_CLIENT_SECRET` - GitHub OAuth client secret
- `AUTH_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `AUTH_GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `NUXT_PUBLIC_DOMAIN` - The domain name for the site
