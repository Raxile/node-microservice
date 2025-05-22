import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettierRecommended,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto', singleQuote: true }],
      // Custom ESLint rules go here
      'no-console': 'warn',
      'no-unused-vars': 'off', // Handled by TypeScript
      '@typescript-eslint/no-unused-vars': ['error'],
      // TypeScript-specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // Node.js specific rules
      'node/no-missing-import': 'off', // TypeScript handles module resolution
      'node/no-unsupported-features/es-syntax': 'off',
    },
  },
  eslintConfigPrettier,
  { ignores: ['node_modules/', 'build/', 'dist/'] },
];
