const express = require('express')

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

app.get('/', function(req, res){
  res.render('index', {
    title: 'Sequelize &raquo A MySQL Object-Relational-Mapper for NodeJS',
    sections: [
      'Installation',
      'Usage',
      'DAOFactory',
      'DAO',
      'Migrations',
      'Further information',
      'Projects'
    ]
  })
})

app.listen(3000)
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env)
