# Nuxt TypeScript Patterns and Auto-Import Guide

## Overview

This document outlines TypeScript patterns and auto-import best practices specific to our Nuxt monorepo setup, based on research conducted during Phase 2A TypeScript cleanup.

## Monorepo Layer Structure

Our Nuxt apps use a layered architecture for auto-imports:

```
Apps (serp-co, serp-ai, etc.)
  └── extends: @serp/ui
      └── extends: [@serp/types, @serp/api]
          ├── @serp/types: Type definitions
          └── @serp/api: Composables and utilities
```

## Auto-Import Behavior

### Composables Auto-Import

Nuxt automatically imports composables from extended layers:

- **Location**: `/packages/api/composables/`
- **Usage**: Available globally without explicit imports
- **Examples**: `useFetchWithCache`, `useEntities`, `useCompanies`

```typescript
// ✅ This works automatically (no import needed)
export default defineNuxtPlugin(async () => {
  const data = await useFetchWithCache<Entities>('/entities');
});
```

### Types Auto-Import Behavior

Types from `@serp/types` should be available via the layer system, but **may require explicit imports** in certain contexts:

```typescript
// ✅ Explicit import (recommended for composables)
import type { Entities } from '@serp/types/types';

export const useAlbums = async () => {
  const data = await useFetchWithCache<Entities>('/entities?module=music_albums');
  return data;
};
```

## Common TypeScript Patterns

### 1. Generic Composable Usage

**Pattern**: `useFetchWithCache<T>(url: string)`

```typescript
// ✅ Correct pattern with type import
import type { Entities, Company, Post } from '@serp/types/types';

const entities = await useFetchWithCache<Entities>('/entities');
const companies = await useFetchWithCache<Company[]>('/companies');  
const posts = await useFetchWithCache<Post[]>('/posts');
```

### 2. Drizzle ORM Imports

**Pattern**: Import operators from main package

```typescript
// ✅ Correct Drizzle imports
import { eq, sql, isNull, and, or } from 'drizzle-orm';

// Usage in queries
.where(eq(entity.module, module))
.where(and(eq(user.id, userId), isNull(user.deletedAt)))
```

### 3. Monorepo Type Imports

**Pattern**: Consistent import paths across packages

```typescript
// ✅ Standard pattern for all @serp/types
import type { Entity, Company, Post, Category } from '@serp/types/types';

// ✅ For nested types
import type { Entities } from '@serp/types/types'; // Re-exported from Entity.ts
```

## Troubleshooting TS2304 Errors

### Error: "Cannot find name 'Entities'"

**Root Cause**: Missing explicit import in composable files

**Solution**:
```typescript
// Add explicit import
import type { Entities } from '@serp/types/types';

export const useAlbums = async () => {
  const data = await useFetchWithCache<Entities>('/entities?module=music_albums');
  // ...
};
```

### Error: "Cannot find name 'eq'"

**Root Cause**: Missing Drizzle ORM operator import

**Solution**:
```typescript
// Add to existing import or create new import
import { eq, sql } from 'drizzle-orm';

// Usage
.where(eq(entity.module, module))
```

### Error: "Cannot find name 'useS3Object'"

**Root Cause**: Custom composable not auto-imported or doesn't exist

**Investigation Steps**:
1. Check if composable exists in `/packages/api/composables/`
2. Verify file follows naming conventions
3. Check if app extends correct layers
4. Consider explicit import if needed

## Best Practices

### 1. Explicit Imports in Composables

While Nuxt auto-imports work in components, **explicitly import types in composables** for clarity:

```typescript
// ✅ Recommended in composables
import type { Entities } from '@serp/types/types';

// ❌ Avoid relying on auto-import for types in composables  
export const useExample = async (): Promise<Entities> => {
  // ...
};
```

### 2. Consistent Import Patterns

Follow established patterns in the codebase:

```typescript
// ✅ Batch related imports
import type { Entity, Entities, EntitySearchResult } from '@serp/types/types';
import { eq, sql, isNull, and } from 'drizzle-orm';

// ❌ Avoid mixed patterns
import type { Entity } from '@serp/types/types';
import { eq } from 'drizzle-orm';
import type { Entities } from '@serp/types/types'; // Should be batched above
import { sql } from 'drizzle-orm'; // Should be batched above
```

### 3. Type-First Development

Ensure types are generated before development:

```bash
# Generate Nuxt types
pnpm nuxi prepare

# Or start dev server (generates types automatically)
pnpm dev
```

### 4. Nuxt Layer Configuration

Maintain proper layer extensions in `nuxt.config.ts`:

```typescript
// apps/*/nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@serp/ui'], // Includes @serp/types and @serp/api
  // ...
});

// packages/ui/nuxt.config.ts  
export default defineNuxtConfig({
  extends: ['@serp/types', '@serp/api'],
  // ...
});
```

## Configuration Reference

### Auto-Import Directories

Current auto-import directories (configured via layer system):
- `/packages/api/composables/` - Composables auto-imported
- `/packages/ui/composables/` - UI-specific composables  
- `/packages/types/types/` - Types (explicit import recommended)

### TypeScript Integration

Nuxt generates type declarations in:
- `.nuxt/imports.d.ts` - Auto-imported functions
- `.nuxt/components.d.ts` - Auto-imported components

These are generated when running:
- `pnpm nuxi prepare`
- `pnpm dev` 
- `pnpm build`

## Error Prevention

### Pre-commit Hooks

Our TypeScript Phase 1 enforcement prevents these errors:

```bash
# package.json script
"typecheck:phase1": "turbo run typecheck 2>&1 | grep -E 'TS7006|TS7053|TS7034|TS7005|TS7008' && exit 1 || exit 0"

# Next phase (Phase 2A)
"typecheck:phase2a": "turbo run typecheck 2>&1 | grep -E 'TS2304' && exit 1 || exit 0"
```

### IDE Configuration

Ensure VS Code recognizes auto-imports:
- Install Volar extension for Vue/Nuxt
- Run `pnpm dev` to generate types
- Restart TypeScript server if needed

## Related Issues

- **Issue #1006**: Documentation request for TS2304 error resolution guide
- **Phase 2A Cleanup**: Current effort to resolve remaining TS2304 errors

## References

- [Nuxt Auto-Imports Documentation](https://nuxt.com/docs/guide/concepts/auto-imports)
- [Nuxt TypeScript Documentation](https://nuxt.com/docs/guide/concepts/typescript)
- [Drizzle ORM Operators Documentation](https://orm.drizzle.team/docs/operators)

---

*Last Updated: December 2024*  
*Next Review: After Phase 2A completion*