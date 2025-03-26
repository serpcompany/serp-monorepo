/**
 * Helper utility to extend the base Prettier configuration
 * @param {Object} options - Custom options to extend the base config
 * @returns {Object} - Extended Prettier configuration
 */
function extendConfig(options = {}) {
  const baseConfig = require('./prettierrc.json');
  return { ...baseConfig, ...options };
}

/**
 * Path to the base .prettierignore file
 */
const ignoreFilePath = require('path').resolve(__dirname, 'prettierignore');

module.exports = {
  extendConfig,
  ignoreFilePath
};
