# SERP Shared Configurations

This package contains centralized configuration files for use across the SERP monorepo.

## Available Configurations

### ESLint Configuration

The ESLint configuration provides a consistent linting setup across all projects:

```javascript
// eslint.config.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import withNuxt from './.nuxt/eslint.config.mjs';
import { createConfig } from '@serp/configs/eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create the ESLint config
const baseConfig = createConfig({
  baseDirectory: __dirname
});

// Override specific rules if needed
baseConfig[1].rules = {
  ...baseConfig[1].rules,
  // App-specific rule overrides
  'no-unused-vars': 'error'
};

export default withNuxt(baseConfig);
```

[More details on ESLint setup](./eslint/README.md)

### Prettier Configuration

The Prettier configuration provides a consistent code formatting setup:

```javascript
// .prettierrc.js
const { extendConfig } = require('@serp/configs/prettier');

module.exports = extendConfig({
  // App/package-specific customizations (if any)
});
```

[More details on Prettier setup](./prettier/README.md)

## Usage

Make sure your package has the following dependencies:
   
```json
"devDependencies": {
  "@serp/configs": "workspace:^"
}
```
