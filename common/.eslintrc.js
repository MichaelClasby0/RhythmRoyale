module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier", "jest"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowedNames: ["ignoredFunctionName", "ignoredMethodName"],
      },
    ],
  },
  env: {
    "jest/globals": true,
  },
};
