/* config-overrides.js */
const path = require('path')
const rewireTypescript = require('react-app-rewire-typescript')
const rewireAliases = require('react-app-rewire-aliases')
const { compose } = require('react-app-rewired');


module.exports = function override(config, env) {
  const alias = rewireAliases.aliasesOptions({
    '@interface': path.resolve(__dirname, 'src/@interface'),
    '@components/*': path.resolve(__dirname, 'src/components/*')
  })
  const rewires = compose(
    rewireTypescript,
    alias,
  )
  return rewires(config, env);
}