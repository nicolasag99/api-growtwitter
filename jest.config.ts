export default {
    //Configura o jest para teste no Node.js
    //usando TypeScript

    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
            ".+\\.ts$": "ts-jest",
    },

    //informa o diretório onde os testes estarão contidos

    roots: ["<rootDir>/tests"],

    //Configurações de captura de código
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],


}

