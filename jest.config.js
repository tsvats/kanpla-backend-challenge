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
}
