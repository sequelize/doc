### Changes in Sequelize v1.4.1

Sequelize v1.4.1 was released on May 3rd, 2012. Major changes are deprecation of Node.JS < v0.6.0, the possibility of selective saves, some additions to the sequelize binary, a often requested complete function for asynchronous progresses, as well as the chance to customize the logging strategy.

### Deprecation of Node.JS < v0.6.0

From now on, Sequelize officially dropped support for Node.JS 0.5.x and earlier versions. The reason for that, is the incompatibility of BusterJS with those versions. Even if the tests are failing in earlier releases, v1.4.0 was completely compatible with Node.JS v0.5 and v0.4. So feel free to use it, as well as trying out newer releases of Sequelize. But as I pretty much want to move on to BusterJS, keeping compatibility with those outdated versions seems not acceptable at all.

### Selective saving of instances

[kioopi](https://github.com/kioopi) added the possibility to save only a very selection of attributes when calling the save function on instances. That means, you can modify an object in a very massive way and afterwards only save some specific changes. This for example important for forms in a webapp, which could affect sensitive data. So in order to force save of specific fields only you can iterate over the passed data, set all the new values and afterwards define which, of those changes should actually get saved. This is how it works:

```js
task.title = 'foooo'
task.description = 'baaaaaar'
task.save(['title']).success(function() {
 // title will now be 'foooo' but description is the very same as before
})
```

### Migration skeleton creation

The `sequelize` binary was extended. It can now generate migration skeletons, which have the name of the current timestamp plus a passed name. This is how it works:

```bash
sequelize -c [migration-name]
sequelize --create-migration [migration-name]
--> creates the migrations folder
--> creates a file with current timestamp + migration-name
--> migration-name has the default 'unnamed-migration'
```

#### The complete function for asynchronicity

When you request data from the database or save things in it, you can now wait for the success or the error case using the function complete. The first param will be the probably happened error, the second one the results of the success case. Again, the function as an alias called done. Here you are:

```js
Model.findAll().complete(function(err, result) { /* bar */ })
Model.findAll().done(function(err, result) { /* bar */ })
```

#### Custom logging

In the new version the logging strategy was modified. In previous version it was possible to specify `logging: false` as option while instantiating Sequelize. Any other value would have caused a logging to the stdout via `console.log`. From now on however, the default value is a function calling `console.log`. Passing false will be handled as special case and result in an empty function. Passing another function however will cause Sequelize to call that function once something is logged. The first and only parameter of that function will be the string.

#### Bug fixes

v1.4.1 fixed the following bugs:

* fixed quotation for sqlite statements (thanks to vlmonk)
* fixed timestamp parsing in migratios (thanks to grn)

