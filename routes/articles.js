var fs       = require('fs')
  , path     = require('path')
  , articles = null

exports.index = function(req, res) {
  res.redirect('/articles/getting-started')
}

exports.show = function(req, res) {
  res.render('articles/' + req.param('title'), {
    activeNavItem: 'articles',
    sidebarTitle:  'Articles',
    title:         'Articles',
    sections:      articles
  })
}

// helpers

var getArticles = function() {
  var dir      = path.join(__dirname, '..', 'views', 'articles')
    , files    = fs.readdirSync(dir)
    , articles = []

  files.forEach(function(filename) {
    var content = fs.readFileSync(path.join(dir, filename)).toString()
      , title   = content.match(/h2\s(.+)\n/)[1]

    articles.push({
      path:        path.join(dir, filename),
      permalink:   filename.split('.')[0],
      title:       title,
      url:         '/articles/' + filename.split('.')[0],
      subSections: []
    })
  })

  return articles.sort(function(a,b) {
    if (a.title < b.title) {
      return -1
    } else if (a.title > b.title) {
      return 1
    } else {
      return 0
    }
  })
}

articles = getArticles()
