### Changes in Sequelize v1.3.0

Sequelize v1.3.0 was just released and comes with some funky new features and some minor refactorings, which you should know about. Most important things are: Migrations, validations, cross-database support and new event-listener notation.

#### Model#all is now a function and not a getter

In earlier versions it was possible to get all entries of a model with the following command:

```js
User.all.success(function(users){})
```

This has changed and the all-getter was refactored to be a function. This way it is more consistent to the rest of the API (.find(), .findAll(), etc.). So it’s now:

```js
User.all().success(function(users){})
```

#### Use the new util module for node 0.6.x compatibility

All references to the `sys`-module have been removed and replaced with the util-module. To be honest, I have no idea when that module has been available, but it actually is in 0.4.12 and above. So sequelize is compatible to all versions of node having the `util`-module.

#### QueryChainer can now run serially

The QueryChainer has been extended in order to run migrations serially. The basic idea is to pass an object, the to be called function’s name and some parameters. After adding some items you can run them with chainer.runSerially(). You can find detailed information about this [in the documentation](/documentation#utils-querychainer).

#### Association definitions are now chainable

Each association declaration now returns the ModelFactory. So it is possible to chain such declarations. Here is an example:

```js
Person.hasOne(House).hasMany(Address)
```

#### Validations

[hiddentao](https://github.com/hiddentao) has added validations to sequelize. This is pretty awesome and comes with a handy preset of known validations, but can be extended with custom validations as well. You can find detailed information about this in [the documentation](/documentation#models-validations).

#### jQuery-like event listeners

Because the `.on(‘foo’, function(){})`-syntax really drove me nuts, I’ve added some shorter notations. Inspired by jQuery (I know it has already changed in v1.7) you can now do the following:

```js
Model
  .findAll()
  .success(function(models) { /* foo */ })

Model
  .findAll()
  .error(function(err) { /* bar */ })
```

[There are also some aliases, which can be found here.](/documentation#misc-asynchronicity)

**Please notice:** I will replace `.on(‘failure’)` with `.on(‘error’)` in future releases. This will be done, due to being more native in the node environment. Doing so will throw an error each time you don’t listen for the ‘error’-event, what is actually pretty good!

#### aliasing for select queries

You can now rename attributes of a model for only a specific query. The following example gets a specific user and renames the original name-attribute to username. On database side this is a simple SELECT name as username FROM table;.

```js
Model
  .find({
    where: 'id = 1',
    attributes: ['id', ['name', 'username']]
  })
  .success(function(user) {
    console.log(user.name) // undefined
    console.log(user.username) // something
  })
```

#### cross-database support

Sequelize has been refactored to be open for other SQL dialects. Doing so I’ve added examplary sqlite support. If you want to use it, make sure to install the sqlite3 package manually. [You can find more information about that here.](/documentation#usage-dialects)

#### migrations

Another new awesome feature is migration support. With this mechanism it is now possible to modify the database manually. This should of course not be mixed with the sync-function of sequelize. In order to execute migrations there is a new sequelize binary which you should look at. just run node_modules/.bin/sequelize -h to see what’s possible and make sure [to visit the documentation](/documentation#migrations-the-binary).

#### ex-expresso-ed the project :D

I moved all tests to jasmine and removed all expresso-related things.

I hope you will like it!
