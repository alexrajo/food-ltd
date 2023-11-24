module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'standard-with-typescript',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', '.eslintrc.js'],
  rules: {
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
    'no-var': 'error',
    'object-shorthand': 'off', // Not readable when enabled in my opinion
  },
};
