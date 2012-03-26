const fs   = require('fs')
    , path = require('path')

module.exports = {
  toSlug: function(s) {
    var match  = s.match(/([a-zA-Z0-9]*)/g)
      , result = match.filter(function(s) { return s != '' }).join('-')

    return result.toLowerCase()
  },

  loadSection: function(section) {
    var filename = __dirname + '/../views/sections/' + this.toSlug(section) + '.jade'
      , result   = filename

    if(path.existsSync(filename)) {
      var content = fs.readFileSync(filename)
      result = require('jade').compile(content)({})
    }

    return result
  }
}
