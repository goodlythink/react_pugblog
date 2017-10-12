const fs = require('fs')
const stats = require('../webpack-assets.json')

module.exports = function getMarkupWithAssets(filepath) {
    return fs.readFileSync(filepath, 'utf-8')
        .replace('___CSS___', stats.main.css)
        .replace('___MAIN___', stats.main.js)
}