# TypeScript Guidelines and Configuration for Nuxt Projects

## Overview

This document provides comprehensive TypeScript guidelines and configuration recommendations for our Nuxt project, based on research from official Nuxt documentation, antfu's ESLint config, Total TypeScript best practices, and official TypeScript resources.

## 📋 Table of Contents

1. [Nuxt TypeScript Configuration](#nuxt-typescript-configuration)
2. [ESLint Configuration with antfu](#eslint-configuration-with-antfu)
3. [TypeScript Best Practices](#typescript-best-practices)
4. [Official Examples and References](#official-examples-and-references)
5. [Project Implementation Guidelines](#project-implementation-guidelines)
6. [TSDoc Guidelines](#tsdoc-guidelines)
7. [Common Patterns and Solutions](#common-patterns-and-solutions)

## 🚀 Nuxt TypeScript Configuration

### Basic Setup

Nuxt 3 has TypeScript support built-in with **strict checks enabled by default** for greater type safety.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // TypeScript configuration
  typescript: {
    strict: true,  // Enable strict checks (default in Nuxt 3)
    typeCheck: true // Enable type checking during development
  },
  
  // Auto-imports configuration
  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores', 'types', 'utils']
  }
})
```

### TSConfig Recommended Base Configuration

Based on Total TypeScript recommendations, here's our recommended `tsconfig.json`:

```json
{
  "compilerOptions": {
    /* Base Options */
    "skipLibCheck": true,
    "target": "es2022",
    "esModuleInterop": true,
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    
    /* Strict Type Checking */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    
    /* Advanced Options */
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "preserveWatchOutput": true,
    "verbatimModuleSyntax": true
  }
}
```

## 🔧 ESLint Configuration with antfu

### Installation

```bash
pnpm add -D @antfu/eslint-config @nuxt/eslint
```

### Nuxt Config Setup

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      standalone: false // Prevent conflicts with antfu config
    }
  }
})
```

### ESLint Configuration

```javascript
// eslint.config.js
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    // Project type
    type: 'app',
    
    // Auto-detected, explicit enable if needed
    typescript: true,
    vue: true,
    
    // Stylistic formatting rules
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false
    },
    
    // Custom rules
    rules: {
      // Add project-specific rules here
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  })
)
```

## 📚 TypeScript Best Practices

### 1. Type Organization (Total TypeScript Rules)

**Rule 1**: When a type is used in only one place, put it in the same file where it's used.
```typescript
// components/MCPCard.vue
interface Props {
  mcp: MCP
  viewMode?: 'grid' | 'list'
}
```

**Rule 2**: When a type is shared across multiple files, create a dedicated types file.
```typescript
// types/mcp.ts
export interface MCP {
  id: string
  name: string
  // ... other properties
}
```

**Rule 3**: For application-wide types, use a central types directory with index files.

### 2. Naming Conventions

**Use different casing for variables and types:**
```typescript
// ✅ Good
const user = getUserData()
interface User {
  name: string
}

// ❌ Bad
const User = getUserData()
interface user {
  name: string
}
```

### 3. Function Return Types

**Always declare return types for top-level module functions:**
```typescript
// ✅ Good
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

// ✅ Also good for complex returns
export function createMCPFilters(): MCPFilters {
  return {
    categories: [],
    compatibility: [],
    search: '',
    sortBy: 'name'
  }
}
```

### 4. Component Props and Emits

**Use interfaces for component props:**
```typescript
// ✅ Recommended pattern
interface Props {
  /** MCP tool data to display */
  mcp: MCP
  /** Display view mode for responsive layout */
  viewMode?: 'grid' | 'list'
}

interface Emits {
  /** Emitted when card is clicked */
  (e: 'select', mcp: MCP): void
}

const props = withDefaults(defineProps<Props>(), {
  viewMode: 'grid'
})

const emit = defineEmits<Emits>()
```

### 5. Composables Type Safety

**Create type definitions for auto-imported composables:**
```typescript
// types/composables.d.ts
declare module '#app' {
  interface PageMeta {
    layout?: string
    middleware?: string | string[]
  }
}
```

## 🔗 Official Examples and References

### Nuxt Official TypeScript Projects

1. **nuxt/nuxt.com** - The official Nuxt website built with TypeScript
2. **nuxt/examples** - Deployed Nuxt examples with TypeScript patterns
3. **nuxt-community/hackernews-nuxt-ts** - Real-world TypeScript example
4. **nuxt/starter** - Official starter templates with TypeScript support

### Key Repositories to Study

- `github.com/nuxt/nuxt` - Main Nuxt framework (TypeScript codebase)
- `github.com/nuxt/typescript` - TypeScript support for Nuxt 2
- `github.com/nuxt/nuxt.com` - Official website implementation
- `github.com/antfu/eslint-config` - ESLint configuration best practices

## 🏗️ Project Implementation Guidelines

### Directory Structure

```
types/
├── index.ts          # Re-export all types
├── mcp.ts           # MCP-specific types
├── api.ts           # API response types
├── components.d.ts  # Component type declarations
└── composables.d.ts # Composable type declarations
```

### Type Export Pattern

```typescript
// types/index.ts
export type { MCP, MCPFilters, MCPCategory } from './mcp'
export type { ApiResponse, ApiError } from './api'
```

### Component Type Pattern

```typescript
<script setup lang="ts">
import type { MCP } from '~/types'

/**
 * Component description with proper JSDoc
 * 
 * @component
 * @example
 * ```vue
 * <MCPCard :mcp="mcpTool" @select="handleSelect" />
 * ```
 */

interface Props {
  /** Required prop with description */
  mcp: MCP
  /** Optional prop with default */
  variant?: 'default' | 'compact'
}

interface Emits {
  /** Event with typed payload */
  (e: 'select', mcp: MCP): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const emit = defineEmits<Emits>()
</script>
```

## 📝 TSDoc Guidelines

TSDoc is a standardized specification for TypeScript doc comments that ensures different tools can extract content without getting confused by each other's markup. We follow Microsoft's TSDoc standard for all documentation.

### Core TSDoc Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `@param` | Documents function parameters | `@param x - The first input number` |
| `@returns` | Documents return value | `@returns The arithmetic mean of x and y` |
| `@example` | Provides usage examples | `@example Basic usage:` |
| `@remarks` | Additional implementation notes | `@remarks This method is part of the core library` |
| `@typeParam` | Documents generic type parameters | `@typeParam T - The type of items in the array` |
| `@throws` | Documents possible exceptions | `@throws {MCPError} When MCP data is invalid` |
| `@deprecated` | Marks deprecated APIs | `@deprecated Use newFunction() instead` |
| `@beta` | Marks beta/experimental APIs | `@beta This API may change` |

### Vue Component Documentation

For Vue SFCs with `<script setup>`, we use a mixed approach for component documentation:

```vue
<!-- MCPCard.vue -->
<script>
/**
 * MCPCard Component
 * 
 * Displays an individual MCP tool as a card with image, title, description,
 * stats, and action buttons. Follows the design patterns established
 * in the playbooks.com reference design.
 * 
 * @component
 * @example Basic usage
 * ```vue
 * <MCPCard 
 *   :mcp="mcpTool" 
 *   variant="compact"
 *   @select="handleMCPSelect"
 *   @view-details="handleViewDetails"
 * />
 * ```
 * 
 * @example With loading state
 * ```vue
 * <MCPCard 
 *   :mcp="mcpTool" 
 *   :loading="true"
 *   variant="default"
 * />
 * ```
 */
export default {
  name: 'MCPCard'
}
</script>

<script setup lang="ts">
// Component implementation with setup syntax
</script>
```

### Function Documentation

```typescript
/**
 * Format large numbers with K/M suffixes for display
 * 
 * @remarks
 * This utility is used throughout the application for consistent
 * number formatting in stats displays and user interfaces.
 * 
 * @param num - The number to format (must be non-negative)
 * @returns Formatted string with appropriate suffix
 * 
 * @example Basic usage
 * ```typescript
 * formatNumber(1500) // "1.5K"
 * formatNumber(2000000) // "2.0M"
 * formatNumber(42) // "42"
 * ```
 * 
 * @example Edge cases
 * ```typescript
 * formatNumber(0) // "0"
 * formatNumber(999) // "999"
 * formatNumber(1000) // "1.0K"
 * ```
 * 
 * @throws {Error} When num is negative or not a number
 */
function formatNumber(num: number): string {
  if (num < 0 || !Number.isFinite(num)) {
    throw new Error('Number must be non-negative and finite')
  }
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
```

### Interface Documentation

```typescript
/**
 * MCP (Model Context Protocol) tool data structure
 * 
 * Represents an individual MCP server/tool with all metadata
 * required for display and filtering in the collection.
 * 
 * @example Creating an MCP object
 * ```typescript
 * const mcp: MCP = {
 *   id: 'brave-search',
 *   name: 'Brave Search',
 *   description: 'Web search capabilities using Brave Search API',
 *   author: 'Brave Software',
 *   category: 'Productivity',
 *   views: 2847,
 *   copies: 892,
 *   likes: 156
 * }
 * ```
 */
export interface MCP {
  /** Unique identifier for the MCP tool */
  id: string
  /** Display name of the MCP tool */
  name: string
  /** Brief description of functionality (max 200 characters) */
  description: string
  /** Author or organization name */
  author: string
  /** URL to tool icon/logo (optional, falls back to default) */
  icon?: string
  /** Descriptive tags for categorization and search */
  tags: string[]
  /** Primary category for filtering */
  category: MCPCategory
  /** Compatible AI platforms/tools */
  compatibility: string[]
  /** Number of times viewed by users */
  views: number
  /** Number of times copied/used by users */
  copies: number
  /** Number of user likes/favorites */
  likes: number
  /** GitHub repository URL */
  githubUrl: string
  /** Documentation URL */
  documentation: string
  /** ISO 8601 timestamp of creation */
  createdAt: string
  /** ISO 8601 timestamp of last update */
  updatedAt: string
}
```

### Generic Function Documentation

```typescript
/**
 * Creates a debounced version of the provided function
 * 
 * @typeParam T - The type of the function to debounce
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function
 * 
 * @example Debouncing a search function
 * ```typescript
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching for:', query)
 * }, 300)
 * 
 * debouncedSearch('typescript') // Will only execute after 300ms pause
 * ```
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}
```

### Composable Documentation

```typescript
/**
 * MCP filtering and search composable
 * 
 * Provides reactive state management for MCP collection filtering,
 * including search, category filters, and sorting functionality.
 * 
 * @param initialFilters - Initial filter state (optional)
 * @returns Object containing reactive filter state and methods
 * 
 * @example Basic usage
 * ```typescript
 * const { filters, filteredMCPs, updateFilters, clearFilters } = useMCPFilters()
 * 
 * // Update search term
 * updateFilters({ search: 'github' })
 * 
 * // Add category filter
 * updateFilters({ categories: ['Development'] })
 * ```
 * 
 * @example With initial state
 * ```typescript
 * const { filters, filteredMCPs } = useMCPFilters({
 *   search: 'api',
 *   categories: ['Productivity'],
 *   sortBy: 'views'
 * })
 * ```
 */
export function useMCPFilters(initialFilters?: Partial<MCPFilters>) {
  // Implementation
}
```

### Error Class Documentation

```typescript
/**
 * Custom error class for MCP-related operations
 * 
 * Extends the standard Error class with additional context
 * specific to MCP tool operations and API interactions.
 * 
 * @example API error handling
 * ```typescript
 * try {
 *   await fetchMCPData()
 * } catch (error) {
 *   if (error instanceof MCPError) {
 *     console.error(`MCP Error [${error.code}]: ${error.message}`)
 *     console.log('Details:', error.details)
 *   }
 * }
 * ```
 * 
 * @example Creating custom errors
 * ```typescript
 * throw new MCPError(
 *   'Failed to load MCP data',
 *   'MCP_LOAD_ERROR',
 *   { mcpId: 'brave-search', retries: 3 }
 * )
 * ```
 */
export class MCPError extends Error {
  /**
   * Creates a new MCPError instance
   * 
   * @param message - Human-readable error message
   * @param code - Machine-readable error code for categorization
   * @param details - Additional context about the error (optional)
   */
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'MCPError'
  }
}
```

## 🛠️ Common Patterns and Solutions

### 1. Reactive State with Types

```typescript
// ✅ Typed reactive state
const filters = ref<MCPFilters>({
  categories: [],
  compatibility: [],
  search: '',
  sortBy: 'name'
})

// ✅ Computed with explicit return type
const filteredMCPs = computed((): MCP[] => {
  return allMCPs.value.filter(/* filtering logic */)
})
```

### 2. Event Handlers

```typescript
// ✅ Typed event handlers
function handleFiltersUpdate(newFilters: MCPFilters): void {
  filters.value = { ...newFilters }
  currentPage.value = 1
}

function handleMCPSelect(mcp: MCP): void {
  navigateTo(`/mcp/${mcp.id}`)
}
```

### 3. API Integration

```typescript
// types/api.ts
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface ApiError {
  message: string
  code: number
  details?: Record<string, unknown>
}

// composables/useMCPs.ts
export function useMCPs() {
  const { data, pending, error } = useFetch<ApiResponse<MCP[]>>('/api/mcps')
  
  return {
    mcps: computed(() => data.value?.data ?? []),
    loading: pending,
    error: computed(() => error.value as ApiError | null)
  }
}
```

### 4. Route Parameters

```typescript
// pages/mcp/[id].vue
<script setup lang="ts">
interface RouteParams {
  id: string
}

const route = useRoute()
const { id } = route.params as RouteParams

// Type-safe parameter access
const mcpId = ref<string>(id)
</script>
```

## 🎯 Project-Specific Conventions

### 1. File Naming
- Use PascalCase for components: `MCPCard.vue`
- Use kebab-case for pages: `mcp-detail.vue`
- Use camelCase for composables: `useMCPFilters.ts`
- Use kebab-case for types: `mcp-types.ts`

### 2. Import Organization
```typescript
// 1. Vue/Nuxt imports
import { ref, computed } from 'vue'
import { navigateTo } from 'nuxt/app'

// 2. Third-party imports
import { debounce } from 'lodash-es'

// 3. Local type imports
import type { MCP, MCPFilters } from '~/types'

// 4. Local utility imports
import { formatNumber } from '~/utils'
```

### 3. Error Handling
```typescript
// utils/errors.ts
export class MCPError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'MCPError'
  }
}

// Usage in components
try {
  await fetchMCPData()
} catch (error) {
  if (error instanceof MCPError) {
    // Handle specific MCP errors
    console.error(`MCP Error [${error.code}]: ${error.message}`)
  } else {
    // Handle generic errors
    console.error('Unexpected error:', error)
  }
}
```

## ✅ Type Safety Checklist

- [ ] All component props have explicit interfaces
- [ ] All emits have typed event signatures
- [ ] All composables return typed values
- [ ] All API calls use typed responses
- [ ] All route parameters are typed
- [ ] All reactive state has explicit types
- [ ] All functions have return type annotations
- [ ] All complex objects use interfaces, not inline types
- [ ] All shared types are exported from types directory
- [ ] All components have JSDoc documentation

## 🔌 Vue/Nuxt TypeScript Plugins and Tools

### Essential VS Code Extensions

#### Vue - Official (Primary Extension)
```json
{
  "recommendations": [
    "Vue.volar"
  ]
}
```

The **Vue - Official** extension (formerly Volar) is the official VS Code extension providing:
- Advanced TypeScript support for Vue 3 SFCs
- Template type inference and checking
- Real-time diagnostics and error checking
- Enhanced autocompletion and IntelliSense
- Go-to-definition and find references
- Built on Volar language tools

**Important**: Disable Vetur if you have it installed, as Vue - Official replaces it.

#### TypeScript Vue Plugin (Volar)
```json
{
  "recommendations": [
    "Vue.vscode-typescript-vue-plugin"
  ]
}
```

Provides TypeScript server integration for better Vue support in TypeScript files.

### Development Dependencies

#### For Nuxt 3 Projects (Modern - Built-in TypeScript)
```json
{
  "devDependencies": {
    "@nuxt/eslint": "^0.5.0",
    "@antfu/eslint-config": "^3.0.0",
    "typescript": "^5.0.0",
    "vue-tsc": "^2.0.0"
  }
}
```

#### For Nuxt 2 Projects (Legacy)
```json
{
  "devDependencies": {
    "@nuxt/typescript-build": "^3.0.2",
    "@nuxt/types": "^2.18.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Nuxt Configuration for TypeScript

#### Modern Nuxt 3 Configuration
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // TypeScript is enabled by default
  typescript: {
    strict: true,        // Enable strict type checking
    typeCheck: true      // Enable type checking during development
  },
  
  // ESLint integration
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      standalone: false  // Allow antfu config integration
    }
  },
  
  // Auto-imports configuration
  imports: {
    dirs: ['types', 'utils', 'composables']
  }
})
```

#### Legacy Nuxt 2 Configuration
```typescript
// nuxt.config.js
export default {
  buildModules: [
    '@nuxt/typescript-build'
  ],
  
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
}
```

### Plugin Type Declarations

#### Vue Plugin Typing
```typescript
// types/plugins.d.ts
declare module 'vue/types/vue' {
  interface Vue {
    $myInjectedFunction(message: string): void
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $myInjectedFunction(message: string): void
  }
  
  interface Context {
    $myInjectedFunction(message: string): void
  }
}
```

#### Modern Nuxt 3 Plugin Typing
```typescript
// types/plugins.d.ts
declare module '#app' {
  interface NuxtApp {
    $myInjectedFunction(message: string): void
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $myInjectedFunction(message: string): void
  }
}
```

### Project Structure for TypeScript

```
├── .vscode/
│   ├── extensions.json      # Recommended extensions
│   └── settings.json        # VS Code settings
├── types/
│   ├── index.ts            # Main type exports
│   ├── mcp.ts              # Domain-specific types
│   ├── api.ts              # API types
│   ├── plugins.d.ts        # Plugin augmentations
│   └── global.d.ts         # Global type declarations
├── utils/
│   └── *.ts                # Typed utility functions
├── composables/
│   └── *.ts                # Typed composables
├── plugins/
│   └── *.ts                # Typed plugins
├── eslint.config.js        # ESLint configuration
├── tsconfig.json           # TypeScript configuration
└── nuxt.config.ts          # Nuxt configuration
```

### VS Code Workspace Settings

```json
// .vscode/settings.json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "vue.codeActions.enabled": true,
  "vue.complete.casing.tags": "pascal",
  "vue.complete.casing.props": "camel",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Recommended Extensions Configuration

```json
// .vscode/extensions.json
{
  "recommendations": [
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ],
  "unwantedRecommendations": [
    "octref.vetur",
    "ms-vscode.vscode-typescript"
  ]
}
```

### Type Checking Commands

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "type-check": "vue-tsc --noEmit",
    "type-check:watch": "vue-tsc --noEmit --watch",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "dev": "nuxt dev --type-check",
    "build": "nuxt build --type-check"
  }
}
```

### CI/CD Type Checking

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm type-check
      - run: pnpm lint
      - run: pnpm build
```

### Troubleshooting Common Issues

#### Vue Component Not Found
```typescript
// types/components.d.ts
declare module 'vue' {
  export interface GlobalComponents {
    MCPCard: typeof import('../components/mcp/MCPCard.vue')['default']
    MCPGrid: typeof import('../components/mcp/MCPGrid.vue')['default']
  }
}
```

#### Auto-Import Types Not Working
```typescript
// types/auto-imports.d.ts
export {}
declare global {
  const ref: typeof import('vue')['ref']
  const computed: typeof import('vue')['computed']
  const watch: typeof import('vue')['watch']
  const navigateTo: typeof import('nuxt/app')['navigateTo']
}
```

#### Plugin Type Errors
Ensure your plugin files are properly typed:

```typescript
// plugins/my-plugin.client.ts
export default defineNuxtPlugin(() => {
  return {
    provide: {
      myFunction: (message: string): void => {
        console.log(message)
      }
    }
  }
})
```

---

**Note**: This document should be updated as we discover new patterns and best practices during development. Always refer to the latest Nuxt and TypeScript documentation for the most current recommendations.