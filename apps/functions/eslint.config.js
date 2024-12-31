/** @type {import('eslint').FlatConfig} */
module.exports = [
  {
    files: ["**/*.ts", "**/*.js"],  // Aplica a todos los archivos js y ts
    languageOptions: {
      globals: {
        es6: true,
        node: true,
      },
      parser: require("@typescript-eslint/parser"),  // Usar require() para el parser
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json", ],
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "import": require("eslint-plugin-import"),
    },
    rules: {
      "quotes": ["error", "double"],
      "import/no-unresolved": 0,
    },
  },
  // Configuración extendida de "eslint:recommended"
  {
    rules: {
      // Copiar las reglas de "eslint:recommended" directamente
      "no-console": "off",
      "no-debugger": "warn", // Agrega otras reglas de eslint:recommended aquí
    },
  },
  // Configuración extendida de "plugin:import/errors"
  {
    plugins: {
      "import": require("eslint-plugin-import"),
    },
    rules: {
      "import/no-unresolved": 0,  // Ejemplo de regla de plugin
      "import/named": "error",
    },
  },
  // Configuración extendida de "plugin:@typescript-eslint/recommended"
  {
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
    },
  },
  // Configuración extendida de "google"
  {
    rules: {
      "indent": ["error", 2],  // Ejemplo de regla específica de google
    },
  },
];
