module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.ts'],
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.ts'],
	coverageDirectory: 'coverage',
};
