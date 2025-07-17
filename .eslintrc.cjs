module.exports = {
  root: true,
  overrides: [
    {
      files: ["client/src/**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./client/tsconfig.json"],
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: 2020,
      },
      env: { browser: true, es6: true },
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
    {
      files: ["firebase-functions/src/**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./firebase-functions/tsconfig.json"],
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: 2020,
      },
      env: { node: true, es6: true },
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
          },
        ],
      },
    },
  ],
};
