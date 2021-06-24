const path = require('path')

module.exports = {
  webpackDevMiddleware(config) {
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: ['node_modules', '.next'],
    }

    return config;
  },
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
}
