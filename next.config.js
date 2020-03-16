const path = require('path')
const nextEnv = require('next-env')
const withCSS = require('@zeit/next-css')

const withNextEnv = nextEnv()

module.exports = withNextEnv(
  {
    webpack: config => {
      config.plugins = config.plugins || []

      config.resolve.modules.push(path.resolve('./src'))

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: { svgoConfig: { plugins: [{ removeViewBox: false }] } }
          }
        ]
      })

      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]'
          }
        }
      })

      return config
    }
  },
  withCSS({ cssModules: false })
)
