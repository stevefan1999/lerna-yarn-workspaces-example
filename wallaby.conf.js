module.exports = wallaby => {
  return {
    files: [
      'test.ts',
      'tsconfig.json',
      'packages/**/*.{js,jsx,ts,tsx,json}',
      '!**/dist',
      '!packages/**/node_modules',
      '!packages/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    filesWithNoCoverageCalculated: ['**/package.json'],
    tests: ['packages/**/*.{test,spec}.{js,jsx,ts,tsx}'],
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
