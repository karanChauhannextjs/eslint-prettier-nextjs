import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      // 1. Always use semicolons
      'semi': ['error', 'always'],

      // 2. Only allow console.warn and console.error
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // 3. Prefer const over let for variables that are never reassigned
      'prefer-const': ['error'],

      // 4. Enforce consistent arrow function usage (always use arrow functions for callbacks)
      'prefer-arrow-callback': ['error'],

      // 5. Disallow unused variables
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // 6. Enforce consistent import order for readability
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
        },
      ],

      // 8. Don’t use raw <a> tags — enforce next/link
      '@next/next/no-html-link-for-pages': ['error', 'src/app'],

      // 9. Don’t use raw <img> tags — enforce next/image
      '@next/next/no-img-element': 'error',

      'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true, // Event handlers like onClick at the end
          shorthandFirst: true, // Shorthand props (e.g., disabled) come first
          noSortAlphabetically: false, // Sort alphabetically
          reservedFirst: true, // Reserved props like key, ref first
        },
      ],

      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSTypeAliasDeclaration',
          message: "All types must be imported from the 'types' folder, do not declare inline.",
        },
        {
          selector: 'TSInterfaceDeclaration',
          message:
            "All interfaces must be imported from the 'types' folder, do not declare inline.",
        },
      ],

      'curly': ['error', 'all'],
    },
    settings: {
      next: {
        rootDir: 'packages/my-app/',
      },
    },
  }),
];

export default eslintConfig;
