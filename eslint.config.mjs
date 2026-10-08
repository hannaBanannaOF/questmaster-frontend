import js from '@eslint/js';
import tseslint from 'typescript-eslint';

import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';

const layerRule = (message, group) => [
  'error',
  { patterns: [{ group, message }] },
];

export default [
  // Ignore global: precisa ser um objeto só com "ignores"
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'next-env.d.ts',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,

  {
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
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Fronteiras de arquitetura (Clean Architecture + Atomic Design)
  {
    files: ['src/modules/*/domain/**'],
    rules: {
      'no-restricted-imports': layerRule(
        'domain é puro: sem framework, sem application/infra/presentation.',
        [
          'react',
          'react-dom',
          'next',
          'next/*',
          'next-intl',
          'next-intl/*',
          '**/application',
          '**/application/**',
          '**/infra/**',
          '**/presentation',
          '**/presentation/**',
          '@/src/lib/http',
          '@/src/lib/http/**',
        ],
      ),
    },
  },
  {
    files: ['src/modules/*/application/**'],
    rules: {
      'no-restricted-imports': layerRule(
        'application depende só do domain (e de portas próprias).',
        [
          'react',
          'next',
          'next/*',
          '**/infra/**',
          '**/presentation',
          '**/presentation/**',
          '@/src/lib/http',
          '@/src/lib/http/**',
        ],
      ),
    },
  },
  {
    files: ['src/design/**'],
    rules: {
      'no-restricted-imports': layerRule(
        'O design system não conhece regras de negócio nem a aplicação.',
        ['@/src/modules/**', '@/src/app/**', '@/src/lib/**'],
      ),
    },
  },
];
