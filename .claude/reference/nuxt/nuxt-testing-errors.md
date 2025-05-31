# Testing Fixes Action Plan

Based on comprehensive research of Vue/Nuxt testing ecosystem, here's our action plan to fix the failing tests:

## Current Issues

1. **Component mocking not working**: UAvatar components not being found by tests
2. **Global stubs not applying**: mockComponent calls in setup.ts may not be executing at right time
3. **Environment inconsistencies**: Mixed approaches between vue/test-utils and @nuxt/test-utils

## Solutions to Implement

### 1. Fix Global Component Mocking Approach

According to official docs, `mockComponent` should be called in individual test files or in specific setup, not globally. 

**Current (problematic):**
```ts
// tests/setup.ts
mockComponent('UAvatar', { ... }) // May not work globally
```

**Correct approach:**
```ts
// In each test file that needs it
import { mockComponent } from '@nuxt/test-utils/runtime'

// Before describe block
mockComponent('UAvatar', {
  template: '<div class="avatar"><img v-if="src" :src="src" :alt="alt" /><span v-else>{{ text }}</span></div>',
  props: ['src', 'alt', 'text', 'size']
})
```

### 2. Use Testing Library Approach for Better Component Testing

Based on official Nuxt docs recommendation, switch to `renderSuspended` with Testing Library:

```ts
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'

test('renders avatar correctly', async () => {
  await renderSuspended(UserAvatar, {
    props: {
      user: { name: 'John', avatar: '/avatar.jpg', initials: 'JD' },
      size: 'md'
    }
  })
  
  expect(screen.getByRole('img')).toHaveAttribute('src', '/avatar.jpg')
})
```

### 3. Hybrid Approach: Component-Level Mocking

Instead of global mocking, mock only in tests that need specific components:

```ts
// tests/components/community/UserAvatar.test.ts
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'

// No global mocks needed - test the actual component
describe('UserAvatar Component', () => {
  it('renders with avatar image', async () => {
    await renderSuspended(UserAvatar, {
      props: {
        user: { name: 'John', avatar: '/avatar.jpg', initials: 'JD' }
      }
    })
    
    // Test actual rendered output
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
```

### 4. Fix Test Setup File

Simplify setup to only handle necessary global configuration:

```ts
// tests/setup.ts - Simplified
import { vi } from 'vitest'

// Only global browser API mocks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Remove component mocking from global setup
```

## Implementation Steps

1. **Step 1**: Update test setup to remove global component mocks
2. **Step 2**: Convert UserAvatar test to use renderSuspended + Testing Library
3. **Step 3**: Test if this approach works with actual components
4. **Step 4**: Apply pattern to other failing tests
5. **Step 5**: Verify all tests pass before proceeding with TDD

## Expected Outcome

- Tests that actually test real component behavior
- Better alignment with official Nuxt testing recommendations  
- More maintainable test suite
- Faster test execution without complex mocking setup

This approach follows the "test behavior, not implementation" principle from Testing Library while using official Nuxt utilities.