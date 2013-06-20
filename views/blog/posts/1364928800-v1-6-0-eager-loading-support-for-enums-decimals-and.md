### v1.6.0 - Eager loading, support for enums, decimals and bigint, performance improvements …

After 552 commits, almost 8 months of work, 42 relevant changes and the acquisition of two more core contributors since the last stable version, we finally published Sequelize v1.6.0 to NPM today. With this release, we’ve been adding some important and often requested features, as well as making things more stable while improving the performance noticeably. However, we know that there are a lot of important features missing, so we created a [rough roadmap](https://github.com/sequelize/sequelize#roadmap), which should make plans clearer and which will assist us in taking the right way. Also, every repository which was somehow related to Sequelize, has been moved to a [Github organization](https://github.com/sequelize).

#### Changes

** IMPORTANT !!! **

There have been two changes, which might break backwards compatibility for your project. However, as they are more likely fixing some of your issues, we have decided to not release v2.0.0 but v1.6.0 instead.

```bash
- [FEATURE] timestamps are now stored as UTC. #461 (thanks to innofluence/janmeier)
```

Every date that gets sent to the database will be handled as UTC. This makes the code less dependent on the location of the computer.

```bash
- [REFACTORING] dropped support for synchronous migrations. added third parameter which needs to get called once the migration has been finished. also this adds support for asynchronous actions in migrations.
- [FEATURE] it’s now possible to use callbacks of async functions inside migrations (thanks to mphilpot)
```

In order to support asynchronous functions in migrations, it was necessary to know when methods are finished. In former versions of Sequelize, the migration algorithm used to observe the callbacks of the asynchronous methods. As this was hacky and contained too much magic, we removed that broken piece of **** and are handing over the program flow to the developer. A migration now looks like this:

```js
module.exports = {
  up: function(migration, DataTypes, done) {
    asyncFunc(function() {
      anotherAsyncFunc(function() {
        done()
      })
    })
  },

  down: function(migration, DataTypes, done) {
    done()
  }
}
```

#### Dependencies

```bash
- [DEPENDENCIES] mysql is now an optional dependency. #355 (thanks to clkao)
- [DEPENDENCIES] upgrade mysql to alpha7. You *MUST* use this version or newer for DATETIMEs to work
- [DEPENDENCIES] upgraded most dependencies. most important: mysql was upgraded to 2.0.0-alpha-3
```

One of the most important things about the new version is the removal of node-mysql as dependency. This means that you’ll need to add the mysql package to your package.json or choose the [sequelize-mysql](https://github.com/sequelize/sequelize-mysql) bundle instead. If you aren’t using mysql at all, you can just keep everything as it was.

#### Refactorings

```bash
- [REFACTORING] separated tests for dialects
```

In order to make it easier to support other dialects, tests are now less coupled to the dialects. That means that one can easily only run tests for a certain dialect.

```bash
- [REFACTORING] reduced number of sql queries used for adding an element to a N:M association. #449 (thanks to innofluence/janmeier)
```

This has been reported quite often. Adding an element to an N:M association is now resulting in less SQL queries.

#### Features

```bash
- [FEATURE] added association prefetching /eager loading for find and findAll. #465
```

It’s now possible to load associated data when calling find or findAll:

```js
Model.findAll({
  where: { smth: ‘funky’ },
  include: [ AnotherModel ]
}).success(function(models) {
  console.log(models[0].anotherModel)
})
```

[Further information can be found here.](http://sequelizejs.com/documentation#models-data-retrieval-eager-loading)

```bash
- [FEATURE] added findOrCreate, which returns a the already existing instance or creates one (thanks to eveiga)
```

There is a new method called findOrCreate which either creates a new instance or that returns an existing one. [Further information can be found here.](http://sequelizejs.com/documentation#models-data-retrieval-find-or-create)

```bash
- [FEATURE] added BIGINT data type which is treated like a string (thanks to adamsch1)
- [FEATURE] add support for decimals (thanks to alexyoung)
- [FEATURE] allow usage of enums. #440 (thanks to KevinMartin)
- [FEATURE] support for array serialization. pg only. #443 (thanks to clkao)
```

Sequelize can now handle enums, bigints, decimals and (pg only) arrays:

```bash
Sequelize.BIGINT                     // BIGINT
Sequelize.ENUM(‘value 1’, ‘value 2’) // An ENUM with allowed values ‘value 1’ and ‘value 2’
Sequelize.DECIMAL(10, 2)             // DECIMAL(10,2)
Sequelize.ARRAY(Sequelize.TEXT)      // Defines an array. PostgreSQL only.
```

[Further information can be found here.](http://sequelizejs.com/documentation#models-data-types)

```bash
- [FEATURE] allow definition of a models table name (thanks to slamkajs)
```

If you need to define a model’s table name, you can now do that like this:

```js
var Bar = sequelize.define(‘Bar’, { /* bla */ }, {
  // define the table’s name
  tableName: ‘my_very_custom_table_name’
})
```

This will create a model Bar with the table name my_very_custom_table_name.

```bash
- [FEATURE] results of raw queries are parsed with dottie. #468 (thanks to kozze89)
```

If the result of a raw query (sequelize.query) is resulting in keys that would include a dot, the respective row will be represented as a nested object.

```js
sequelize.query(‘select 1 as `foo.bar.baz`’).success(function(rows) {
  console.log(JSON.stringify(rows))
  /*
    [{
      “foo”: {
        “bar”: {
          “baz”: 1
        }
      }
    }]
  */
})
```

```bash
- [FEATURE] add increment and decrement methods on dao. #408 (thanks to janmeier/innofluence)
```

In order to increment/decrement values of an instance without running into concurrency issues, you may use increment/decrement from now on. You can find the relevant information about the methods [here](http://sequelizejs.com/documentation#instances-increment.

```bash
- [FEATURE] unified the result of describeTable
```

The method describeTable has been refactored to be more consistant. Check the [documentation](http://sequelizejs.com/documentation#migrations-functions-describe-table) for further information.

```bash
- [FEATURE] added DAO.reload(), which updates the attributes of the DAO in-place (as opposed to doing having to do a find() and returning a new model)
```

If you find yourself in a situation where an instance’s information might be outdated, you can now reload the respective data:

```js
Person.find({ where: { name: ‘john’ } }).success(function(person) {
  person.name = ‘jane’
  console.log(person.name) // ‘jane’

  person.reload().success(function() {
    console.log(person.name) // ‘john’
  })
})
```

```bash
- [FEATURE] added support for stored procedures (inspired by wuyuntao)
```

This basically means that raw SQL queries (sequelize.query) are correctly return the result of stored procedures.

```bash
- [FEATURE] experimental support for read replication for mysql (thanks to Janzeh)
- [FEATURE] allows updateAttributes to target specific fields only (thanks to Pasvaz)
- [FEATURE] minConnections option for MySQL pooling (thanks to dominiklessel)
- [FEATURE] added possibility to define the attributes of received associations (thanks to joshm)
- [FEATURE] added possibility to use pg lib’s native api (thanks to denysonique)
- [FEATURE] honor maxConcurrentQueries option (thanks to dchester)
- [FEATURE] Compatibility for JSON-like strings in Postgres (thanks to aslakhellesoy)
- [FEATURE] Model.find and Model.findAll can now take a String with an ID. (thanks to ghernandez345)
- [FEATURE] Performance improvements (thanks to Mick-Hansen and janmeier from innofluence)
- [FEATURE] Migrations now understand NODE_ENV (thanks to gavri)
- [FEATURE] improved comfort of sequelize.query. just pass an sql string to it and wait for the result
```

Should be more or less clear. Feel free to ask for further information.

#### Others

```bash
- [OTHERS] code was formatted to fit the latest code style guidelines (thanks to durango)
- [OTHERS] Explicitly target ./docs folder for generate-docs script. #444 (thanks to carsondarling)
- [OTHERS] Overwrite existing daoFactoryDefinition if there already has been one. (thanks to robraux)
```

#### Bugfixes

```bash
- [BUG] fixed wrong version in sequelize binary
- [BUG] local options have higher priority than global options (thanks to guersam)
- [BUG] fixed where clause when passing an empty array (thanks to kbackowski)
- [BUG] fixed updateAttributes for models/tables without primary key (thanks to durango)
- [BUG] fixed the location of the foreign key when using belongsTo (thanks to ricardograca)
- [BUG] don’t return timestamps if only specific attributes have been seleceted (thanks to ricardograca)
- [BUG] fixed removeColumn for sqlite
- [BUG] fixed date equality check for instances. (thanks to solotimes)
```

… and thats it.

Have fun and spread the word.

