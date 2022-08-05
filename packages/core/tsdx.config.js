const { vanillaExtractPlugin } = require('@vanilla-extract/rollup-plugin');

// @see: https://tsdx.io/customization
module.exports = {
  rollup(config, options) {
    //config.plugins.unshift(vanillaExtractPlugin())
    config.plugins.push(vanillaExtractPlugin())
    console.log(config)
    return config;
  },
};
