# Nuxt Tips Collection

**By Michael Thiessen**

[@MichaelThiessen](https://twitter.com/MichaelThiessen) | [michaelnthiessen.com](https://michaelnthiessen.com)

---

## Introduction

Hey there!

After writing two editions of the Vue Tips Collection books and creating the Mastering Nuxt course, I had to turn my attention to a Nuxt book!

This book is a collection of short, concise tips on using Nuxt better, because dedicating hours to learning isn't always possible (or easy).

But 5 minutes a day, reading a tip here and there, is much more manageable!

I spent weeks scouring the documentation, trying out new features and learning things the docs don't tell you about, and compiling it into this book you're now reading.

I hope you enjoy the book!

— Michael

---

## Table of Contents

### 1. Component Chronicles
*Learn all about custom and built-in components.*

1. [Keep Page Component Between Routes](#1-keep-page-component-between-routes)
2. [DevOnly Component](#2-devonly-component)
3. [Client Only Component](#3-client-only-component)
4. [Client Component Caveats](#4-client-component-caveats)
5. [Lazy Loading (and code splitting) components](#5-lazy-loading-and-code-splitting-components)
6. [Global Components](#6-global-components)
7. [NuxtLink Basics](#7-nuxtlink-basics)
8. [Use NuxtLink to open links in a new tab](#8-use-nuxtlink-to-open-links-in-a-new-tab)
9. [Prefetch Pages with NuxtLink](#9-prefetch-pages-with-nuxtlink)
10. [Custom NuxtLink Component](#10-custom-nuxtlink-component)
11. [Layout Components](#11-layout-components)
12. [Layout fallbacks](#12-layout-fallbacks)
13. [Dynamic Layouts](#13-dynamic-layouts)
14. [When to use a layout (instead of pages or components)](#14-when-to-use-a-layout-instead-of-pages-or-components)
15. [Using NuxtImg to compress images](#15-using-nuxtimg-to-compress-images)
16. [The App Component](#16-the-app-component)

### 2. Composable Chaos
*Built-in composables, custom composables, and all the ways you can use them.*

17. [Create Your Own Keyed Composable](#17-create-your-own-keyed-composable)
18. [Using useHead](#18-using-usehead)
19. [callOnce](#19-callonce)
20. [How useFetch is sync and async](#20-how-usefetch-is-sync-and-async)
21. [Using useState for client-side state sharing](#21-using-usestate-for-client-side-state-sharing)
22. [Using onNuxtReady](#22-using-onnuxtready)
23. [Using useNuxtApp and tryUseNuxtApp](#23-using-usenuxtapp-and-tryusenuxtapp)
24. [Loading API](#24-loading-api)

### 3. Routing Rituals
*Really important tips so you don't get lost.*

25. [File Based Routing Precedence](#25-file-based-routing-precedence)
26. [Nested pages are like nested folders](#26-nested-pages-are-like-nested-folders)
27. [Using navigateTo](#27-using-navigateto)
28. [Inline Route Validation](#28-inline-route-validation)
29. [Page Alias](#29-page-alias)
30. [Scroll to the top on page load](#30-scroll-to-the-top-on-page-load)
31. [Reactive Routes](#31-reactive-routes)
32. [Using useRoute](#32-using-useroute)
33. [Client-side redirects](#33-client-side-redirects)
34. [Redirecting using route rules](#34-redirecting-using-route-rules)
35. [Route Middleware Basics](#35-route-middleware-basics)
36. [Redirecting in route middleware](#36-redirecting-in-route-middleware)
37. [Define Slot on NuxtPage](#37-define-slot-on-nuxtpage)

### 4. Data Fetching Fortune
*Efficiently fetching data and improving performance.*

38. [Using useFetch](#38-using-usefetch)
39. [Using useAsyncData](#39-using-useasyncdata)
40. [Dedupe fetches](#40-dedupe-fetches)
41. [The key to data fetching](#41-the-key-to-data-fetching)
42. [Prefetching Components](#42-prefetching-components)

### 5. SSR Solutions
*Tools for taking advantage of server-side rendering.*

43. [Vue vs. Nitro Execution](#43-vue-vs-nitro-execution)
44. [Skip code on the server or client](#44-skip-code-on-the-server-or-client)
45. [Using useState for server rendered data](#45-using-usestate-for-server-rendered-data)
46. [NuxtClientFallback component](#46-nuxtclientfallback-component)
47. [SSR Safe Directives](#47-ssr-safe-directives)
48. [SSR Payload](#48-ssr-payload)

### 6. Nitro Nuances
*Never forget Nitro, the back end framework powering Nuxt.*

49. [Creating server routes](#49-creating-server-routes)
50. [Server route return values](#50-server-route-return-values)
51. [Getting data into server routes](#51-getting-data-into-server-routes)
52. [Reading a Request Body](#52-reading-a-request-body)
53. [Query Params in Server Routes](#53-query-params-in-server-routes)
54. [Getting request headers](#54-getting-request-headers)
55. [Server Routes and HTTP Methods](#55-server-routes-and-http-methods)
56. [Server Middleware](#56-server-middleware)
57. [Server-side redirects](#57-server-side-redirects)
58. [Understanding Universal Rendering](#58-understanding-universal-rendering)
59. [Cookies and SSR](#59-cookies-and-ssr)
60. [Building a Basic Link Shortener](#60-building-a-basic-link-shortener)
61. [Built-in Storage with Unstorage](#61-built-in-storage-with-unstorage)

### 7. Configuration Coordination
*Dive into discovering different and diverse configuration options.*

62. [Auto Imports](#62-auto-imports)
63. [Disable auto-imports](#63-disable-auto-imports)
64. [Environment Config Overrides](#64-environment-config-overrides)
65. [Tree Shake Composables](#65-tree-shake-composables)
66. [.nuxtignore](#66-nuxtignore)
67. [Global CSS](#67-global-css)
68. [Pre-render Some Routes](#68-pre-render-some-routes)
69. [Using appConfig](#69-using-appconfig)
70. [Using runtimeConfig](#70-using-runtimeconfig)
71. [Where should config values go?](#71-where-should-config-values-go)
72. [Using /public](#72-using-public)
73. [Using /assets](#73-using-assets)
74. [Where do you put that asset?](#74-where-do-you-put-that-asset)

### 8. Layer Lollapalooza
*Better organize your Nuxt app with layers.*

75. [Layer Basics](#75-layer-basics)
76. [Importing Between Layers](#76-importing-between-layers)
77. [Naming Collisions Between Layers](#77-naming-collisions-between-layers)
78. [Pages from Layers](#78-pages-from-layers)
79. [Separate Config Per Layer](#79-separate-config-per-layer)
80. [Private Components in Layers](#80-private-components-in-layers)

### 9. Module Mechanics
*Many tips on the best way to extend your Nuxt app.*

81. [Official vs Community Modules](#81-official-vs-community-modules)
82. [Creating Local Modules](#82-creating-local-modules)
83. [Module runtime directory](#83-module-runtime-directory)
84. [Module Hooks](#84-module-hooks)

### 10. Plugin Proficiency
*Deftly modify the runtime behaviour of Vue and Nitro.*

85. [Plugin Basics](#85-plugin-basics)
86. [What's the deal with all these hooks?](#86-whats-the-deal-with-all-these-hooks)
87. [Nitro Plugins](#87-nitro-plugins)
88. [Nitro Hooks](#88-nitro-hooks)
89. [Parallel Plugins](#89-parallel-plugins)
90. [Nuxt Plugin Dependencies](#90-nuxt-plugin-dependencies)
91. [Server Only (and Client Only) Plugins](#91-server-only-and-client-only-plugins)

### 11. Server Components
*No JS? No problem! At least, for these components.*

92. [NuxtIsland Component](#92-nuxtisland-component)
93. [Interactive Components Within Server Components](#93-interactive-components-within-server-components)
94. [Paired Server Components](#94-paired-server-components)
95. [Slots and Server Components](#95-slots-and-server-components)
96. [Server Component Fallback](#96-server-component-fallback)
97. [Client only and server only pages](#97-client-only-and-server-only-pages)

### 12. Error Essentials
*All about creating, handling, and understanding errors.*

98. [Debug hydration errors in production](#98-debug-hydration-errors-in-production)
99. [Throwing errors the right way](#99-throwing-errors-the-right-way)
100. [Custom error pages](#100-custom-error-pages)
101. [Handling client-side errors](#101-handling-client-side-errors)
102. [When to use Error Boundaries](#102-when-to-use-error-boundaries)
103. [Handling errors](#103-handling-errors)
104. [Global Errors vs. Client-side Errors](#104-global-errors-vs-client-side-errors)
105. [Errors in route middleware](#105-errors-in-route-middleware)

### 13. Testing Tactics
*it('would be a failure if I didn't assert the importance of tests in this book somewhere')*

106. [Easy Unit Testing](#106-easy-unit-testing)
107. [Mount Components When Testing](#107-mount-components-when-testing)
108. [Mock Any Import for Testing](#108-mock-any-import-for-testing)
109. [Mock Components When Testing](#109-mock-components-when-testing)
110. [Easily Mock API Routes in Nuxt](#110-easily-mock-api-routes-in-nuxt)

### 14. Other Observations
*a.k.a the tidbits I couldn't easily fit into other chapters.*

111. [Custom Prose Components](#111-custom-prose-components)
112. [Flatten Nuxt Content Routes](#112-flatten-nuxt-content-routes)
113. [Nuxt Content Queries](#113-nuxt-content-queries)
114. [Different Kinds of Utilities](#114-different-kinds-of-utilities)
115. [Using OAuth](#115-using-oauth)
116. [Authentication vs. Authorization](#116-authentication-vs-authorization)
117. [Hooking into Hydration](#117-hooking-into-hydration)
118. [Advanced Hydration with onPreHydrate](#118-advanced-hydration-with-onprehydrate)

### 15. Code Demos
*Dive deeper into Nuxt through these interactive code repos.*

1. [Server Components](#server-components)
2. [Layers](#layers)
3. [Keyed Composables](#keyed-composables)
4. [Routing Precedence](#routing-precedence)
5. [Keeping Pages Alive](#keeping-pages-alive)
6. [Hooks and hydration](#hooks-and-hydration)
7. [Prefetching Components](#prefetching-components-demo)

---

## 1. Component Chronicles

*Learn all about custom and built-in components.*

### 1. Keep Page Component Between Routes

Normally when a page change happens, the components are destroyed and recreated. We can keep a component "running" by using the `keepalive` property, so Nuxt will wrap it in the `<KeepAlive>` component for us.

Let's say we have this page that continually counts up:

```vue
// ~/pages/count.vue
<template>
  {{ count }}
</template>

<script setup>
const count = ref(0);

onMounted(() => {
  setInterval(() => count.value++, 1000);
});
</script>
```

Every time we navigate away from and back to `/count`, this component is re-created, resetting our count back to zero each time.

If you set the `keepalive` property on the `NuxtPage` component, it will preserve the state of all the child components:

```vue
// app.vue
<template>
  <NuxtPage keepalive />
</template>
```

Now, if we switch away, the component will not be destroyed, and will continue to count up even while we're on other pages. It will only be destroyed on a full page reload.

This also works for child routes, as long as the parent component that is rendering the `NuxtPage` with the `keepalive` isn't destroyed by a page change itself.

We can also set the `keepalive` property in `definePageMeta` instead of specifying it on the `NuxtPage` component, which will keep all child pages alive:

```vue
<template>
  <div>
    Keepin it alive.
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  keepalive: true,
});
</script>
```

Lastly, all child pages that have `keepalive` set to `true` in their `definePageMeta` will have their state preserved when switching between them, regardless of what's happening on the `NuxtPage` component or in the parent page (if there is any).

### 2. DevOnly Component

Sometimes you need some extra debug info or meta data displayed during development but not included in your actual production app:

```vue
// layouts/default.vue
<template>
  <div>
    <DevAccountSwitcher />
    <slot />
  </div>
</template>
```

For example, you might want to switch between test accounts, quickly update database values or modify other things directly. Of course, you don't want your end users to be able to do this!

The component works as you'd expect, whatever you wrap is only in your dev build:

```vue
// layouts/default.vue
<template>
  <div>
    <DevOnly>
      <DevAccountSwitcher />
    </DevOnly>
    <slot />
  </div>
</template>
```

We also can use a `#fallback` slot that renders only in production builds, if you need that functionality:

```vue
// layouts/default.vue
<template>
  <div>
    <DevOnly>
      <DevAccountSwitcher />
      <template #fallback>
        <div>This is rendered only in the production build.</div>
      </template>
    </DevOnly>
    <slot />
  </div>
</template>
```

### 3. Client Only Component

You can have a section of your component rendered only on the client-side, using the `<ClientOnly>` component:

```vue
<template>
  <div>
    <p>A regular component rendered on the server and client.</p>
    <ClientOnly>
      <p>But this part shouldn't be rendered on the server</p>
      <WillBreakOnTheServer />
    </ClientOnly>
  </div>
</template>
```

The content in the default slot is actually tree-shaken out of your server build, to keep things a little more performant.

We can also specify a `#fallback` slot that will render content on the server. Useful for including a loading state to be shown during hydration:

```vue
<template>
  <div>
    <p>A regular component rendered on the server and client.</p>
    <ClientOnly>
      <p>But this part shouldn't be rendered on the server</p>
      <WillBreakOnTheServer />
      <template #fallback>
        <Spinner>
          Just give me a moment while I load some things.
        </Spinner>
      </template>
    </ClientOnly>
  </div>
</template>
```

### 4. Client Component Caveats

Client components are useful when doing paired server components or just on their own, using the `*.client.vue` suffix. However, we need to keep a couple things in mind.

First, because Nuxt is wrapping these components in the `<ClientOnly>` component for us, they must be auto-imported or imported manually through `#components`. Otherwise, they will be imported as regular Vue components.

Second, since they aren't rendered on the server, there is no HTML until they are mounted and rendered. This means we have to wait a tick before accessing the template:

```vue
// ~/components/CoolComponent.client.vue
<template>
  <div ref="container">
    <!-- Do some cool stuff here -->
  </div>
</template>

<script setup>
const container = ref(null);

onMounted(async () => {
  // Nothing has been rendered yet
  console.log(container.value); // -> null
  
  // Wait one tick for the render
  await nextTick();
  
  // Now we can access it!
  console.log(container.value) // -> <div ...>
});
</script>
```

### 5. Lazy Loading (and code splitting) components

Not all your components need to be loaded immediately.

With Nuxt we can defer loading by adding `Lazy` as a prefix. Nuxt does all the heavy-lifting for us!

```vue
<!-- Loads as soon as possible -->
<Modal v-if="showModal" />

<!-- Only loads when showModal = true -->
<LazyModal v-if="showModal" />
```

It will automatically split the code for this component into it's own bundle, and it'll only be loaded once the `v-if` is `true`. This is great to save loading components that are only sometimes needed.

### 6. Global Components

Global components get their own async chunk, meaning they can be loaded separately from your main client-side bundle.

You can either have them load once everything else on the page is loaded, or only load them when you know you'll need them. This makes your page lighter, and your initial page load faster.

By default, all components inside of `~/components/global` will be auto-imported and made global.

You can also make any component global by adding the `*.global.vue` suffix.

You can also configure any folder to be imported as global:

```javascript
export default defineNuxtConfig({
  components: [
    // Keep the default component folder
    '~/components',
    // Add in a custom global folder,
    {
      path: '~/globalComponents',
      global: true,
    },
  ],
});
```

### 7. NuxtLink Basics

The `NuxtLink` component is a workhorse, giving us access to the benefits of Universal Rendering without any extra effort.

It will automatically do client-side navigation and prefetch resources — keeping your site super fast!

It's a drop-in replacement for any anchor tags:

```vue
<!-- Using an anchor tag -->
<a href="/articles">Articles</a>

<NuxtLink href="/articles">Articles</NuxtLink>
```

Although instead of using `href`, the `to` prop is preferred:

```vue
<!-- Using an anchor tag -->
<a href="/articles">Articles</a>

<NuxtLink to="/articles">Articles</NuxtLink>
```

It also works with external links, automatically adding in `noopener` and `noreferrer` attributes for security:

```vue
<!-- Using an anchor tag -->
<a href="www.masteringnuxt.com" rel="noopener noreferrer">
  Mastering Nuxt
</a>

<NuxtLink to="www.masteringnuxt.com">
  Mastering Nuxt
</NuxtLink>
```

In some cases `NuxtLink` may not detect that the link is an external one, so you can tell it explicitly using the `external` prop:

```vue
<NuxtLink
  to="www.masteringnuxt.com"
  external
>
  Mastering Nuxt
</NuxtLink>
```

This often happens when a redirect goes to an external URL, since `NuxtLink` has no knowledge of where the redirect is going.

This component uses the `RouterLink` component from Vue Router internally, so there are lots of other props you can use to customize behaviour.

### 8. Use NuxtLink to open links in a new tab

If you want your link to open in a new tab (or window, depending on how the user's browser works), you can use the `target` attribute:

```vue
<NuxtLink
  to="/articles"
  target="_blank"
>
  Mastering Nuxt 3
</NuxtLink>
```

In fact, since it's a wrapper for the `RouterLink` component from Vue Router, which renders an `a` tag by default, we can add on any of the attributes that an anchor element supports.

### 9. Prefetch Pages with NuxtLink

With internal links, `NuxtLink` can check to see if it's in the viewport in order so it can preload data **before** you even need it:

```vue
<NuxtLink to="/articles" prefetch>Articles</NuxtLink>
```

This behaviour is on by default, so you don't even need to worry about it most of the time. But the prop is helpful if you need to **disable** it for some reason:

```vue
<NuxtLink to="/articles" :prefetch="false">Articles</NuxtLink>
