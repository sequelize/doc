#### Skeleton

The following skeleton shows a typical migration file. All migrations are expected to be located in a folder called `migrations` at the very top of the project. Sequelize `1.4.1` added the possibility to let the sequelize binary generate a migration skeleton. See the aboves section for more details.

```js
module.exports = {
  up: function(migration, DataTypes, done) {
    // logic for transforming into the new state
  },

  down: function(migration, DataTypes, done) {
    // logic for reverting the changes
  }
}
```

The passed `migration` object can be used to modify the database. The `DataTypes` object stores the available data types such as `STRING` or `INTEGER`. The third parameter is a callback function which needs to be called once everything was executed. The first parameter of the callback function can be used to pass a possible error. In that case, the migration will be marked as failed. Here is some code:

```js
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.dropAllTables().complete(done)

    // equals:
    migration.dropAllTables().complete(function(err) {
      if (err) {
        done(err)
      } else {
        done(null)
      }
    })
  }
}
```

The available methods of the migration object are the following.
