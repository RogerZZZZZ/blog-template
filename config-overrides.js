/* config-overrides.js */
const path = require('path')
const rewireTypescript = require('react-app-rewire-typescript')
const rewireAliases = require('react-app-rewire-aliases')
const { compose } = require('react-app-rewired');

module.exports = function override(config, env) {
  const alias = rewireAliases.aliasesOptions({
    '@actions/*': path.resolve(__dirname, 'src/actions/*'),
    '@components/*': path.resolve(__dirname, 'src/components/*'),
    "@constants": path.resolve(__dirname, 'src/constants'),
    '@interface': path.resolve(__dirname, 'src/@interface'),
    '@reducers/*':path.resolve(__dirname, 'src/reducers/*'),
    "@services": path.resolve(__dirname, 'src/services'),
  })
  const rewires = compose(
    rewireTypescript,
    alias,
  )
  return rewires(config, env);
}