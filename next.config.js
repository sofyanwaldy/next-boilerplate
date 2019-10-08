module.exports = {
  distDir: 'build',
  poweredByHeader: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: 
          '/(node_modules)/'
          // 'libraries',
          // 'assets/js/'
      })
    }
    return config
  }
}