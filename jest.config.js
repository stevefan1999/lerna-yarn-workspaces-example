module.exports = {
  'roots': [
    '<rootDir>/packages'
  ],
  'transform': {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  'modulePaths': [
    '<rootDir>/packages/'
  ],
  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json'
  ],
  'globals': {
    'ts-jest': {
      'useBabelrc': true
    }
  },
  'collectCoverage': true
}
