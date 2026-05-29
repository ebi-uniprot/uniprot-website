import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jsxA11y.flatConfigs.recommended,
  eslintReact.configs['recommended-typescript'],
  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest },
      parser: typescriptEslint.parser,
      ecmaVersion: 2019,
      sourceType: 'module',
    },
    plugins: {
      typescriptEslint,
      jsxA11y,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false },
      ],
      '@typescript-eslint/prefer-interface': 'off',
      camelcase: 'error',
      'class-methods-use-this': 'error',
      curly: ['error', 'all'],
      'default-case': 'error',
      'default-param-last': 'error',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            './*.ts',
            './*.js',
            '**/*.spec.*',
            '**/__mocks__/*.ts',
            '**/__test-helpers__/*.ts?',
          ],
        },
      ],
      'import/prefer-default-export': 'off',
      'jsx-a11y/control-has-associated-label': 'error',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/label-has-for': 'off',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-cond-assign': 'error',
      'no-console': 'error',
      'no-labels': 'error',
      'no-param-reassign': 'error',
      'no-plusplus': 'error',
      'no-restricted-globals': 'error',
      'no-underscore-dangle': 'error',
      'no-unused-expressions': 'error',
      'no-restricted-syntax': 'off',
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      // Use Meta's canonical hooks rules. Turn off @eslint-react's overlapping
      // reimplementations to avoid double-reporting. We keep the other hook-
      // adjacent rules from @eslint-react's preset (set-state-in-effect,
      // purity, etc.) since they cover ground Meta's plugin doesn't here.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@eslint-react/rules-of-hooks': 'off',
      '@eslint-react/exhaustive-deps': 'off',
      // Project-specific overrides on top of @eslint-react's `recommended-typescript`
      // preset.
      '@eslint-react/no-array-index-key': 'error', // preset: warn
      '@eslint-react/no-unstable-context-value': 'error', // not in preset
      '@eslint-react/dom-no-unsafe-target-blank': 'error', // not in preset
      '@eslint-react/jsx-no-useless-fragment': [
        'error',
        { allowExpressions: true },
      ], // not in preset
      // Style/naming and React 19 migration hints. Disabled to keep CI signal
      // focused on correctness rules. Re-enable individually when doing a
      // targeted cleanup pass.
      '@eslint-react/naming-convention-ref-name': 'off',
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/no-use-context': 'off',
      '@eslint-react/no-forward-ref': 'off',
      '@eslint-react/use-state': 'off',
      '@eslint-react/no-unnecessary-use-prefix': 'off',
      '@eslint-react/no-children-map': 'off',
      '@eslint-react/no-children-count': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
        typescript: true,
      },
    },
  },
];
