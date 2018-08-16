module.exports = wallaby => {
  return {
    files: [
      'jest.config.js',
      'packages/**/*.+(js|jsx|ts|tsx|json)',
      '!packages/**/dist/**',
      '!packages/**/node_modules/**',
      '!packages/**/__tests__/*.+(js|jsx|ts|tsx)'
    ],
    filesWithNoCoverageCalculated: [
      '**/tsconfig.*',
      '**/package.json',
      'jest.config.js'
    ],
    tests: [
      'packages/**/__tests__/*.+(js|jsx|ts|tsx)',
      '!packages/**/node_modules/**',
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    workers: {
      restart: true
    },
    testFramework: 'jest',
    compilers: {
      '**/*.tsx?': wallaby.compilers.typeScript({
        module: 'commonjs'
      }),
      '**/*.jsx?': wallaby.compilers.babel({
        babelrc: true,
        presets: ['jest'],
        plugins: []
      })
    },
    setup (wallaby) {
      const jestConfig = require('./jest.config.js')
      jestConfig.moduleNameMapper = {
        "@foo/(.*)": "<rootDir>/packages/$1/src/"
      };
      wallaby.testFramework.configure(jestConfig)
    }
  }
}
