#### Foreign Keys

##### Foreign key constraints | Constraints

```js
// First setup our models
var Task = this.sequelize.define('Task', { title: Sequelize.STRING })
  , User = this.sequelize.define('User', { username: Sequelize.STRING })

// Then our associations with a constraint
User.hasMany(Task, {onDelete: 'restrict'})
```

The same works for `hasOne()` and `belongsTo()`. Valid options are:

* `{onDelete: 'restrict|cascade'}`
* `{onUpdate: 'restrict|cascade'}`
* `{foreignKeyConstraint: true}` - Set to true to gain a `REFERENCES` declaration without either `onDelete` or `onUpdate` (that is, `foreignKeyConstraint` is implied if `onDelete` or `onUpdate` are set). This may be a helpful performance optimization in some cases.

**Implementation notes:**

* Enabling constraints is opt-in: they are only created if one or more of the options above are used when defining an association.
* MySQL (with InnoDB tables) and Postgres support foreign key references by default. SQLite does not unless `PRAGMA FOREIGN_KEYS=ON` is issued. We do so when opening the database connection, unless explicitly disabled with a global option, to get parity across implementations. **Note:** enabling this doesn't make any difference unless there are actual constraints in place.
* Only simple foreign keys are supported (because associations only support simple keys). This is the "80%" use case of course. Setting one of foreign key options in a situation where there is more than one primary key defined will cause the option to be ignored.
* SQL allows two ways to define foreign keys: "inline" (`someId INTEGER REFERENCES someTable(id) ON DELETE CASCADE`) or "standalone" (`FOREIGN KEY(someId) REFERENCES someTable(id) ON DELETE CASCADE` placed as a separate clause inside a `CREATE TABLE` statement). Since associations in sequelize create foreign key attributes the "inline" syntax is used, and `attributesToSQL` is taught how to add the relevant suffix to any "raw" attribute with the relevant meta-data attached. This works for Postgres and SQLite (MySQL ignores this syntax) requiring the "standalone" approach. For MySQL, we move the declaration to the end with a bit of string manipulation. This is analogous to how `PRIMARY KEY` is handled and allows this to be done without major refactoring.
* If we have foreign key constraints, the order in which tables are created matters: if `foo` has a foreign key to `bar` with a constraint, then `bar` has to exist before `foo` can be created. To make sure this happens, we use a topological sort of relationships (via the `Toposort-class` module) to sequence calls to `CREATE TABLE` in `sync()`. This also necessitates `sync()` being serialized, but given it's an "on startup" operation that shouldn't be too much of an issue.
* A similar concern happens with `dropAllTables()`, but here we don't have enough information to sort the list. Instead, we do one of two things: for SQLite and MySQL, we temporarily disable constraint checking. For Postgres, we use `DROP TABLE ... CASCADE` to drop relevant constraints when required. (MySQL and SQLite only support the former and Postgres only supports the latter). This is blunt, but OK given that the function is attempting to drop *all* the tables.
* For other calls to `dropTable()` the caller is expected to sequence calls appropriately, or wrap the call in `disableForeignKeyConstraints()` and `enableForeignKeyConstraints()` (MySQL and SQLite; no-ops in Postgres) and/or pass {cascade: true} in options (Postgres; no-op in MySQL and SQLite).

##### Enforcing a foreign key reference | Enforce Referencing

```js
var Series, Trainer, Video

// Series has a trainer_id=Trainer.id foreign reference key after we call Trainer.hasMany(series)
Series = sequelize.define('Series', {
  title:        DataTypes.STRING,
  sub_title:    DataTypes.STRING,
  description:  DataTypes.TEXT,

  // Set FK relationship (hasMany) with `Trainer`
  trainer_id: {
    type: DataTypes.INTEGER,
    references: "Trainer",
    referencesKey: "id"
  }
})

Trainer = sequelize.define('Trainer', {
  first_name: DataTypes.STRING,
  last_name:  DataTypes.STRING
});

// Video has a series_id=Series.id foreign reference key after we call Series.hasOne(Video)...
Video = sequelize.define('Video', {
  title:        DataTypes.STRING,
  sequence:     DataTypes.INTEGER,
  description:  DataTypes.TEXT,

  // set relationship (hasOne) with `Series`
  series_id: {
    type: DataTypes.INTEGER,
    references: "Series",
    referencesKey: "id"
  }
});

Series.hasOne(Video);
Trainer.hasMany(Series);
```