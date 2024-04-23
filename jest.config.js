const nextJest = require('next/jest');

process.env.TZ = 'UTC';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		// Handle module aliases (this will be automatically configured for you soon)
		'^DMH/actions/(.*)$': '<rootDir>/actions/$1',
		'^DMH/components/(.*)$': '<rootDir>/components/$1',
		'^DMH/context/(.*)$': '<rootDir>/context/$1',
		'^DMH/pages/(.*)$': '<rootDir>/pages/$1',
		'^DMH/services/(.*)$': '<rootDir>/services/$1',
		'^DMH/shared/(.*)$': '<rootDir>/shared/$1',
		'^DMH/test/(.*)$': '<rootDir>/test/$1',
		'^DMH/utils/(.*)$': '<rootDir>/utils/$1',
	},
	testEnvironment: 'jest-environment-jsdom',
	collectCoverageFrom: [
		'actions/**/*.ts',
		'actions/**/*.tsx',
		'components/**/*.ts',
		'components/**/*.tsx',
		'context/**/*.ts',
		'context/**/*.tsx',
		'pages/**/*.ts',
		'pages/**/*.tsx',
		'services/**/*.ts',
		'shared/**/*.ts',
		'shared/**/*.tsx',
		'utils/**/*.ts',
		'utils/**/*.tsx',
		'!pages/_app.page.tsx',
		'!pages/_document.page.tsx',
		'!**/*.test.tsx',
		'!**/*.spec.tsx',
	],
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50,
		},
	},
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
