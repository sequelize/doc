exports.index = function(req, res) {
  res.render('index', { title: 'Home', activeNavItem: 'home', bodyId: 'home' })
}

exports.imprint = function(req, res) {
  res.render('imprint', { title: 'Imprint' })
}

exports.search = function (req, res) {
  res.render('search', { title: 'Search', activeNavItem: 'search', bodyId: 'search' })
}
