/* config-overrides.js */
const rewireTypescript = require('react-app-rewire-typescript')
const { compose } = require('react-app-rewired');


module.exports = function override(config, env) {
  const rewires = compose(
    rewireTypescript
  )
  return rewires(config, env);
}