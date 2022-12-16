/**
 * @type {import('eslint').ESLint}
 */

module.exports = {
    root: true,
    extends: [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "airbnb-typescript",
        "plugin:import/recommended",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: false,
        },
    },
    plugins: ["import", "@typescript-eslint"],
    rules: {
        "no-console": "warn",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "off",
        "prettier/prettier": "off",
        "react/function-component-definition": [
            "warn",
            {
                namedComponents: "function-declaration",
            },
        ],
        "react/require-default-props": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "jsx-a11y/no-static-element-interactions": "off", // if you add a mouse down event listener prop on a div, you don't need to add touch, mouse...
        "jsx-a11y/click-events-have-key-events": "off", // if you add a mouse down event listener prop on a div, you don't need to add touch, mouse...
        "jsx-a11y/label-has-associated-control": "off", // buggy, <label /> htmlFor does not work
    },
    overrides: [
        {
            files: ["cypress/**/*.ts"],
            rules: {
                "@typescript-eslint/no-namespace": "off",
            },
        },
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        browser: true,
        node: true,
    },
    ignorePatterns: ["**/*.js", "**/*.json", "node_modules", ".next", "public"],
}
