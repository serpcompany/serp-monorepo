// @ts-check
// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import baseConfig from "../../eslint.config.mjs";

export default withNuxt(baseConfig);
import { fileURLToPath } from 'node:url';
import { createConfig } from '../../../../eslint.config.mjs';
import withNuxt from './.nuxt/eslint.config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create base config first
const baseConfig = createConfig({
  quiet: false,
  additionalRules: {},
  additionalIgnores: [],
  baseDirectory: __dirname
});

// Apply our overrides
baseConfig[1].rules = {
  ...baseConfig[1].rules,
  'no-unused-vars': 'off',
  'vue/no-setup-props-destructure': 'off'
};

export default withNuxt(baseConfig);
