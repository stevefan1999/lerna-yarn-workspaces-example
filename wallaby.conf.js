module.exports = wallaby => {
  return {
    files: [
      '**/tsconfig.*',
      '**/package.json',
      'jest.config.js',
      'packages/**/*.+(js|jsx|ts|tsx)',
      '!**/rollup.config.js',
      '!packages/**/dist/**',
      '!packages/**/__tests__/*.+(js|jsx|ts|tsx)'
    ],
    filesWithNoCoverageCalculated: [
      '**/tsconfig.*',
      '**/package.json',
      'jest.config.js'
    ],
    tests: [
      'packages/**/__tests__/*.+(js|jsx|ts|tsx)'
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
      const rewriter = obj => obj.map(p => p.replace('<rootDir>', wallaby.projectCacheDir))
      jestConfig.roots = rewriter(jestConfig.roots)
      jestConfig.modulePaths = rewriter(jestConfig.modulePaths)
      wallaby.testFramework.configure(jestConfig)
    }
  }
}
