const fs = require("fs")

var Application = module.exports = {
  version: null,

  getSequelizeVersion: function(callback) {
    if(Application.version) {
      callback(null, Application.version)
    } else {
      fs.readFile(__dirname + '/../node_modules/sequelize/changelog.md', function(err, data) {
        if(err) {
          callback(err, null)
        } else {
          data.toString().split('\n')[0].match(/# v([0-9\.]+)/)

          Application.version = RegExp.$1

          callback(Application.version)
        }
      })
    }

  }
}
