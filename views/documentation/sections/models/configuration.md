#### Configuration

You can also influence the way Sequelize handles your column names:

```js
var Bar = sequelize.define('Bar', { /* bla */ }, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are not disabled
  paranoid: true,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of tablenames; By default, sequelize will automatically

  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  tableName: 'my_very_custom_table_name'
})
```

You can also change the database engine, e.g. to MyISAM. InnoDB is default since `v1.2.1` of Sequelize.

```js
var Person = sequelize.define('Person', { /* attributes */ }, {
  engine: 'MYISAM'
})

// or globally
var sequelize = new Sequelize(db, user, pw, {
  define: { engine: 'MYISAM' }
})
```
