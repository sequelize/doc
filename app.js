const express     = require('express')
    , Application = require("./src/application")

var app = module.exports = express.createServer()

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(__dirname + '/public'))
  app.helpers(require(__dirname + '/src/view-helpers'))
})

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

app.configure('production', function(){
  app.use(express.errorHandler())
})

// Routes

var getLocals = function(version) {
  return {
    title: 'Sequelize',
    subtitle: 'A multi-dialect Object-Relational-Mapper for Node.JS',
    sections: [
      'Installation',
      'Usage',
      'Models',
      'Instances',
      'Associations',
      'Migrations',
      'Query-Chainer',
      'Further information',
      'Projects'
    ],
    version: Application.getSequelizeVersion(),
    inProduction: (process.env.NODE_ENV === 'production'),
    activeSection: 'Home'
  }
}

app.get('/', function(req, res) {
  res.render('index', getLocals())
})

app.get('/blog-layout', function(req, res) {
  var locals = getLocals()

  locals.activeSection = 'Blog'

  res.render('blog', locals, function(err, blog) {
    var url = locals.inProduction ? "http://sequelizejs.com" : "http://localhost:3000"

    blog = blog.replace(/(src|href)="(\/.*?)"/g, function(content, attr, value) {
      return attr + '="' + url + value + '"'
    })

    blog = blog.replace(/(\.getJSON\(")(\/.*?)"/, function(content, prev, value) {
      return prev + url + value + '"'
    })

    blog = blog.replace(/href="#/g, 'href="' + url + '/#')

    res.send(blog)
  })
})

app.get('/version', function(req, res) {
  var response = {
    version: Application.getSequelizeVersion()
  }

  if(req.param('callback')) {
    res.send(req.param('callback') + "(" + JSON.stringify(response) + ")")
  } else {
    res.json(response)
  }
})

app.listen(process.env.PORT || process.env.port || 3000)
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env)
