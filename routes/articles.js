exports.index = function(req, res) {
  res.redirect('/articles/getting-started')
}

exports.show = function(req, res) {
  res.render('articles/' + req.param('title'), {
    title: 'Articles',
    sections: { 'getting-started': [] }
  })
}
