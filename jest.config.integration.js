const config = require('./jest.config');
config.testRegex = 'integ\\.spec\\.ts(x)?$';
config.coverageDirectory = 'coverage-integration';
config.coveragePathIgnorePatterns = [
  ...config.coveragePathIgnorePatterns,
  '<rootDir>/src/adapters/*',
  '<rootDir>/src/stores/*',
  '.spec.ts(x)?$'
];
config.coverageThreshold = {
  global: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50
  }
};
console.log('RUNNING INTEGRATION TESTS');
module.exports = config;
