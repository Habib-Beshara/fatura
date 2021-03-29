module.exports = {
    "env": {
        "browser": false,
        "node": true,
        "es6": true
    },
    "extends": [
        "airbnb-base",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "import/extensions": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
        "no-useless-constructor": ["off"],
        "no-restricted-syntax": 1,
        'no-underscore-dangle': ["off"]
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".ts"]
            }
        }
    },
};
