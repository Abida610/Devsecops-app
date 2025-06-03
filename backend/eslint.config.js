export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest"
    },
    rules: {
      "no-unused-vars": "warn", // Example rule: Warn on unused variables
      "no-console": "off"       // Allow console.log for now
    }
  }
];