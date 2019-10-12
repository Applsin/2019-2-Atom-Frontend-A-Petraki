module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "prefer-template": 1,
        "object-shorthand": 1,
        "no-restricted-globals": 1,
        "no-plusplus": 1,
        "semi": 1,
        "default-case": 1,
        "no-case-declarations": 1,
        "getter-return": 1,
        "no-empty": 1,
        "no-underscore-dangle": 0,
        "no-restricted-syntax":0,
        "class-methods-use-this": 0
    }
};