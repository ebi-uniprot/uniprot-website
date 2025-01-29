import globals from 'globals';
import js from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  react.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jsxA11y.flatConfigs.recommended,
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
      reactHooks,
      jsxA11y
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
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
      '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
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
      'jsx-no-lambda': 'off',
      'jsx-no-multiline-js': 'off',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-restricted-syntax': 'off',
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      'reactHooks/exhaustive-deps': 'warn',
      'reactHooks/rules-of-hooks': 'error',
      'react/destructuring-assignment': 'off',
      'react/display-name': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx'],
        },
      ],
      'react/jsx-fragments': 0,
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-wrap-multilines': [
        'error',
        {
          assignment: false,
          declaration: false,
        },
      ],
      'react/no-array-index-key': 'error',
      'react/no-did-update-set-state': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/static-property-placement': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
        typescript: true
      },
      react: {
        version: "detect",
      },
    },
  },
];
