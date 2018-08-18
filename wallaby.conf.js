module.exports = wallaby => {
  return {
    files: [
      'packages/**/*.+(ts|tsx|json)',
      '!packages/**/dist/**',
      '!packages/**/node_modules/**',
      '!packages/**/__tests__/*.+(ts|tsx)'
    ],
    filesWithNoCoverageCalculated: [
      '**/tsconfig.*',
      '**/package.json',
      '**/rollup.config.js',
      '**/jest.config.js'
    ],
    tests: [
      'packages/**/__tests__/*.+(ts|tsx)',
      '!packages/**/node_modules/**'
    ],
    env: {
      type: 'node',
      runner: 'node',
      params: {
        runner: `-r ${require.resolve('esm')}`
      }
    },
    workers: {
      restart: true
    },
    // testFramework: 'jest',
    compilers: {
      '**/*.tsx?': wallaby.compilers.typeScript({
        // module: 'commonjs'
      }),
      '**/*.jsx?': wallaby.compilers.babel({
        babelrc: true,
        presets: ['jest']
      })
    },
    setup (wallaby) {
      // const jestConfig = require('./jest.config.js')
      // wallaby.testFramework.configure(jestConfig)
    }
  }
}
