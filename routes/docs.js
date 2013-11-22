var sections = ["installation", "usage", "models", "instances", "associations", "migrations", "utils", "misc"]

exports.index = function(req, res) {
  var path = 'docs/latest'

  if (!req.param('version')) {
    res.redirect("/docs/latest", 301)
  } else if (!req.param('section')) {
    res.redirect("/docs/latest/" + sections[0], 301)
  } else if (req.param('version') !== 'latest') {
    path = 'docs/' + req.param('version') + '/views/' + path
  }

  res.render(path + '/' + req.param('section'), { title: 'Documentation' })
}
