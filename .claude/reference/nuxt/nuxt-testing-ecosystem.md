# Vue/Nuxt Testing Ecosystem - Comprehensive Documentation

## Table of Contents

1. [@nuxt/test-utils - Official Nuxt Testing Utilities](#nuxttest-utils---official-nuxt-testing-utilities)
2. [@vue/test-utils - Vue Component Testing Library](#vuetest-utils---vue-component-testing-library)
3. [@testing-library/vue - Testing Library for Vue](#testing-libraryvue---testing-library-for-vue)
4. [Vitest - Test Runner and Framework](#vitest---test-runner-and-framework)
5. [Jest - Alternative Test Framework](#jest---alternative-test-framework)
6. [Decision Trees and Best Practices](#decision-trees-and-best-practices)
7. [Configuration Patterns](#configuration-patterns)
8. [Examples and Use Cases](#examples-and-use-cases)

## @nuxt/test-utils - Official Nuxt Testing Utilities

### Overview
The `@nuxt/test-utils` package provides several utilities for testing Nuxt applications with full access to the Nuxt environment, including auto-imports, plugins, and the module ecosystem.

### Key Utilities

#### 1. `mountSuspended` vs `renderSuspended`

**mountSuspended**
- Uses `@vue/test-utils` under the hood
- Returns a component wrapper for direct interaction with component methods and properties
- Supports async setup and access to Nuxt plugin injections
- Best for component-focused testing with direct access to Vue instances

```typescript
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { SomeComponent } from '#components'

it('can mount some component', async () => {
  const component = await mountSuspended(SomeComponent, {
    props: { title: 'Test Title' }
  })
  
  // Direct access to component wrapper
  expect(component.text()).toMatchInlineSnapshot('"This is an auto-imported component"')
  expect(component.vm.title).toBe('Test Title')
  
  // Trigger events
  await component.find('button').trigger('click')
})
```

**renderSuspended**
- Uses `@testing-library/vue` under the hood
- Returns testing library utilities (queries, events)
- Focuses on user-centric testing approach
- Best for behavior-driven testing and accessibility testing

```typescript
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { SomeComponent } from '#components'
import { screen } from '@testing-library/vue'

it('can render some component', async () => {
  await renderSuspended(SomeComponent, {
    props: { title: 'Test Title' }
  })
  
  // User-centric queries
  expect(screen.getByText('This is an auto-imported component')).toBeDefined()
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  
  // User interactions
  await screen.getByRole('button').click()
})
```

#### 2. `mockComponent` Usage Patterns

Mock Nuxt components for isolated testing:

```typescript
import { mockComponent } from '@nuxt/test-utils/runtime'

// Simple mock
mockComponent('MyComponent', {
  template: '<div>Mocked Component</div>'
})

// Mock with props and functionality
mockComponent('ComplexComponent', {
  props: {
    value: String,
    count: Number
  },
  setup(props) {
    return {
      displayValue: computed(() => `Count: ${props.count}`)
    }
  },
  template: '<div>{{ displayValue }}</div>'
})

// Mock with slots
mockComponent('SlotComponent', {
  template: '<div><slot name="header" /><slot /></div>'
})
```

#### 3. `mockNuxtImport` Usage Patterns

Mock Nuxt auto-imports for controlled testing:

```typescript
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Mock composables
mockNuxtImport('useStorage', () => {
  return () => ({
    value: ref('mocked storage value'),
    save: vi.fn(),
    load: vi.fn()
  })
})

// Mock utilities
mockNuxtImport('$fetch', () => {
  return vi.fn().mockResolvedValue({ data: 'mocked response' })
})

// Mock with different implementations per test
mockNuxtImport('useAuth', () => {
  return () => ({
    user: ref(null),
    login: vi.fn(),
    logout: vi.fn()
  })
})
```

### Configuration and Setup Requirements

#### Installation
```bash
npm i --save-dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core
```

#### vitest.config.ts
```typescript
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    // Enable auto-imports in tests
    globals: true,
    setupFiles: ['./tests/setup.ts']
  }
})
```

#### Test Setup File
```typescript
// tests/setup.ts
import { setActivePinia, createPinia } from 'pinia'

beforeEach(() => {
  // Reset Pinia state before each test
  setActivePinia(createPinia())
})
```

### Official Examples from Nuxt Repositories

#### Testing Pages
```typescript
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('Index Page', () => {
  it('renders welcome message', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.find('h1').text()).toBe('Welcome to Nuxt!')
  })
  
  it('navigates on button click', async () => {
    const wrapper = await mountSuspended(IndexPage)
    const router = useRouter()
    
    await wrapper.find('[data-testid="navigate-btn"]').trigger('click')
    expect(router.push).toHaveBeenCalledWith('/about')
  })
})
```

#### Testing Composables
```typescript
import { mountSuspended } from '@nuxt/test-utils/runtime'

// Test component that uses the composable
const TestComponent = defineComponent({
  setup() {
    const { data, pending } = useFetch('/api/users')
    return { data, pending }
  },
  template: '<div>{{ pending ? "Loading..." : data.length }}</div>'
})

describe('useFetch composable', () => {
  it('handles loading state', async () => {
    const wrapper = await mountSuspended(TestComponent)
    expect(wrapper.text()).toContain('Loading...')
  })
})
```

## @vue/test-utils - Vue Component Testing Library

### Core Concepts

#### Mount Function and Component Wrapper Utilities

The `mount()` function creates a Vue app that holds and renders the component under testing, returning a wrapper for interaction and assertions.

```typescript
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(MyComponent, {
      props: { msg: 'Hello Vitest' }
    })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
```

#### Component Querying Methods

**Element Queries**
```typescript
const wrapper = mount(Component)

// Find by CSS selector
wrapper.find('.my-class')
wrapper.find('#my-id')
wrapper.find('button')

// Find all matching elements
wrapper.findAll('.item')

// Find by data attributes
wrapper.find('[data-testid="submit-btn"]')
```

**Component Queries**
```typescript
// Find child components
wrapper.findComponent(ChildComponent)
wrapper.findComponent({ name: 'ChildComponent' })
wrapper.findAllComponents(ChildComponent)

// Get component (throws if not found)
wrapper.getComponent(ChildComponent)
```

#### Props, Events, and Slots Testing

**Props Testing**
```typescript
const wrapper = mount(MyComponent, {
  props: {
    title: 'Test Title',
    items: [1, 2, 3],
    config: { theme: 'dark' }
  }
})

// Access props
expect(wrapper.props('title')).toBe('Test Title')

// Update props
await wrapper.setProps({ title: 'New Title' })
expect(wrapper.text()).toContain('New Title')
```

**Events Testing**
```typescript
const wrapper = mount(MyComponent)

// Trigger DOM events
await wrapper.find('button').trigger('click')
await wrapper.find('input').trigger('input', { target: { value: 'test' } })

// Trigger custom events
await wrapper.find('child-component').trigger('custom-event', { data: 'test' })

// Check emitted events
expect(wrapper.emitted()).toHaveProperty('submit')
expect(wrapper.emitted('submit')).toHaveLength(1)
expect(wrapper.emitted('submit')[0]).toEqual(['form-data'])
```

**Slots Testing**
```typescript
import { h } from 'vue'

const wrapper = mount(MyComponent, {
  slots: {
    default: 'Default slot content',
    header: h('h1', 'Header Content'),
    footer: HeaderComponent
  }
})

expect(wrapper.html()).toContain('Default slot content')
```

#### Stubbing and Mocking Patterns

**Component Stubbing**
```typescript
const wrapper = mount(ParentComponent, {
  global: {
    stubs: {
      ChildComponent: true, // Stub with default template
      ComplexChild: { template: '<div>Stubbed</div>' }, // Custom stub
      'router-link': { template: '<a><slot /></a>' } // Stub router components
    }
  }
})
```

**Plugin and Global Mocking**
```typescript
const wrapper = mount(MyComponent, {
  global: {
    plugins: [pinia],
    mocks: {
      $t: (key) => key, // Mock i18n
      $router: { push: vi.fn() },
      $route: { params: { id: '1' } }
    },
    provide: {
      theme: 'dark'
    }
  }
})
```

### Relationship with Nuxt Test Utils

`@vue/test-utils` is the foundation that `@nuxt/test-utils` builds upon. When using `mountSuspended`, you get access to the same wrapper API but with Nuxt-specific enhancements:

```typescript
// Pure Vue testing
const wrapper = mount(Component)

// Nuxt-enhanced testing (includes auto-imports, plugins, etc.)
const wrapper = await mountSuspended(Component)

// Both return the same wrapper API
wrapper.find()
wrapper.trigger()
wrapper.emitted()
```

## @testing-library/vue - Testing Library for Vue

### Philosophy and User-Centric Testing Approach

Testing Library focuses on testing components the way users interact with them, emphasizing accessibility and behavior over implementation details.

**Core Principles:**
- Test behavior, not implementation
- Use queries that resemble how users find elements
- Encourage accessibility best practices

### render() vs renderSuspended()

**render() - Standard Testing Library**
```typescript
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('renders component', () => {
  const { getByText, getByRole } = render(MyComponent, {
    props: { title: 'Hello' }
  })
  
  expect(getByText('Hello')).toBeInTheDocument()
  expect(getByRole('button')).toBeVisible()
})
```

**renderSuspended() - Nuxt Enhanced**
```typescript
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'

test('renders with Nuxt context', async () => {
  await renderSuspended(MyComponent, {
    props: { title: 'Hello' }
  })
  
  // Has access to Nuxt auto-imports, plugins, etc.
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

### Screen Utilities and Queries

**Priority Order (Recommended by Testing Library):**

1. **Accessible to Everyone**
   ```typescript
   // By Role (most preferred)
   screen.getByRole('button', { name: /submit/i })
   screen.getByRole('textbox', { name: /username/i })
   
   // By Label Text
   screen.getByLabelText(/username/i)
   
   // By Placeholder
   screen.getByPlaceholderText(/enter username/i)
   
   // By Text Content
   screen.getByText(/welcome/i)
   ```

2. **Semantic Queries**
   ```typescript
   // By Display Value
   screen.getByDisplayValue(/john doe/i)
   
   // By Alt Text
   screen.getByAltText(/profile picture/i)
   
   // By Title
   screen.getByTitle(/close dialog/i)
   ```

3. **Test IDs (Last Resort)**
   ```typescript
   screen.getByTestId('submit-button')
   ```

### FireEvent and User Interactions

**Basic Events**
```typescript
import { fireEvent } from '@testing-library/vue'

// Click events
await fireEvent.click(screen.getByRole('button'))

// Input events
await fireEvent.update(screen.getByLabelText(/username/i), 'john')

// Form events
await fireEvent.submit(screen.getByRole('form'))
```

**Advanced User Interactions (with @testing-library/user-event)**
```typescript
import userEvent from '@testing-library/user-event'

test('user interactions', async () => {
  const user = userEvent.setup()
  
  // Type in input
  await user.type(screen.getByLabelText(/username/i), 'john doe')
  
  // Click button
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  // Select options
  await user.selectOptions(screen.getByRole('combobox'), 'option1')
  
  // Upload file
  const file = new File(['content'], 'test.txt', { type: 'text/plain' })
  await user.upload(screen.getByLabelText(/upload/i), file)
})
```

### When to Use vs @vue/test-utils

**Use @testing-library/vue when:**
- Testing user behavior and interactions
- Ensuring accessibility compliance
- Writing tests that are resistant to refactoring
- Testing from the user's perspective

**Use @vue/test-utils when:**
- Testing component internals and implementation details
- Need direct access to component methods and data
- Testing component lifecycle events
- Working with complex component hierarchies

**Combined Approach:**
```typescript
// Test user behavior with Testing Library
test('user can submit form', async () => {
  await renderSuspended(LoginForm)
  
  await userEvent.type(screen.getByLabelText(/username/i), 'john')
  await userEvent.type(screen.getByLabelText(/password/i), 'secret')
  await userEvent.click(screen.getByRole('button', { name: /login/i }))
  
  expect(screen.getByText(/welcome john/i)).toBeInTheDocument()
})

// Test component internals with vue/test-utils
test('form validation logic', async () => {
  const wrapper = await mountSuspended(LoginForm)
  
  // Access internal validation methods
  expect(wrapper.vm.isValid).toBe(false)
  
  await wrapper.setData({ username: 'john', password: 'secret' })
  expect(wrapper.vm.isValid).toBe(true)
})
```

## Vitest - Test Runner and Framework

### Configuration for Vue/Nuxt Projects

#### Basic Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom', // or 'jsdom'
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
})
```

#### Nuxt-Specific Configuration
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

### Environment Setup Options

**1. happy-dom (Recommended for Nuxt)**
- Faster than jsdom
- Better compatibility with modern JavaScript
- Built-in support for most DOM APIs

**2. jsdom**
- More complete DOM implementation
- Better compatibility with legacy code
- Slightly slower than happy-dom

**3. nuxt Environment**
- Full Nuxt runtime environment
- Access to all Nuxt features and auto-imports
- Required for testing Nuxt-specific functionality

### Mocking Capabilities

**vi.fn() - Function Mocking**
```typescript
import { vi } from 'vitest'

// Simple mock
const mockFn = vi.fn()
mockFn('arg1', 'arg2')
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')

// Mock with implementation
const mockFetch = vi.fn().mockImplementation(async (url) => {
  return { json: () => Promise.resolve({ data: 'mock' }) }
})

// Mock return values
const mockApi = vi.fn()
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call')
  .mockReturnValue('default')
```

**vi.mock() - Module Mocking**
```typescript
// Auto mock
vi.mock('axios')

// Mock with implementation
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: 'mock' })),
    post: vi.fn(() => Promise.resolve({ data: 'posted' }))
  }
}))

// Partial mocking
vi.mock('lodash', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    debounce: vi.fn((fn) => fn) // Mock only debounce
  }
})
```

**vi.spyOn() - Spy on Methods**
```typescript
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
const objectSpy = vi.spyOn(myObject, 'method')

// Restore after test
afterEach(() => {
  consoleSpy.mockRestore()
  objectSpy.mockRestore()
})
```

### Coverage Reporting

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // or 'c8', 'istanbul'
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})
```

### Integration with Nuxt Test Utils

```typescript
// Complete test setup with Vitest + Nuxt
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import MyComponent from '~/components/MyComponent.vue'

// Mock Nuxt imports
mockNuxtImport('useFetch', () => {
  return vi.fn().mockResolvedValue({
    data: ref({ users: [] }),
    pending: ref(false),
    error: ref(null)
  })
})

describe('MyComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with mocked data', async () => {
    const wrapper = await mountSuspended(MyComponent)
    expect(wrapper.text()).toContain('No users found')
  })
})
```

## Jest - Alternative Test Framework

### Comparison with Vitest for Vue Projects

#### Performance Comparison
- **Vitest**: 4x faster test execution, 10-20x faster in watch mode
- **Jest**: More mature ecosystem, extensive plugin library
- **Hot Reloading**: Vitest only runs changed code and affected tests

#### API Compatibility
```typescript
// Most Jest APIs work directly in Vitest
describe('Component', () => {
  it('should work', () => {
    expect(true).toBe(true)
  })
  
  beforeEach(() => {
    // setup
  })
})

// Differences in mocking
// Jest
jest.mock('module')
jest.fn()

// Vitest
vi.mock('module')
vi.fn()
```

### Migration Considerations

#### Key Differences

**1. Mock Reset Behavior**
```typescript
// Jest: mockReset replaces with empty function returning undefined
mockFn.mockReset()

// Vitest: mockReset resets to original implementation
mockFn.mockReset()
```

**2. Module Mocking**
```typescript
// Jest: factory return value is default export
jest.mock('module', () => 'default export')

// Vitest: factory must return object with explicit exports
vi.mock('module', () => ({
  default: 'default export',
  namedExport: 'named export'
}))
```

**3. Manual Mocks**
```typescript
// Jest: __mocks__ loaded automatically
// Vitest: requires explicit vi.mock() call
vi.mock('module') // Loads from __mocks__/module.js
```

### When to Choose Jest vs Vitest

**Choose Jest when:**
- Existing Jest test suite needs migration
- Need maximum ecosystem compatibility
- Working with non-Vite projects
- Require specific Jest plugins

**Choose Vitest when:**
- Building new Vue/Nuxt projects
- Using Vite build tool
- Need faster test execution
- Want modern JavaScript support out of the box

### Vue/Nuxt Compatibility

Both frameworks work well with Vue/Nuxt, but:

- **Vue.js docs recommend**: "We only recommend Jest if you have an existing Jest test suite that needs to be migrated over to a Vite-based project, as Vitest offers a more seamless integration and better performance."

- **Nuxt docs state**: "Currently, Vitest is recommended" for both unit and end-to-end testing.

## Decision Trees and Best Practices

### Testing Strategy Decision Tree

```
Are you testing a Nuxt application?
├── Yes
│   ├── Need Nuxt-specific features? (auto-imports, plugins, modules)
│   │   ├── Yes → Use @nuxt/test-utils with mountSuspended/renderSuspended
│   │   └── No → Use @vue/test-utils or @testing-library/vue
│   └── No → Continue to Vue testing options
├── Are you testing Vue components?
│   ├── Testing user behavior/accessibility?
│   │   └── Yes → Use @testing-library/vue
│   ├── Testing component internals/implementation?
│   │   └── Yes → Use @vue/test-utils
│   └── Mixed approach → Combine both libraries
└── Choose test runner
    ├── New project or using Vite → Vitest
    └── Existing Jest suite → Jest (consider migration)
```

### Testing Approach by Component Type

#### 1. Presentation Components
```typescript
// Use Testing Library for user-focused testing
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

test('button shows loading state', async () => {
  const user = userEvent.setup()
  render(LoadingButton, { props: { loading: false } })
  
  const button = screen.getByRole('button')
  await user.click(button)
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
})
```

#### 2. Container Components
```typescript
// Use vue/test-utils for complex logic testing
import { mount } from '@vue/test-utils'

test('manages form state correctly', async () => {
  const wrapper = mount(ContactForm)
  
  // Test internal state management
  expect(wrapper.vm.isValid).toBe(false)
  
  await wrapper.find('input[name="email"]').setValue('test@example.com')
  expect(wrapper.vm.isValid).toBe(true)
})
```

#### 3. Nuxt Pages/Layouts
```typescript
// Use @nuxt/test-utils for full Nuxt context
import { mountSuspended } from '@nuxt/test-utils/runtime'

test('page renders with correct meta', async () => {
  const wrapper = await mountSuspended(AboutPage)
  
  // Test with Nuxt features available
  expect(useHead).toHaveBeenCalledWith({
    title: 'About Us'
  })
})
```

### Best Practices

#### 1. Test Organization
```typescript
// Group related tests
describe('UserProfile', () => {
  describe('when user is logged in', () => {
    beforeEach(() => {
      // Setup authenticated state
    })
    
    it('displays user information', () => {})
    it('allows editing profile', () => {})
  })
  
  describe('when user is not logged in', () => {
    it('redirects to login', () => {})
  })
})
```

#### 2. Fixture Management
```typescript
// tests/fixtures/users.ts
export const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
}

export const createMockUser = (overrides = {}) => ({
  ...mockUser,
  ...overrides
})

// In tests
import { createMockUser } from './fixtures/users'

const user = createMockUser({ name: 'Jane Doe' })
```

#### 3. Custom Testing Utilities
```typescript
// tests/utils/render.ts
import { render } from '@testing-library/vue'
import { createPinia } from 'pinia'

export function renderWithProviders(component, options = {}) {
  const pinia = createPinia()
  
  return render(component, {
    global: {
      plugins: [pinia],
      stubs: ['RouterLink', 'NuxtLink']
    },
    ...options
  })
}
```

## Configuration Patterns

### Complete Project Setup

#### 1. Package.json Dependencies
```json
{
  "devDependencies": {
    "@nuxt/test-utils": "^3.8.0",
    "@testing-library/vue": "^8.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@vue/test-utils": "^2.4.0",
    "happy-dom": "^12.10.0",
    "vitest": "^1.0.0"
  }
}
```

#### 2. Vitest Configuration
```typescript
// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
})
```

#### 3. Test Setup File
```typescript
// tests/setup.ts
import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

// Configure Vue Test Utils globally
config.global.stubs = {
  NuxtLink: { template: '<a><slot /></a>' },
  ClientOnly: { template: '<slot />' }
}

// Reset Pinia before each test
beforeEach(() => {
  setActivePinia(createPinia())
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}
```

#### 4. TypeScript Configuration
```typescript
// tests/types.d.ts
import '@testing-library/jest-dom'

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}
```

## Examples and Use Cases

### 1. Testing Composables
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
})
```

### 2. Testing API Integration
```typescript
// tests/components/UserList.test.ts
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import UserList from '~/components/UserList.vue'

// Mock the fetch composable
const mockUseFetch = vi.fn()
mockNuxtImport('useFetch', () => mockUseFetch)

describe('UserList', () => {
  it('displays loading state', async () => {
    mockUseFetch.mockReturnValue({
      data: ref(null),
      pending: ref(true),
      error: ref(null)
    })
    
    const wrapper = await mountSuspended(UserList)
    expect(wrapper.text()).toContain('Loading users...')
  })
  
  it('displays users when loaded', async () => {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]
    
    mockUseFetch.mockReturnValue({
      data: ref(users),
      pending: ref(false),
      error: ref(null)
    })
    
    const wrapper = await mountSuspended(UserList)
    expect(wrapper.text()).toContain('John')
    expect(wrapper.text()).toContain('Jane')
  })
})
```

### 3. Testing Forms with Validation
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
  
  it('submits valid form', async () => {
    const mockSubmit = vi.fn()
    
    await renderSuspended(ContactForm, {
      props: { onSubmit: mockSubmit }
    })
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello world')
    await user.click(screen.getByRole('button', { name: /submit/i }))
    
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      message: 'Hello world'
    })
  })
})
```

### 4. Testing Navigation and Routing
```typescript
// tests/components/Navigation.test.ts
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import Navigation from '~/components/Navigation.vue'

const mockNavigateTo = vi.fn()
mockNuxtImport('navigateTo', () => mockNavigateTo)

describe('Navigation', () => {
  it('navigates to correct routes', async () => {
    const wrapper = await mountSuspended(Navigation)
    
    await wrapper.find('[data-testid="about-link"]').trigger('click')
    expect(mockNavigateTo).toHaveBeenCalledWith('/about')
    
    await wrapper.find('[data-testid="contact-link"]').trigger('click')
    expect(mockNavigateTo).toHaveBeenCalledWith('/contact')
  })
})
```

This comprehensive documentation provides practical examples, configuration patterns, and decision-making guidance for implementing effective testing strategies in Vue and Nuxt applications. The key is to choose the right tool for each testing scenario and maintain consistency across your test suite.