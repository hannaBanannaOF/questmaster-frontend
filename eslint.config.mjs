import js from '@eslint/js';
import tseslint from 'typescript-eslint';

import tanstackQuery from '@tanstack/eslint-plugin-query';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,

  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'build/**'],

    files: ['**/*.{ts,tsx,js,jsx}'],

    languageOptions: {
      parser: tseslint.parser,
    },

    plugins: {
      import: importPlugin,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      '@tanstack/query': tanstackQuery,
    },

    rules: {
      quotes: ['warn', 'single', { avoidEscape: true }],
      semi: ['warn', 'always'],

      'react/react-in-jsx-scope': 'off', // Next já não precisa
      'react/jsx-uses-react': 'off',

      'react/jsx-wrap-multilines': [
        'error',
        {
          return: 'parens-new-line',
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'jsx-a11y/alt-text': 'warn',

      'unused-imports/no-unused-imports': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      'import/no-duplicates': 'warn',
      'prefer-const': 'warn',

      '@tanstack/query/no-unstable-deps': 'warn',
      '@tanstack/query/stable-query-client': 'error',
      '@tanstack/query/exhaustive-deps': 'warn',

      'no-restricted-syntax': [
        'warn',
        {
          selector: "Property[key.name='initialData']",
          message:
            'Evite initialData para loading fake. Prefira placeholderData.',
        },
        {
          selector: 'ArrayExpression > Literal[value=/^[A-Z]/]',
          message: 'Query keys devem ser lowercase.',
        },
        {
          selector:
            "CallExpression[callee.name='useQuery'] > Literal:first-child",
          message: 'Prefira usar object syntax no useQuery.',
        },
      ],
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
