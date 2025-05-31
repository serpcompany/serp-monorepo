# ClientOnly Component Best Practices

This document outlines when to use Nuxt's `ClientOnly` component correctly and common misuses that hurt SEO and performance.

## What ClientOnly Actually Does

`ClientOnly` **prevents server-side rendering** of wrapped components, making them render only on the client side after hydration.

**❌ Common Misconception:** "ClientOnly = Lazy Loading"
**✅ Reality:** ClientOnly skips SSR, lazy loading defers component loading until needed

## When to Use ClientOnly

### ✅ Valid Use Cases

**1. Browser API Dependencies**
```vue
<ClientOnly>
  <MapComponent />  <!-- Uses window.google.maps -->
</ClientOnly>
```

**2. Third-Party Libraries Without SSR Support**
```vue
<ClientOnly>
  <ChartWidget />  <!-- Uses Chart.js that breaks during SSR -->
</ClientOnly>
```

**3. Hydration Mismatch Prevention**
```vue
<ClientOnly>
  <TimestampDisplay />  <!-- Server/client timezone differences -->
</ClientOnly>
```

**4. Random Values or Dynamic Content**
```vue
<ClientOnly>
  <RandomQuote />  <!-- Math.random() differs server vs client -->
</ClientOnly>
```

**5. User-Specific Content**
```vue
<ClientOnly>
  <UserPreferences />  <!-- Requires localStorage access -->
</ClientOnly>
```

### ❌ When NOT to Use ClientOnly

**1. Standard Vue/NuxtUI Components**
```vue
<!-- ❌ WRONG: Hurts SEO -->
<ClientOnly>
  <UButton>Click me</UButton>
</ClientOnly>

<!-- ✅ CORRECT: SSR-compatible -->
<UButton>Click me</UButton>
```

**2. Static Content**
```vue
<!-- ❌ WRONG: No reason to skip SSR -->
<ClientOnly>
  <div class="hero-section">
    <h1>Welcome</h1>
    <p>This is static content</p>
  </div>
</ClientOnly>

<!-- ✅ CORRECT: Let it render on server -->
<div class="hero-section">
  <h1>Welcome</h1>
  <p>This is static content</p>
</div>
```

**3. NuxtImg with Lazy Loading**
```vue
<!-- ❌ WRONG: NuxtImg has built-in SSR support -->
<ClientOnly>
  <NuxtImg src="/image.jpg" loading="lazy" />
</ClientOnly>

<!-- ✅ CORRECT: SSR-compatible with lazy loading -->
<NuxtImg src="/image.jpg" loading="lazy" />
```

## Performance Impact

### Using ClientOnly Incorrectly

**SEO Issues:**
- Content not included in initial HTML
- Search engines can't index the content
- Slower time to first contentful paint

**Performance Issues:**
- Flash of missing content during hydration
- Delayed rendering of components
- Poor Core Web Vitals scores

**User Experience:**
- Content appears after JavaScript loads
- Potential layout shifts
- Slower perceived performance

### Using ClientOnly Correctly

**Benefits:**
- Prevents hydration mismatches
- Avoids SSR errors with browser-only libraries
- Handles environment-specific content gracefully

## Real-World Examples

### Issue #65 Analysis

**Before (Incorrect):**
```vue
<!-- ❌ WRONG: These components are SSR-compatible -->
<ClientOnly>
  <DemoSection />     <!-- Static content with NuxtImg -->
</ClientOnly>
<ClientOnly>
  <CommunitySection /> <!-- UCard, UButton - all SSR-compatible -->
</ClientOnly>
```

**After (Correct):**
```vue
<!-- ✅ CORRECT: Better SEO and performance -->
<DemoSection />
<CommunitySection />
```

**Result:**
- ✅ Content in initial HTML (better SEO)
- ✅ Faster rendering
- ✅ No hydration flash

## Alternatives to ClientOnly

### 1. Proper Lazy Loading with Nuxt 3

```vue
<!-- Use actual lazy loading instead of ClientOnly -->
<script setup>
const LazyComponent = defineAsyncComponent(() => 
  import('~/components/HeavyComponent.vue')
)
</script>

<template>
  <LazyComponent />
</template>
```

### 2. Nuxt's Built-in Lazy Hydration

```vue
<!-- Hydrate when component becomes visible -->
<template>
  <div hydrate-on-visible>
    <HeavyComponent />
  </div>
</template>
```

### 3. Conditional Rendering

```vue
<script setup>
const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})
</script>

<template>
  <ComponentThatNeedsBrowser v-if="isClient" />
</template>
```

## Debugging ClientOnly Issues

### 1. Check Component Dependencies
```bash
# Search for browser APIs in components
grep -r "window\.|document\.|localStorage" components/
```

### 2. Test Without ClientOnly
1. Remove ClientOnly wrapper
2. Check for hydration warnings in browser console
3. Test server-side rendering works correctly

### 3. Verify SSR Compatibility
```bash
# Build and check for SSR errors
npm run build
```

## Quick Audit Checklist

When reviewing ClientOnly usage:

- [ ] Does component use browser-only APIs?
- [ ] Does component import third-party libraries without SSR support?
- [ ] Does component content differ between server and client?
- [ ] Would removing ClientOnly break functionality?
- [ ] Is this component actually static content?

## Migration Guide

### Removing Unnecessary ClientOnly

1. **Identify candidates** for removal (static content, standard components)
2. **Test locally** by removing ClientOnly wrapper
3. **Check for warnings** in browser console
4. **Verify functionality** works the same
5. **Commit changes** with improved SEO/performance

### Adding Missing ClientOnly

1. **Identify hydration mismatches** in browser console
2. **Check for browser API usage** in components
3. **Add ClientOnly** only around problematic components
4. **Consider alternatives** like conditional rendering

## Key Takeaways

1. **ClientOnly ≠ Lazy Loading** - It prevents SSR, not deferred loading
2. **Less is more** - Only use when absolutely necessary
3. **SEO matters** - Unnecessary ClientOnly hurts search rankings
4. **Test thoroughly** - Always verify components work without ClientOnly first
5. **Document reasons** - If you must use ClientOnly, comment why

Remember: Every ClientOnly wrapper should have a clear, technical justification for why SSR would break or cause issues.