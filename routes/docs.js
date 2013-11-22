exports.index = function(req, res) {
  var path = 'docs/latest/index'

  if (req.param('version') !== 'latest') {
    path = 'docs/' + req.param('version') + '/views/docs/latest/index'
  }

  res.render(path, { title: 'Documentation' })
}
