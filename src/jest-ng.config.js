module.exports = {
	displayName: 'angular',
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/../tsconfig.spec.json',
		},
	},
	testMatch: [ "<rootDir>/**/?(*.)+(spec).[jt]s?(x)" ],
}
