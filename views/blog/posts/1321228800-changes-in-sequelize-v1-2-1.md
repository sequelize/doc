### Changes in Sequelize v1.2.1

This post summarizes changes in Sequelize v1.2.1. It is highly recommended to read this post due to some changes in default values and interfaces. There are also some minor, but very cool new features.

#### Global options for models

In Sequelize v1.2.1 I’ve refactored the not so officially communicated possibility to define Sequelize-wide options, which are passed to the Models in multiple cases. I will explain the usage in the following, for now let’s see how it was before and how it has changed:

```js
var sequelize = new Sequelize(database, user, password, {
  queryOptions: {},
  defineOptions: {
    /*
      here you can pass options, which you want to be defined for all models.
      e.g. underscored: true, which will turn all model usages into underscore usage.
      look into the model definition options for more information
    */
  },
  syncOptions: {
    /*
      also not really senseful atm, but you could do this:
      force: true —> this will
    */
  }
}
```

The new API is this way:

```js
var sequelize = new Sequelize(database, user, password, {
  query:  {},
  define: {},
  sync:   {}
}
```

And here is what you can do with it:

```js
var sequelize = new Sequelize(database, user, password, {
  queryOptions: { /* this has no further sense so far */ },
  defineOptions: {
    /*
      here you can pass options, which you want to be defined for all models.
      e.g. underscored: true, which will turn all model usages into underscore usage.
      look into the model definition options for more information
    */
  },
  syncOptions: {
    /*
      also not really senseful atm, but you could do this:
      force: true —> this will always drop the table before creating it again, when calling sync
    */
  }
}
```

Here is more realistic use case:

```js
// Instead of doing this ...
var Person = sequelize.define('Person', {/*attributes*/}, { underscored: true })
var Task = sequelize.define('Task', {/*attributes*/}, { underscored: true })

// ... you can do this:
var sequelize = new Sequelize(db, user, pw, { define: {underscored: true} })
var Person = sequelize.define('Person', {/*attributes*/})
var Task = sequelize.define('Task', {/*attributes*/})
```

Hope you like it :)
