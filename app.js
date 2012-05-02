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

app.get('/', function(req, res) {
  Application.getSequelizeVersion(function(err, version) {
    res.render('index', {
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
      version: version,
      inProduction: (process.env.NODE_ENV == 'production')
    })
  })
})

app.listen(process.env.PORT || process.env.port || 3000)
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env)
