# Nuxt Layouts

**What are Layouts?**
- Layouts are Vue components with special properties that allow sharing code more easily between different pages
- They help organize code by allowing common elements (like headers, footers, and shared styling) to be shared across multiple pages, preventing redundancy
- Layouts offer extra features like dynamic updates, transitions between layouts, and deep integrations with Nuxt content

**Performance Benefits**

## 🚀 Code Reusability & Bundle Size Reduction
- **Shared Components**: Headers, footers, and navigation are defined once and reused across multiple pages
- **Reduced Duplication**: Eliminates need to import and add mandatory components on each page
- **Smaller Bundle**: Shared layout components are loaded once and cached
- Using layouts avoids shipping extra code to users
- Reduces the need to mount and remount the same elements when switching pages

## 🔧 Automatic Component Optimization
- **Asynchronous Loading**: Components in layouts are automatically loaded via async imports
- **Auto-imports**: Layout components are automatically available without explicit imports
- **Tree Shaking**: Unused components are excluded from production builds

## ⚡ Caching Strategies
- **Layout Caching**: Nuxt caches layout components by default for improved performance
- **Server-Side Caching**: Can cache full responses with configurable TTL (Time To Live)
- **Reverse Proxy Caching**: Works with CDNs and reverse proxies for faster delivery
- **Background Regeneration**: Serves cached content while regenerating in background

## 🖥️ Server-Side Rendering (SSR) Benefits
- **Faster Initial Load**: Layouts are rendered server-side for immediate display
- **SEO Optimization**: Complete HTML content delivered for better search indexing
- **Progressive Enhancement**: JavaScript enhances already-rendered layouts

## ⏳ Delayed Hydration Support
- **Selective Hydration**: Non-critical layout components can use delayed hydration
- **Performance Prioritization**: Focus on above-the-fold content first
- **Reduced JavaScript Load**: Components hydrate only when needed

## 🛠️ Development & Maintenance Benefits
- **Consistent Structure**: Enforces consistent layout patterns across pages
- **Centralized Management**: Single place to update headers, footers, navigation
- **Type Safety**: Better TypeScript support and component validation
- Improves overall application performance

**Convention Over Components**
- While components can also share common functionality, using layouts follows Nuxt conventions
- This makes apps easier to understand and navigate for developers familiar with Nuxt
- Headers and footers typically belong in layouts rather than components

**Creating and Using Layouts**
- A default layout can be created in the Layouts folder and applied across pages for consistent styling (like background colors)
- Custom layouts can be created with different styles (e.g., blue background) and applied to specific pages
- The `definePageMeta` composable can be used to dynamically change layouts on a page-by-page basis
- Layouts can be specified to not render at all or to use custom styles

**Dynamic and Reactive Features**
- Layouts can update reactively with changes in variables, allowing for dynamic styling changes
- Supports transitions between different layouts
- Provides deep integration with Nuxt's content system

**When to Use Layouts**
- Follow the "Rule of Three" - wait until something appears about 3 times before creating a layout abstraction
- Use layouts when you notice commonalities across different pages
- Ideal for code that you'd expect to be shared across pages

**Layouts vs Components**
- **Layouts do multiple things**: combine headers, footers, styling, and page rendering
- **Components do one thing**: play a video, render a button, etc.
- When in doubt, ask: "Where would I expect to find this code?"

**Development Approach**
1. Start by putting code directly in pages - just get it working
2. As patterns emerge across pages, pull out commonalities into layouts
3. For smaller, self-contained pieces of functionality, extract them into components
4. Refactor incrementally as your app grows in complexity
5. Layouts provide a structured approach to managing different page styles and common functionalities

**Best Practice**
- You can identify potential layout needs from design mockups, but don't have to create layouts upfront
- It's perfectly fine to refactor and move code from pages to layouts as your app grows
- Organization decisions come with experience - there are no hard and fast rules

## 🏗️ Project Implementation Example

Our playbooks.com clone correctly implements these performance benefits:

```vue
<!-- app.vue - Global wrapper -->
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<!-- layouts/default.vue - Shared layout -->
<template>
  <div class="min-h-screen bg-white dark:bg-zinc-900">
    <ClientOnly><LayoutAppHeader /></ClientOnly>
    <main class="flex-1"><slot /></main>
    <ClientOnly><LayoutAppFooter /></ClientOnly>
  </div>
</template>
```

This structure provides optimal performance by:
- ✅ Sharing header/footer across all pages
- ✅ Using ClientOnly for non-critical components  
- ✅ Proper UApp placement for NuxtUI optimization
- ✅ Clean separation of layout vs page content

## ⚠️ Common Performance Pitfalls
- **Avoid duplicate UApp wrappers**: Only use `<UApp>` in app.vue, not in layouts
- **Layout re-rendering**: When layout changes, all components under the layout render again
- **Critical content first**: Don't use delayed hydration for above-the-fold content
- **Caching considerations**: Be mindful of dynamic content that shouldn't be cached