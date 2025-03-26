// @ts-check
const { extendConfig } = require('./index.js');

// Extend the base Prettier config with app-specific options (if any)
module.exports = extendConfig({
  // App-specific customizations go here
  // For example:
  // semi: false,
  // printWidth: 100
});
