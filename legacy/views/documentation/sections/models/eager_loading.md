#### Eager loading

When you are retrieving data from the database there is a fair chance that you also want to get their associations. This is possible since `v1.6.0` and is called eager loading. The basic idea behind that, is the use of the attribute `include` when you are calling `find` or `findAll`. Lets assume the following setup:

```js
var User = sequelize.define('User', { name: Sequelize.STRING })
  , Task = sequelize.define('Task', { name: Sequelize.STRING })
  , Tool = sequelize.define('Tool', { name: Sequelize.STRING })

Task.belongsTo(User)
User.hasMany(Task)
User.hasMany(Tool, { as: 'Instruments' })

sequelize.sync().done(function() {
  // this is where we continue ...
})
```

OK. So, first of all, let's load all tasks with their associated user.

```js
Task.findAll({ include: [ User ] }).success(function(tasks) {
  console.log(JSON.stringify(tasks))

  /*
    [{
      "name": "A Task",
      "id": 1,
      "createdAt": "2013-03-20T20:31:40.000Z",
      "updatedAt": "2013-03-20T20:31:40.000Z",
      "UserId": 1,
      "user": {
        "name": "John Doe",
        "id": 1,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z"
      }
    }]
  */
})
```

Notice that the accessor of the associated data is the name of the model in camelcase with lowercased first character. Also the accessor is singular as the association is one-to-something.

Next thing: Loading of data with many-to-something associations!

```js
User.findAll({ include: [ Task ] }).success(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "tasks": [{
        "name": "A Task",
        "id": 1,
        "createdAt": "2013-03-20T20:31:40.000Z",
        "updatedAt": "2013-03-20T20:31:40.000Z",
        "UserId": 1
      }]
    }]
  */
})
```

Notice that the accessor is plural. This is because the association is many-to-something.

If an association is aliased (using the `as` option), you *must* specify this alias when including the model. Notice how the user's `Tool`s are aliased as `Instruments` above. In order to get that right you have to specify the model you want to load, as well as the alias:

```js
User.findAll({ include: [{ model: Tool, as: 'Instruments' }] }).success(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "instruments": [{
        "name": "Toothpick",
        "id": 1,
        "createdAt": null,
        "updatedAt": null,
        "UserId": 1
      }]
    }]
  */
})
```

**Final note:** If you include an object which is not associated, Sequelize will throw an error.

```js
Tool.findAll({ include: [ User ] }).success(function(tools) {
  console.log(JSON.stringify(tools))
})

// Error: User is not associated to Tool!
```
