---
description: UI Best Practices
globs: packages/ui/**/*.ts
alwaysApply: true
---

# Building UI with NuxtUI + NuxtUI Pro

Our project uses NuxtUI Pro (which includes the regular NuxtUI component library). Anytime we are working on UI (creating or editing) we want to always start by trying to solve our implementing with using a component, or combination of components) from the NuxtUI Pro libraries.

- Always consult the most recent documentation before building anything, as component libraries frequently update.
- Use the NuxtUI Pro built-in design tokens, API, and themeing before reaching for anything custom. The only time we should be creating our own components without utilizing something from NuxtUI Pro is when we absolutely cannot achieve our goal using the pre-built components & layouts that NuxtUI Pro provides.
- Use Tailwind CSS 4
- Follow Tailwind CSS class naming conventions and utility patterns
- Implement mobile-first responsive design with Tailwind breakpoints
- Maintain consistent spacing and layout using Tailwind's spacing scale
- Use Nuxt UI's color system for consistent theming
- Implement dark mode support using Tailwind's dark variant
- Ensure components are accessible following WCAG 2.2 guidelines
- Keep component styles modular and reusable
- Optimize component bundle size through proper code splitting
- Refactor components into their own files as files get large

When doing any styling, always respect this order of operations:
1. First try to use any built-in design tokens or native styling options that NuxtUI provides
2. Only if we cannot acheive what we want with native NuxtUI opations, are you allowed to use Tailwind Utility Classes
3. Only if we cannot achieve what we want with Tailwind Utility classes are you allowed to do any styling inside the SFC (single file component) inside a `<style scoped>` section


## Guidelines
- Always reference other existing project UI (components/pages/etc.) to ensure consistency in style and values across the project.
- Everything must be mobile responsive and darkmode compatible.
- Use Tailwind classes over custom CSS, make sure to follow Tailwind V4 & Nuxt UI Pro tailwind implementation preferences
- Use `<script setup lang="ts">`
- Use the Composition API
- Nuxt auto imports almost everything, dont add unnecessary imports


