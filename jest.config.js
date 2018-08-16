module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  modulePaths: ['<rootDir>/packages/'],
  moduleNameMapper: {
    '@foo/(.*)': '<rootDir>/packages/$1/src/'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: {
    'ts-jest': {
      useBabelrc: true
    }
  },
  collectCoverage: true
}
