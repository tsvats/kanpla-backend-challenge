/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/*.spec.ts'],
    testPathIgnorePatterns: [
        '/node_modules/',
        process.env.TEST_TYPE === 'unit'
            ? '.*\\.integration\\.spec\\.ts$'
            : null,
        process.env.TEST_TYPE === 'integration'
            ? '^(?!.*\\.integration\\.spec\\.ts$).*\\.spec\\.ts$'
            : null,
    ].filter(Boolean),
}
