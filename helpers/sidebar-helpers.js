var path = require('path')
  , fs   = require('fs')
  , _    = require('lodash')

module.exports.readSubSections = function(file) {
  var _path = path.join(__dirname, '..', 'views', file + '.jade')

  try {
    console.log(_path)

    var content = fs.readFileSync(_path).toString()
      , result  = []

    content.split('\n').forEach(function(line) {
      if (_.contains(line, 'h3')) {
        var fragments = line.match(/h3#([^\s]+)\s(.+)/)
        result.push({
          anchor: fragments[1],
          text:   fragments[2]
        })
      }
    })

    return result
  } catch(e) {
    console.log(e)
    return []
  }
}
