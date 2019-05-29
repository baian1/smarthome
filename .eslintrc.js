module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node":false
  },
  "parser": '@typescript-eslint/parser',  // Specifies the ESLint parser
  "plugins": [
    "react"
  ],
  "extends": [
    "eslint:recommended",
    'plugin:@typescript-eslint/recommended',
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },

  "rules": {
    "indent": [2, 2, { "SwitchCase": 1 }],
    "react/jsx-uses-vars": 1,
    "@typescript-eslint/indent": [2, 2, { "SwitchCase": 1 }],
  }
};