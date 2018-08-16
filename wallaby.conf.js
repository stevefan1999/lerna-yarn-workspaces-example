module.exports = wallaby => {
  return {
    files: [
      'jest.*.js',
      'packages/**/*.+(js|jsx|ts|tsx|json)',
      '!packages/**/dist/**',
      '!packages/**/node_modules/**',
      '!packages/**/__tests__/*.+(js|jsx|ts|tsx)'
    ],
    filesWithNoCoverageCalculated: [
      '**/tsconfig.*',
      '**/package.json',
      '**/rollup.config.js',
      '**/jest.config.js'
    ],
    tests: [
      'packages/**/__tests__/*.+(js|jsx|ts|tsx)',
      '!packages/**/node_modules/**'
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
        presets: ['jest']
      })
    },
    setup(wallaby) {
      const jestConfig = require('./jest.config.js')
      wallaby.testFramework.configure(jestConfig)
    }
  }
}
