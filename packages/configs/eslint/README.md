# SERP ESLint Configuration

Centralized ESLint configuration for the SERP monorepo.

## Usage

In your Nuxt app or package, create an `eslint.config.js` (or `.mjs`) file with the following content:

```js
// eslint.config.js or eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'; // Nuxt-generated config
import { createConfig } from '@serp/eslint-config';

// Create config with project-specific customizations
const baseConfig = createConfig({
  // Set to true to disable no-unused-vars in terminal output
  // but still see them as warnings in your editor
  quiet: true,
  
  // Project-specific ignores
  additionalIgnores: [
    '**/.nuxt',
    '**/dist',
    '**/node_modules'
    // Add any project-specific directories to ignore
  ],
  
  // Project-specific rule overrides
  additionalRules: {
    // Add any project-specific rule customizations
    // For example:
    // 'vue/multi-word-component-names': 'off'
  }
});

// Export the final config
export default withNuxt(baseConfig);
```

## Options

- `quiet` (boolean): When set to `true`, disables no-unused-vars warnings. Useful when you want to see these in your editor but not in lint output.
- `additionalRules` (object): Extra ESLint rules to add or override.
- `additionalIgnores` (array): Additional file patterns to ignore.

## How it Works

The configuration is composed of:

1. A base configuration with standard rules for Vue/Nuxt projects
2. Options to customize the configuration for specific projects
3. Support for quiet mode to suppress warnings in terminal output while keeping them visible in your editor

This approach allows us to:
- Maintain consistent rules across the monorepo
- Customize rules for specific apps or packages
- Toggle certain rule behaviors like quiet mode for unused variables 
