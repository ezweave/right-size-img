module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      { default: 'generic' }
    ],
    'quotes': [
      'error',
      'single'
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    '@typescript-eslint/semi': [
      'error',
      'always'
    ],
  },
}