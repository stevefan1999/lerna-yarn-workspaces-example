module.exports = wallaby => {
  return {
    files: [
      'test.ts',
      'tsconfig.json',
      'packages/**/*.{[jt]s?(x),json}',
      '!**/dist',
      '!packages/**/node_modules',
      '!packages/**/*.{test,spec}.[jt]s?(x)'
    ],
    filesWithNoCoverageCalculated: ['**/package.json'],
    tests: ['packages/**/*.{test,spec}.[jt]s?(x)'],
    env: {
      type: 'node',
      runner: 'node',
      params: {
        runner: [
          'esm',
          'ts-node/register/transpile-only',
          'tsconfig-paths/register'
        ]
          .map(_ => `-r ${require.resolve(_)}`)
          .join(' ')
      }
    },
    debug: true,
    workers: {
      restart: true
    },
    compilers: {
      '**/*.tsx?': wallaby.compilers.typeScript({}),
      '**/*.jsx?': wallaby.compilers.babel({})
    },
    setup(wallaby) {
      require('./test.ts')
    }
  }
}
