module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react/require-default-props': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/react-in-jsx-scope': 'off',
    'no-plusplus': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
      },
      {
        selector: 'property',
        format: null,
        filter: {
          regex:
            '(&:hover|Content-Type|primary-text|grayed-text|A-Z|book_image|primary_isbn13|primary_isbn10|list_name|Tbsp\\.|tbsp\\.|Tbsps\\.|tbsps\\.|Tsp\\.|tsp\\.|Tsps\\.|tsps\\.|Oz\\.|oz\\.)',
          match: true,
        },
      },
    ],
  },
}
