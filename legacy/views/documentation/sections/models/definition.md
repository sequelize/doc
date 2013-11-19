#### Definition

To define mappings between a model and a table, use the `define` method. Sequelize will then automatically add the attributes `createdAt` and `updatedAt` to it. So you will be able to know when the database entry went into the db and when it was updated the last time.

```js
var Project = sequelize.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
})

var Task = sequelize.define('Task', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
})
```

You can also set some options on each column:

```js
var Foo = sequelize.define('Foo', {
  // instantiating will automatically set the flag to true if not set
  flag: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},

  // default values for dates => current time
  myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

  // Use a function as a default value
  futureDate: {type: Sequelize.Date, defaultValue: function() {
    return new Date(Date.now() + 3600);
  }},

  // setting allowNull to false will add NOT NULL to the column, which means an error will be
  // thrown from the DB when the query is executed if the column is null. If you want to check that a value
  // is not null before querying the DB, look at the validations section below.
  title: { type: Sequelize.STRING, allowNull: false},

  // Creating two objects with the same value will throw an error. Currently composite unique
  // keys can only be created 'addIndex' from the migration-section below
  someUnique: {type: Sequelize.STRING, unique: true},
  // Go on reading for further information about primary keys

  identifier: { type: Sequelize.STRING, primaryKey: true},

  // autoIncrement can be used to create auto_incrementing integer columns
  incrementMe: { type: Sequelize.INTEGER, autoIncrement: true }

  // Comments can be specified for each field for MySQL and PG
  hasComment: { type: Sequelize.INTEGER, comment: "I'm a comment!" }
})
```

The comment option can also be used on a table, see [model configuration](http://sequelizejs.com/documentation#models-configuration)