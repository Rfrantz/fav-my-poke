module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'simple-import-sort', 'unused-imports', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'off',
    'import/no-unresolved': 'error',
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {
      functions: false,
      classes: true,
      variables: true,
      typedefs: true
    }],
    'react/destructuring-assignment': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': 'off',
    'react/jsx-filename-extension': [2, {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }],
    "react-hooks/exhaustive-deps": "off",
    "react/no-children-prop": [0, {
      "allowFunctions": true
    }],
    'no-use-before-define': ['error', {
      functions: false,
      classes: true,
      variables: true
    }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never'
    }],
    'import/no-extraneous-dependencies': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 'argsIgnorePattern': '^_' }
    ],
    'simple-import-sort/imports': ['error', {
      groups: [['^react', '^@?\\w'], ["^\\u0000"], ['^\\.\\.(?!/?$)', '^\\.\\./?$'], ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']]
    }],
    'arrow-body-style': ['error', 'as-needed'],
    'unused-imports/no-unused-imports': ['error'],
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    "prettier/prettier": [
      "error",
      { "endOfLine": "auto" }
    ]
  },
  "settings": {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    },
    jest: {
      version: 26
    },
    react: {
      version: 'detect'
    }
  }
}
