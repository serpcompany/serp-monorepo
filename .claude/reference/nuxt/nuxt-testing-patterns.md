# Official Nuxt Testing Patterns

This document contains official testing patterns from the Nuxt and NuxtUI repositories for proper component testing in Nuxt 3 projects.

## Official Testing Stack

- **@nuxt/test-utils** - Official Nuxt testing utilities  
- **vitest** - Test runner and framework
- **@vue/test-utils** - Vue component testing utilities
- **happy-dom** or **jsdom** - DOM environment for testing

## Configuration Setup

### vitest.config.ts (Official Pattern)
```typescript
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true,
        }
      }
    }
  }
})
```

### nuxt.config.ts
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/test-utils/module'
  ],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["vitest/globals"]
      }
    }
  }
})
```

## Component Testing Patterns

### Basic Component Testing with mountSuspended
```typescript
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MyComponent from '~/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(MyComponent, {
      props: {
        title: 'Test Title'
      }
    })
    expect(wrapper.find('h2').text()).toBe('Test Title')
  })
})
```

### Testing with @testing-library/vue using renderSuspended
```typescript
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'

it('renders with testing library', async () => {
  await renderSuspended(MyComponent, {
    props: {
      title: 'Test Title'
    }
  })
  expect(screen.getByRole('heading', { level: 2 })).toBeDefined()
})
```

## Mocking and Stubbing Patterns

### Mocking Nuxt Auto-imports
```typescript
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useRoute', () => () => ({
  params: { id: '999' }
}))

mockNuxtImport('useStorage', () => {
  return () => ({ value: 'mocked storage' })
})
```

### Mocking Components
```typescript
import { mockComponent } from '@nuxt/test-utils/runtime'

mockComponent('MyButton', {
  template: '<button>stub button</button>'
})

// Or with relative path
mockComponent('~/components/MyComponent.vue', async () => {
  return defineComponent({
    template: '<div>Mocked Component</div>'
  })
})
```

### Mocking API Endpoints
```typescript
import { registerEndpoint } from '@nuxt/test-utils/runtime'

registerEndpoint('/api/foo', () => ({
  name: 'stub data'
}))
```

## Handling Auto-imports in Tests

### Method 1: Using @nuxt/test-utils environment
- Use `environment: 'nuxt'` in vitest config
- Or add `// @vitest-environment nuxt` comment to test files  
- Or use `.nuxt.spec.ts` file extension

### Common Component Stubs
```typescript
// Global setup for common Nuxt components
mockComponent('NuxtImg', {
  template: '<img :src="src" :alt="alt" />'
})

mockComponent('NuxtLink', {
  template: '<a :href="to"><slot /></a>'
})

mockComponent('ClientOnly', {
  template: '<div><slot /></div>'
})
```

## Key Best Practices

1. **Use `mountSuspended` instead of regular `mount`** for components that use Nuxt features
2. **Mock auto-imports with `mockNuxtImport`** rather than trying to configure them manually
3. **Use the `nuxt` test environment** to handle Nuxt-specific features automatically
4. **Stub components with `mockComponent`** for better isolation
5. **Use `registerEndpoint`** for API mocking instead of complex HTTP mocking

## Test File Organization and Size Management

### When to Split Test Files

**Not about directory organization** (we already follow good structure in `tests/` directory) but about **code quality within individual test files**:

**Split test files when:**
- Individual test functions exceed **50 lines** (ESLint `max-lines-per-function`)
- Test file exceeds **250 lines** (ESLint `max-lines`)
- Single test component template becomes unwieldy (100+ lines)
- Multiple unrelated test concerns in one file

### How to Split Test Files

**Split by test responsibility, not arbitrary size:**

```typescript
// Before: Large single file
tests/pages/component.test.ts (200+ lines)

// After: Split by concerns  
tests/pages/component-layout.test.ts    // Layout, structure, responsive
tests/pages/component-content.test.ts   // Content display, text, data
tests/pages/component-behavior.test.ts  // User interactions, events
tests/pages/component-props.test.ts     // Props validation, API testing
```

### Example: MCP Detail Page Split

**Original issue:**
```typescript
// Single file with 144-line test function
describe('MCP Detail Page', () => {
  it('renders everything', () => {
    // 144 lines of mixed layout + content + behavior testing
  })
})
```

**Solution:**
```typescript
// tests/pages/mcp-detail-layout.test.ts
describe('MCP Detail Page - Layout Structure', () => {
  it('uses UContainer components for layout', () => {
    // Focus: UContainer, grid, responsive classes
  })
  
  it('implements responsive grid layout', () => {
    // Focus: CSS grid, breakpoints
  })
})

// tests/pages/mcp-detail-content.test.ts  
describe('MCP Detail Page - Content Display', () => {
  it('displays MCP information correctly', () => {
    // Focus: Text content, data display
  })
  
  it('shows formatted metrics', () => {
    // Focus: Number formatting, metrics
  })
})
```

### Benefits of Proper Splitting

1. **ESLint Compliance** - Stay within function/file size limits
2. **Focused Testing** - Each file tests one concern
3. **Faster Debugging** - Easy to locate specific test types
4. **Parallel Execution** - Can run subsets of tests
5. **Maintainability** - Easier to update specific functionality

**Key Principle:** Split for **code quality and maintainability**, not just file size. Keep directory structure intact.

## Common Patterns for NuxtUI Components

```typescript
import { mountSuspended, mockComponent } from '@nuxt/test-utils/runtime'

// Mock NuxtUI components globally
mockComponent('UButton', {
  template: '<button class="btn" :class="color"><slot /></button>',
  props: ['color', 'variant', 'size']
})

mockComponent('UCard', {
  template: `
    <div class="card">
      <header v-if="$slots.header"><slot name="header" /></header>
      <main><slot /></main>
      <footer v-if="$slots.footer"><slot name="footer" /></footer>
    </div>
  `
})

describe('Component with NuxtUI', () => {
  it('renders with mocked UI components', async () => {
    const wrapper = await mountSuspended(MyComponent)
    
    const button = wrapper.findComponent('UButton')
    expect(button.exists()).toBe(true)
  })
})
```

## Environment-Specific Testing

```typescript
// Add to test file for Nuxt environment
// @vitest-environment nuxt

import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('Nuxt-specific component', () => {
  it('uses Nuxt features', async () => {
    const wrapper = await mountSuspended(MyComponent)
    // Auto-imports like ref, computed, etc. work automatically
  })
})
```

This official approach handles:
- Auto-imports (ref, computed, watch, etc.)
- Nuxt composables (useRoute, useRouter, etc.)
- Component registration and stubbing
- API endpoint mocking
- Proper Nuxt environment simulation