// run eslint --fix src/** to fix all

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  'rules': {
    'indent': ['error', 2, { "SwitchCase": 1 }],
    'space-before-blocks': 'error',
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'space-infix-ops': ['error', {'int32Hint': false}],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'no-multi-spaces': 0,
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'eqeqeq': ['error', 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'spaced-comment': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'no-multiple-empty-lines': 'error',
    'no-unused-expressions': 'error',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'key-spacing': ['error', { 'mode': 'strict' }],
    'no-undef': 0,
    'no-console': 1
  }
}
