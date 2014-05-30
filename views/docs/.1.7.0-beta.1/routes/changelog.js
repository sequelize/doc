var request      = require('request')
  , marked       = require('marked')
  , cheerio      = require('cheerio')
  , rawChangelog = null
  , changelog    = null

exports.index = function(req, res) {
  getSections(function(sections) {
    res.redirect(sections[0].url)
  })
}

exports.show = function(req, res) {
  getSections(function(sections, data) {
    res.render('changelog/show', {
      sections:      sections,
      permalink:     req.param('version'),
      activeNavItem: 'changelog',
      sidebarTitle:  'Changelog',
      title:         'Changelog',
      data:          data[req.param('version')]
    })
  })
}

// helpers

// generates the necessary content for the sidebar
var getSections = function(callback) {
  var sections = []

  getChangelog(function(changelog) {
    Object.keys(changelog).forEach(function(version) {
      var subSections = []

      sections.push({
        permalink:   version,
        url:         '/changelog/' + version,
        title:       'v' + version.match(/v?(\d+)-(\d+)-(\d+)/).slice(1).join('.'),
        subSections: Object.keys(changelog[version]).map(function(item) {
          return {
            anchor: item,
            text:   item.charAt(0).toUpperCase() + item.slice(1)
          }
        })
      })
    })

    callback(sections, changelog)
  })
}

var getChangelog = function(callback) {
  if (changelog) {
    callback(changelog)
  } else {
    getRawChangelog(function(content) {
      changelog = splitChangelogIntoVersions(content)

      callback(changelog)
    })
  }
}

var getRawChangelog = function(callback) {
  request('https://raw.github.com/sequelize/sequelize/master/changelog.md', function(err, res, body) {
    rawChangelog = marked(body).replace(/<h1 id="/g, '<h3 id="').replace(/<\/h1>/g, '</h3>')
    callback(rawChangelog)
  })
}

var splitChangelogIntoVersions = function(content) {
  var result  = {}
    , matches = content.replace(new RegExp("\n", "g"), ' ').match(/(<h3.*?[^<]ul>)/g)

  matches.forEach(function(m) {
    var $  = cheerio.load(m)
      , id = $('h3').attr('id')

    result[id] = {}

    $('ul > li').each(function() {
      var m = this.html().match(/\[(.+)\] (.*)/)

      if (!m) {
        m = ("[GENERAL] " + this.html()).match(/\[(.+)\] (.*)/)
      }

      result[id][m[1].toLowerCase()] = result[id][m[1].toLowerCase()] || []
      result[id][m[1].toLowerCase()].push(m[2])
    })
  })

  return result
}
