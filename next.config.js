const webpack = require('webpack')
require('dotenv').config()

module.exports = {
  distDir: 'build',
  poweredByHeader: false,
  generateEtags: false,
  webpack: (config, { dev }) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`proccess.env.${curr}`] = JSON.stringify(process.env[curr])
      return acc
    })
    config.plugins.push(new webpack.DefinePlugin(env))
    if (dev) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          /node_modules/,
          /libraries/
        ]
      })
    }
    return config
  }
}