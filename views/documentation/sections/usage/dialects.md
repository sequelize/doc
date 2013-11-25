#### Dialects

With the release of Sequelize `v1.6.0`, the library got independent from specific dialects. That mean, that you'll have to add the respective dialect library yourself. Another option is the use of the sequelize packages that ship the dialect libraries as well.

##### MySQL

In order to get Sequelize working nicely together with MySQL, you'll need to install `mysql@~2.0.0-alpha7`. Once that's done you can use it like this:

```js
var sequelize = new Sequelize('database', 'username', 'password', {
  // mysql is the default dialect, but you know...
  // for demo purporses we are defining it nevertheless :)
  // so: we want mysql!
  dialect: 'mysql'
})
```

Also possible is the use of `sequelize-mysql`. Just install it via `npm install sequelize-mysql` and use it like this:

```js
var Sequelize = require('sequelize-mysql').sequelize
var mysql     = require('sequelize-mysql').mysql

var sequelize = new Sequelize('database', 'username', 'password', {
  // mysql is the default dialect, but you know...
  // for demo purporses we are defining it nevertheless :)
  // so: we want mysql!
  dialect: 'mysql'
})
```

##### SQLite

For SQLite compatibility you'll need `sqlite3@~2.1.5`. Configure Sequelize like this:

```js
var sequelize = new Sequelize('database', 'username', 'password', {
  // sqlite! now!
  dialect: 'sqlite',

  // the storage engine for sqlite
  // - default ':memory:'
  storage: 'path/to/database.sqlite'
})
```

If you want to use the bundled version, run `npm install sequelize-sqlite` and use the following code:

```js
var Sequelize = require('sequelize-sqlite').sequelize
var sqlite    = require('sequelize-sqlite').sqlite

 var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
})
```

##### PostgreSQL

The library for PostgreSQL is `pg@~2.0.0`. You'll just need to define the dialect:

```js
var sequelize = new Sequelize('database', 'username', 'password', {
  // gimme postgres, please!
  dialect: 'postgres'
})
```

In order to use the bundled version, use this `npm install sequelize-postgres` and require the lib this way:

```js
var Sequelize = require('sequelize-postgres').sequelize
var postgres  = require('sequelize-postgres').postgres

 var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres'
})
```

**Note:** You can pass options directly to your dialect library by setting the `dialectOptions` parameter. See [Options](#usage-options) for examples.
