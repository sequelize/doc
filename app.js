const express = require('express')
    , fs      = require('fs')
    , path    = require('path')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.helpers({
    toSlug: function(s) {
      var match  = s.match(/([a-zA-Z0-9]*)/g)
        , result = match.filter(function(s) { return s != '' }).join('-')

      return result.toLowerCase()
    },

    loadSection: function(section) {
      var filename = __dirname + '/views/sections/' + this.toSlug(section) + '.jade'
        , result   = filename

      if(path.existsSync(filename)) {
        var content = fs.readFileSync(filename)
        result = require('jade').compile(content)({})
      }

      return result
    }
  })
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Sequelize &raquo; A MySQL Object-Relational-Mapper for NodeJS',
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
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
