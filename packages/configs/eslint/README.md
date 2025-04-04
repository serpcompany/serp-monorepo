# README

This contains a central eslint.config.mjs file with the base/default eslint config settings that each of the `apps/` and `packages/` extend from.

Each of the `apps/` and `packages/` needs to have their own `eslint.config.mjs` file in them which extends these base settings and also imports the `.nuxt/` eslint settings of that individual app or package.

An example of that file is here:

```javascript
// eslint.config.mjs (app/package level)
// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import withNuxt from './.nuxt/eslint.config.mjs';
import { createConfig } from '../../packages/configs/eslint/eslint.config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/// Create base config first
const baseConfig = createConfig({
  quiet: false,
  additionalRules: {},
  additionalIgnores: [],
  baseDirectory: __dirname
});

// Apply our overrides to ensure they take precedence
baseConfig[1].rules = {
  ...baseConfig[1].rules
  // 'no-unused-vars': 'error',
};

export default withNuxt(baseConfig);
```

## How to use

You can add "global/default" eslint settings to this packages `eslint.config.mjs` file. or you can add app/package specific settings to their respestive `eslint.config.mjs` files.

> Note: If running a command at top level (ie through turbo) make sure you run turbo with no cache to test it using the ``--force` clag on the command, like `pnpm lint --force`

## eslint ignore rules you might need to use inline


You can use these solo, or comma separated like:

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars


**eslint inline rules for .js / .ts files**
```
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line @typescript-eslint/no-unused-vars
```

**eslint rules for .vue files**

```
<!-- eslint-disable-next-line vue/no-v-html -->
```

### disable rules for an entire file

**eslint rules for .js / .ts files**
```ts
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
```
