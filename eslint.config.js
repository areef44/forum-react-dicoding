import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import daStyle from 'eslint-config-dicodingacademy';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'quotes': 'off'
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  daStyle,
]);
