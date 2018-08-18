import autoExternal from 'rollup-plugin-auto-external'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/index.ts',
  plugins: [
    autoExternal(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    typescript({
      clean: true,
      useTsconfigDeclarationDir: false,
      cacheRoot: './',
      tsconfig: './tsconfig.json'
    }),
    babel({
      include: ['*.js+(|x)', '**/*.js+(|x)'],
      exclude: ['node_modules/**', '*.ts+(|x)', '**/*.ts+(|x)']
    }),
    process.env.NODE_ENV === 'production' && uglify()
  ],
  output: [
    { file: 'dist/index.cjs.js', format: 'cjs' },
    { file: 'dist/index.esm.js', format: 'esm' }
  ]
}
