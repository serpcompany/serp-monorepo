# Nuxt Routing Troubleshooting Guide

This document covers common Nuxt routing issues and their solutions, based on official Nuxt documentation and real-world debugging experience.

## Dynamic Routes Not Working

### Problem: Wrong Page Renders for Dynamic Routes

**Symptom:** Visiting `/mcp/test-slug` shows the collection page instead of the detail page.

**Root Cause:** Nuxt routing precedence rules.

### Understanding Routing Precedence

**Rule:** "Named parent routes will take priority over nested dynamic routes."

**Problematic Structure:**
```
pages/
├── mcp.vue              # Takes precedence for ALL /mcp/* routes
└── mcp/
    └── [slug].vue       # Never reached
```

**Result:** All routes starting with `/mcp/` render `pages/mcp.vue`

### Solution: Proper Nested Route Structure

**Correct Structure:**
```
pages/
└── mcp/
    ├── index.vue        # Handles /mcp (collection)
    └── [slug].vue       # Handles /mcp/anything (detail)
```

**Fix:**
```bash
# Move the parent route into the nested directory
mv pages/mcp.vue pages/mcp/index.vue
```

## Server-Side Rendering Issues

### Problem: Hydration Mismatches

**Common Causes:**
- Data fetching differences between server and client
- Browser-specific APIs used during SSR
- Inconsistent state initialization

**Debug Steps:**
1. Enable sourcemaps: `sourcemap: { server: true, client: true }`
2. Use `nuxi dev --inspect` for server-side debugging
3. Check browser console for hydration warnings

## Route Parameter Access

### Accessing Dynamic Parameters

**Correct Methods:**
```typescript
// In script setup
const route = useRoute()
const slug = route.params.slug as string

// In options API  
export default {
  data() {
    return {
      slug: this.$route.params.slug
    }
  }
}
```

### Data Fetching with Dynamic Routes

**Best Practice with useLazyAsyncData:**
```typescript
const { data, pending, error } = await useLazyAsyncData(
  `unique-key-${slug}`,
  () => fetchData(slug)
)
```

**Template Handling:**
```vue
<template>
  <!-- Always handle all states -->
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else-if="data">{{ data }}</div>
</template>
```

## Debugging Techniques

### 1. Route Resolution Debugging

Add to your page component:
```typescript
// Debug current route
console.log('Current route:', useRoute().path)
console.log('Route params:', useRoute().params)
```

### 2. File Structure Verification

```bash
# Check your pages structure
find pages -name "*.vue" | sort
```

### 3. Development Tools

**VS Code Debug Configuration:**
```json
{
  "type": "node",
  "request": "launch", 
  "name": "Nuxt: Server",
  "program": "nuxi",
  "args": ["dev", "--inspect"]
}
```

## Common Patterns and Anti-Patterns

### ✅ Good: Proper Nested Routes
```
pages/
├── blog/
│   ├── index.vue        # /blog
│   └── [slug].vue       # /blog/post-title
└── products/
    ├── index.vue        # /products  
    └── [id].vue         # /products/123
```

### ❌ Bad: Parent Route Conflicts
```
pages/
├── blog.vue             # Conflicts with blog/* routes
├── blog/
│   └── [slug].vue       # Never reached
```

### ✅ Good: Multiple Dynamic Segments
```
pages/
└── users/
    └── [id]/
        ├── index.vue    # /users/123
        └── edit.vue     # /users/123/edit
```

## Key Takeaways

1. **Precedence Rule:** Parent routes always take priority over nested dynamic routes
2. **Structure Matters:** Use `folder/index.vue` + `folder/[param].vue` pattern
3. **Debug Early:** Use `console.log` and dev tools to verify route resolution
4. **Handle States:** Always handle loading, error, and success states in templates
5. **Unique Keys:** Use unique keys in `useLazyAsyncData` with dynamic parameters

## Type Generation Issues

### Problem: Component Resolution Warnings

**Symptoms:**
```
WARN [Vue warn]: Failed to resolve component: UApp
WARN [Vue warn]: Component <Anonymous> is missing template or render function
WARN [nuxt] Your project has pages but the <NuxtPage /> component has not been used
```

**Root Cause:** Missing auto-import type generation

**Solution:**
```bash
npx nuxi prepare
```

**Why This Happens:**
- Nuxt auto-generates `.nuxt/imports.d.ts` and `.nuxt/components.d.ts`
- These files declare types for auto-imports and component resolution
- Without running `nuxi prepare`, `nuxi dev`, or `nuxi build`, TypeScript and Vue can't resolve components
- This causes both development warnings and potential runtime issues

**Verification:**
Check that `.nuxt/components.d.ts` contains NuxtUI components like:
```typescript
'UContainer': typeof import(".../@nuxt/ui/.../Container.vue")['default']
'NuxtLayout': typeof import("...nuxt/.../nuxt-layout")['default']
```

## Quick Checklist

When dynamic routes aren't working:

- [ ] **Run `npx nuxi prepare`** to generate missing types
- [ ] Check for parent route conflicts (`parent.vue` vs `parent/[param].vue`)
- [ ] Verify file naming (`[slug].vue` not `[slug.vue]`)
- [ ] Confirm route parameter access (`useRoute().params.slug`)
- [ ] Add loading/error state handling in template
- [ ] Test with `nuxi dev --inspect` for server-side issues
- [ ] Check browser console for hydration warnings