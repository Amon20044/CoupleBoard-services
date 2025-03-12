module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,    
    es6: true,
    jest: true,
  },
  "extends": ["plugin:node/recommended"],
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    camelcase: 0,
  },
};
