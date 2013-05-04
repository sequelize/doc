### Adding Sequelize to the application

The following commands will install `sequelize`, the needed PostgreSQL library as well as the MySQL bindings. Also we will create a folder `models`, that will contain the model definitions.

```bash
npm install --save sequelize pg mysql
mkdir models
```

#### app.js

In order to create a maintainable application, we will put all the database logic into the `models` folder. The application's main file will then just sync the models with the database and run the server. This way we don't clutter the application.

```js
var express = require('express')
  , routes  = require('./routes')
  , user    = require('./routes/user')
  , http    = require('http')
  , path    = require('path')
  , db      = require('./models')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/users', user.list)

db.sequelize.sync().complete(function(err) {
  if (err) {
    throw err
  } else {
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'))
    })
  }
})
```

#### models/index.js

The idea of this file is to configure a connection to the database and to collect all model definitions. Once everything is in place we will store the stuff in a singleton. This will make it possible to load the file whenever we need database access without running into issues with duplicated database access.

This file will also differ between the local machine and the Heroku server.

```js
if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('example-app-db', 'root', null)
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user')

    // add your other models here
  }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db
```

#### models/user.js

All the other models of our application will be located as separate files in the `models` folder. We will use the `import`-method of Sequelize to load those files.

```js
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    username: DataTypes.STRING
  })
}
```
