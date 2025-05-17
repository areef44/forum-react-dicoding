import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginCypress from 'eslint-plugin-cypress/flat';
import { FlatCompat } from '@eslint/eslintrc';
import daStyle from 'eslint-config-dicodingacademy'
const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    extends: [js.configs.recommended],
    plugins: {
      cypress: pluginCypress
    },
    rules: {
      quotes: 'off',
      'cypress/unsafe-to-chain-command': 'error',
      "eol-last": "off"
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginReact.configs.flat?.recommended || pluginReact.configs.recommended,
  pluginCypress.configs.recommended,
  daStyle,
  ...compat.extends('dicodingacademy'),
]);
