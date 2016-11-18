module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "mocha": true,
    "node": true
  },
  "rules": {
    "arrow-parens": ["off"],
    "consistent-return": "off",
    "comma-dangle": "off",
    "generator-star-spacing": "off",
    "import/no-unresolved": ["error", { "ignore": ["electron"] }],
    "import/no-extraneous-dependencies": "off",
    "no-use-before-define": "off",
    "no-cond-assign": ["error", "except-parens"],
    "promise/param-names": 2,
    "promise/always-return": 2,
    "promise/catch-or-return": 2,
    "promise/no-native": 0,
    "react/jsx-no-bind": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/prop-types": "off",
    "react/prefer-stateless-function": "warn",
    "flowtype-errors/show-errors": 2
  },
  "plugins": [
    "flowtype-errors",
    "import",
    "promise",
    "react"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": `${__dirname}/webpack.config.eslint.js`
      }
    }
  }
};
