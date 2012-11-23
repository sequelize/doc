const fs = require("fs")
    , md = require("node-markdown").Markdown

var Application = module.exports = {
  version: null,

  getSequelizeVersion: function() {
    if(!Application.version) {
      var version = fs.readFileSync(process.cwd() + '/node_modules/sequelize/changelog.md')

      version.toString().split('\n')[0].match(/# v([0-9\.]+)/)


      Application.version = RegExp.$1
    }

    return Application.version
  },

  getChangelog: function() {
    if (!Application.changelog) {
      var changelog = fs.readFileSync(process.cwd() + '/node_modules/sequelize/changelog.md').toString()
      Application.changelog = md(changelog)
    }

    return Application.changelog
  }
}
