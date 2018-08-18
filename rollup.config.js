import globby from 'globby'
import path from 'path'
import autoExternal from 'rollup-plugin-auto-external'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

const getPackageJsonPath = pkgPath => path.resolve(pkgPath, './package.json')
const getPackageJson = pkgPath => require(getPackageJsonPath(pkgPath))
const createPlugins = pkgPath => [
  globals(),
  builtins(),
  autoExternal({
    packagePath: getPackageJsonPath(pkgPath)
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(),
  typescript({
    cacheRoot: '.cache/typescript',
    check: false,
    include: [path.resolve(pkgPath, './src/**/*.ts?(x)')],
    exclude: ['**/*.{d,test,spec}.ts?(x)'],
    tsconfig: './tsconfig.json',
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: './'
      }
    }
  }),
  babel({
    include: [path.resolve(pkgPath, './src/**/*.js?(x)')],
    exclude: ['**/*.{test,spec}.js?(x)']
  }),
  process.env.NODE_ENV === 'production' && terser()
]

const createOutputFiles = pkgPath => {
  let ret = []
  const pkg = getPackageJson(pkgPath)

  // for every key in mappings, if such key exist in the package manifest
  // then the repo will be compiled with corrosonding value in the package manifest
  // with format of value of the key in mappings
  const mappings = {
    main: 'cjs',
    module: 'esm',
    umd: 'umd'
  }

  Object.entries(mappings).forEach(([k, v]) => {
    if (Object.keys(pkg).indexOf(k) !== -1) {
      ret.push({
        file: path.resolve(pkgPath, pkg[k]),
        format: v,
        name: pkg.name
      })
    }
  })

  return ret
}

const createTask = pkgPath => ({
  input: path.resolve(pkgPath, getPackageJson(pkgPath).index),
  output: createOutputFiles(pkgPath),
  plugins: createPlugins(pkgPath)
})

export default async () =>
  (await globby(path.resolve(__dirname, './packages/**/package.json'))) // find all possible subrepo with package.json
    .filter(_ => !require(_).private) // and see if it is not private
    .map(_ => createTask(_.replace('/package.json', ''))) // then create a task for the subrepo
