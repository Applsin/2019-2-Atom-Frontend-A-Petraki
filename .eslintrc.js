module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prefer-template': 1,
    'object-shorthand': 1,
    'no-restricted-globals': 1,
    'no-plusplus': 1,
    semi: 1,
    'import/prefer-default-export': 'off',
    'default-case': 1,
  },
};
