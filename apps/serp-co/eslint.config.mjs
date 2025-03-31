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
