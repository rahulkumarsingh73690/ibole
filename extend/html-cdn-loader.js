/**
 * @file Webpack CDN 解析器 / Commonjs module
 * @module extend/html-cdn-loader
 * @author GuoGuang <https://github.com/GuoGuang>
 */

const { cdnUrl } = require('../config/api.config')
const { isProdMode } = require('../environment')

module.exports = source => {
  if (isProdMode) {
    source = source.replace(/src="\/images\//g, `src="${cdnUrl}/images/`)
    source = source.replace(/src="\/partials\//g, `src="${cdnUrl}/partials/`)
  }
  return source
}
