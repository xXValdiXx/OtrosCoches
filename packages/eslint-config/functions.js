import { config as baseConfig } from "./base.js";

export const functionConfig = [
    ...baseConfig, // Incluye todas las configuraciones de la Configuración 2
    {
        extends: [
            // Extensiones únicas de la Configuración 1 que no están en la Configuración 2
            'plugin:import/errors',
            'plugin:import/warnings',
            'plugin:import/typescript',
            'google',
        ],
        plugins: [
            "import",
        ],
        rules: {
            // Reglas específicas de Configuración 1 no presentes en Configuración 2
            'quotes': ['error', 'double'], // Fuerza comillas dobles
            'import/no-unresolved': 0, // Desactiva la verificación de módulos no resueltos
            'indent': ['error', 2], // Fuerza indentación de 2 espacios
        },
        parserOptions: {
            // Opciones del parser específicas de la Configuración 1
            project: ['tsconfig.json', 'tsconfig.dev.json'],
            sourceType: 'module',
        },
        ignores: [
            // Combina los patrones de ignore de ambas configuraciones
            '/lib/**/*',
            '/generated/**/*',
            'dist/**',
        ],
    },
];
