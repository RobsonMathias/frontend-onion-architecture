module.exports = {
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/jest.setup.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testRegex: '(?<!integ\\.)spec\\.ts(x)?$',
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageReporters: ['html'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/cypress/'],
  transform: {
    '.(ts|tsx)$': 'babel-jest',
    'node_modules/(@mui|@babel)/*/*.+.(j|t)sx?$': 'babel-jest'
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/@fixtures/*',
    '<rootDir>/src/@types/*',
    '<rootDir>/src/constants/*',
    '<rootDir>/src/react-app-env.d.ts',
    '<rootDir>/src/service-worker.ts',
    '<rootDir>/src/report-web-vitals.ts',
    '<rootDir>/src/service-worker-registration.ts',
    'fixture.(ts|tsx)',
    '.integ.spec.(ts|tsx)',
    'index.(ts|tsx)',
    '.mock.(ts|tsx)'
  ],
  transformIgnorePatterns: ['node_modules/(?!(@mui|@babel)/.*)'],
  globals: {
    jasmine: true,
    'ts-jest': {
      babelConfig: true
    }
  },
  verbose: false,
  moduleNameMapper: {
    '^services(.*)$': '<rootDir>/src/services/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^@fixtures/(.*)$': '<rootDir>/src/@fixtures/$1',
    '^@types(.*)$': '<rootDir>/src/@types/$1',
    '^adapters(.*)$': '<rootDir>/src/adapters/$1',
    '^adapters/(.*)$': '<rootDir>/src/adapters/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^modules/(.*)$': '<rootDir>/src/modules/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^stores(.*)$': '<rootDir>/src/stores/$1',
    '^wrappers(.*)$': '<rootDir>/src/wrappers/$1',
    '^layouts(.*)$': '<rootDir>/src/layouts/$1'
  }
};
