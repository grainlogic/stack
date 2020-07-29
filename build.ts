import { writeFileSync, existsSync, mkdirSync } from 'fs'
import pkg from './package.json'
import tsconfig from './tsconfig.json'

const { compilerOptions: { outDir: DIST_FOLDER } } = tsconfig
const EXCLUDE_FIELDS = [ 'scripts', 'devDependencies' ]

EXCLUDE_FIELDS.forEach(field => delete pkg[field])


if (!existsSync(DIST_FOLDER)) {
  mkdirSync(DIST_FOLDER)
}

writeFileSync(`${ DIST_FOLDER }/package.json`, JSON.stringify(pkg, null, 2))
