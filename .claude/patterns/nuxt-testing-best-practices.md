# Nuxt Testing Best Practices

## Key Insights from Official Documentation Research

### 1. Component Mocking Strategy

**❌ Don't: Global Component Mocking**
```typescript
// tests/setup.ts - AVOID THIS
mockComponent('UButton', { template: '<button><slot /></button>' })
```

**✅ Do: Per-Test Component Mocking (When Needed)**
```typescript
// In individual test files only when necessary
import { mockComponent } from '@nuxt/test-utils/runtime'

mockComponent('UButton', {
  template: '<button><slot /></button>'
})

describe('MyComponent', () => {
  // tests here
})
```

**✅ Best: Test Real Components**
```typescript
// No mocking needed - test actual component behavior
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'

test('button works correctly', async () => {
  await renderSuspended(MyComponent)
  
  const button = screen.getByRole('button')
  expect(button).toBeInTheDocument()
})
```

### 2. Testing Approach Decision Tree

```
Need to test Nuxt-specific features? (auto-imports, plugins, modules)
├── Yes → Use @nuxt/test-utils
│   ├── Testing user behavior? → renderSuspended + @testing-library/vue
│   └── Testing component internals? → mountSuspended + @vue/test-utils
└── No → Use standard Vue testing
    ├── User behavior → @testing-library/vue
    └── Component internals → @vue/test-utils
```

### 3. Official Nuxt Patterns

#### Pattern 1: User-Centric Testing (Recommended)
```typescript
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'

test('user can interact with component', async () => {
  await renderSuspended(LoginForm)
  
  await userEvent.type(screen.getByLabelText(/username/i), 'john')
  await userEvent.click(screen.getByRole('button', { name: /login/i }))
  
  expect(screen.getByText(/welcome/i)).toBeInTheDocument()
})
```

#### Pattern 2: Component Internals Testing
```typescript
import { mountSuspended } from '@nuxt/test-utils/runtime'

test('component logic works correctly', async () => {
  const wrapper = await mountSuspended(MyComponent)
  
  expect(wrapper.vm.isValid).toBe(false)
  await wrapper.setProps({ value: 'test' })
  expect(wrapper.vm.isValid).toBe(true)
})
```

#### Pattern 3: Nuxt Composables Testing
```typescript
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockUseFetch = vi.fn()
mockNuxtImport('useFetch', () => mockUseFetch)

test('component handles loading state', async () => {
  mockUseFetch.mockReturnValue({
    data: ref(null),
    pending: ref(true),
    error: ref(null)
  })
  
  await renderSuspended(MyComponent)
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
})
```

### 4. Configuration Best Practices

#### Minimal Setup File
```typescript
// tests/setup.ts
import { vi } from 'vitest'

// Only essential global mocks
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

// Mock browser APIs as needed
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}
```

#### Vitest Configuration
```typescript
// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    setupFiles: ['./tests/setup.ts']
  }
})
```

### 5. Testing Library Priority Order

**Use queries in this priority order:**

1. **Accessible to Everyone**
   - `getByRole()` - Most preferred
   - `getByLabelText()`
   - `getByPlaceholderText()`
   - `getByText()`

2. **Semantic Queries**
   - `getByDisplayValue()`
   - `getByAltText()`
   - `getByTitle()`

3. **Test IDs (Last Resort)**
   - `getByTestId()`

### 6. Common Patterns

#### Form Testing
```typescript
test('form validation works', async () => {
  await renderSuspended(ContactForm)
  
  const emailInput = screen.getByLabelText(/email/i)
  const submitButton = screen.getByRole('button', { name: /submit/i })
  
  await userEvent.click(submitButton)
  expect(screen.getByText(/email is required/i)).toBeInTheDocument()
  
  await userEvent.type(emailInput, 'test@example.com')
  await userEvent.click(submitButton)
  expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument()
})
```

#### Navigation Testing
```typescript
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockNavigateTo = vi.fn()
mockNuxtImport('navigateTo', () => mockNavigateTo)

test('navigation works', async () => {
  await renderSuspended(Navigation)
  
  await userEvent.click(screen.getByRole('link', { name: /about/i }))
  expect(mockNavigateTo).toHaveBeenCalledWith('/about')
})
```

### 7. Key Principles

1. **Test behavior, not implementation**
2. **Use real components when possible** (avoid unnecessary mocking)
3. **Mock only external dependencies** (APIs, browser APIs)
4. **Use Testing Library queries** that resemble how users find elements
5. **Follow the testing pyramid** - more unit tests, fewer integration tests
6. **Keep tests simple and focused** - one behavior per test

### 8. Dependencies

#### Required Packages
```json
{
  "devDependencies": {
    "@nuxt/test-utils": "^3.8.0",
    "@testing-library/vue": "^8.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@vue/test-utils": "^2.4.0",
    "vitest": "^1.0.0",
    "happy-dom": "^12.10.0"
  }
}
```

#### Setup for @testing-library/jest-dom
```typescript
// tests/setup.ts
import '@testing-library/jest-dom'
```

### 9. Migration Strategy

When converting existing tests:

1. **Start with setup simplification** - Remove global mocks
2. **Convert to renderSuspended** for user-behavior tests
3. **Keep mountSuspended** for component-internal tests
4. **Remove unnecessary component mocks**
5. **Use Testing Library queries** instead of CSS selectors
6. **Test one behavior per test**

### 10. Performance Tips

- **Use `nuxt` environment** for Nuxt-specific features
- **Use `happy-dom`** for faster pure Vue component tests
- **Mock external APIs** to avoid network calls
- **Use `vi.clearAllMocks()`** in beforeEach for clean state
- **Avoid deep component trees** in unit tests

## Complete Examples from Official Documentation

### Example 1: Testing Composables
```typescript
// composables/useCounter.ts
export function useCounter(initial = 0) {
  const count = ref(initial)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initial
  
  return { count: readonly(count), increment, decrement, reset }
}

// tests/composables/useCounter.test.ts
import { useCounter } from '~/composables/useCounter'

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })
  
  it('initializes with custom value', () => {
    const { count } = useCounter(10)
    expect(count.value).toBe(10)
  })
  
  it('increments count', () => {
    const { count, increment } = useCounter(5)
    increment()
    expect(count.value).toBe(6)
  })
  
  it('decrements count', () => {
    const { count, decrement } = useCounter(5)
    decrement()
    expect(count.value).toBe(4)
  })
  
  it('resets to initial value', () => {
    const { count, increment, reset } = useCounter(10)
    increment()
    increment()
    expect(count.value).toBe(12)
    reset()
    expect(count.value).toBe(10)
  })
})
```

### Example 2: Testing API Integration with Mock Data
```typescript
// tests/components/UserList.test.ts
import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import UserList from '~/components/UserList.vue'

// Mock the fetch composable
const mockUseFetch = vi.fn()
mockNuxtImport('useFetch', () => mockUseFetch)

describe('UserList', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('displays loading state', async () => {
    mockUseFetch.mockReturnValue({
      data: ref(null),
      pending: ref(true),
      error: ref(null)
    })
    
    await renderSuspended(UserList)
    expect(screen.getByText('Loading users...')).toBeInTheDocument()
  })
  
  it('displays users when loaded', async () => {
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]
    
    mockUseFetch.mockReturnValue({
      data: ref(users),
      pending: ref(false),
      error: ref(null)
    })
    
    await renderSuspended(UserList)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })
  
  it('displays error message when fetch fails', async () => {
    mockUseFetch.mockReturnValue({
      data: ref(null),
      pending: ref(false),
      error: ref(new Error('Failed to fetch users'))
    })
    
    await renderSuspended(UserList)
    expect(screen.getByText(/error loading users/i)).toBeInTheDocument()
  })
})
```

### Example 3: Testing Forms with Validation
```typescript
// tests/components/ContactForm.test.ts
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import ContactForm from '~/components/ContactForm.vue'

describe('ContactForm', () => {
  const user = userEvent.setup()
  
  it('validates required fields', async () => {
    await renderSuspended(ContactForm)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/message is required/i)).toBeInTheDocument()
  })
  
  it('validates email format', async () => {
    await renderSuspended(ContactForm)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)
    
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
  })
  
  it('submits valid form', async () => {
    const mockSubmit = vi.fn()
    
    await renderSuspended(ContactForm, {
      props: { onSubmit: mockSubmit }
    })
    
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(messageInput, 'Hello world')
    await user.click(submitButton)
    
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      message: 'Hello world'
    })
  })
  
  it('clears form after successful submission', async () => {
    const mockSubmit = vi.fn().mockResolvedValue(true)
    
    await renderSuspended(ContactForm, {
      props: { onSubmit: mockSubmit }
    })
    
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(messageInput, 'Hello world')
    await user.click(submitButton)
    
    // Wait for form to clear
    await waitFor(() => {
      expect(emailInput).toHaveValue('')
      expect(messageInput).toHaveValue('')
    })
  })
})
```

### Example 4: Testing Navigation and Routing
```typescript
// tests/components/Navigation.test.ts
import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Navigation from '~/components/Navigation.vue'

const mockNavigateTo = vi.fn()
const mockUseRoute = vi.fn()

mockNuxtImport('navigateTo', () => mockNavigateTo)
mockNuxtImport('useRoute', () => mockUseRoute)

describe('Navigation', () => {
  const user = userEvent.setup()
  
  beforeEach(() => {
    mockUseRoute.mockReturnValue({
      path: '/',
      name: 'index'
    })
  })
  
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders all navigation links', async () => {
    await renderSuspended(Navigation)
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })
  
  it('highlights current page', async () => {
    mockUseRoute.mockReturnValue({
      path: '/about',
      name: 'about'
    })
    
    await renderSuspended(Navigation)
    
    const aboutLink = screen.getByRole('link', { name: /about/i })
    expect(aboutLink).toHaveClass('active') // or whatever active class you use
  })
  
  it('navigates to correct routes', async () => {
    await renderSuspended(Navigation)
    
    await user.click(screen.getByRole('link', { name: /about/i }))
    expect(mockNavigateTo).toHaveBeenCalledWith('/about')
    
    await user.click(screen.getByRole('link', { name: /contact/i }))
    expect(mockNavigateTo).toHaveBeenCalledWith('/contact')
  })
})
```

### Example 5: Testing Pages with SEO Meta
```typescript
// tests/pages/about.test.ts
import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import AboutPage from '~/pages/about.vue'

const mockUseSeoMeta = vi.fn()
mockNuxtImport('useSeoMeta', () => mockUseSeoMeta)

describe('About Page', () => {
  it('renders page content', async () => {
    await renderSuspended(AboutPage)
    
    expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument()
    expect(screen.getByText(/we are a company/i)).toBeInTheDocument()
  })
  
  it('sets correct SEO meta', async () => {
    await renderSuspended(AboutPage)
    
    expect(mockUseSeoMeta).toHaveBeenCalledWith({
      title: 'About Us',
      description: 'Learn more about our company and mission',
      ogTitle: 'About Us - Company Name',
      ogDescription: 'Learn more about our company and mission'
    })
  })
})
```

### Example 6: Testing Components with Slots
```typescript
// tests/components/Card.test.ts
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import { h } from 'vue'
import Card from '~/components/Card.vue'

describe('Card Component', () => {
  it('renders default slot content', async () => {
    await renderSuspended(Card, {
      slots: {
        default: 'This is card content'
      }
    })
    
    expect(screen.getByText('This is card content')).toBeInTheDocument()
  })
  
  it('renders header and footer slots', async () => {
    await renderSuspended(Card, {
      slots: {
        header: h('h2', 'Card Title'),
        default: 'Card body content',
        footer: h('button', 'Action Button')
      }
    })
    
    expect(screen.getByRole('heading', { name: 'Card Title' })).toBeInTheDocument()
    expect(screen.getByText('Card body content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument()
  })
  
  it('applies correct styling props', async () => {
    await renderSuspended(Card, {
      props: {
        variant: 'outlined',
        size: 'large'
      },
      slots: {
        default: 'Content'
      }
    })
    
    const card = screen.getByText('Content').closest('[data-testid="card"]')
    expect(card).toHaveClass('card--outlined', 'card--large')
  })
})
```

### Example 7: Testing Error Boundaries
```typescript
// tests/components/ErrorBoundary.test.ts
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import { defineComponent } from 'vue'
import ErrorBoundary from '~/components/ErrorBoundary.vue'

const ThrowingComponent = defineComponent({
  setup() {
    throw new Error('Test error')
  },
  template: '<div>Should not render</div>'
})

describe('ErrorBoundary', () => {
  // Suppress console.error for this test
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  
  afterAll(() => {
    consoleSpy.mockRestore()
  })

  it('catches and displays error message', async () => {
    await renderSuspended(ErrorBoundary, {
      slots: {
        default: h(ThrowingComponent)
      }
    })
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })
  
  it('calls error callback when error occurs', async () => {
    const onError = vi.fn()
    
    await renderSuspended(ErrorBoundary, {
      props: { onError },
      slots: {
        default: h(ThrowingComponent)
      }
    })
    
    expect(onError).toHaveBeenCalledWith(expect.any(Error))
  })
})
```

This approach results in faster, more reliable, and more maintainable tests that better represent actual user interactions.