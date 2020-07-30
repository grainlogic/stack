'use strict'

module.exports = {
  diff: true,
  extension: [ 'ts' ],
  opts: false,
  package: '../package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 2000,
  ui: 'tdd',
  require: 'ts-node/register',
  project: '../tsconfig.json'
}
