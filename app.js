var express   = require('express')
  , routes    = require('./routes/index')
  , docs      = require('./routes/docs')
  , articles  = require('./routes/articles')
  , changelog = require('./routes/changelog')
  , http      = require('http')
  , path      = require('path')
  , app       = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/docs', docs.index)
app.get('/docs/:version', docs.index)
app.get('/docs/:version/:section', docs.index)
app.get('/docs/:version/:section/:subsection', docs.index)
app.get('/heroku', function(req, res) { res.redirect('/articles/heroku', 301) })
app.get('/articles', articles.index)
app.get('/articles/:title', articles.show)
app.get('/changelog', changelog.index)
app.get('/changelog/:version', changelog.show)

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
});
