/**
 * Helper utility to extend the base Prettier configuration (ES Module version)
 * @param {Object} options - Custom options to extend the base config
 * @returns {Object} - Extended Prettier configuration
 */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the base config
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseConfigPath = path.join(__dirname, 'prettierrc.json');
const baseConfig = JSON.parse(fs.readFileSync(baseConfigPath, 'utf8'));

export function extendConfig(options = {}) {
  return { ...baseConfig, ...options };
}

/**
 * Path to the base .prettierignore file
 */
export const ignoreFilePath = path.resolve(__dirname, 'prettierignore');
