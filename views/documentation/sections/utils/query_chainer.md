### QueryChainer

Because you will want to save/create/delete several items at once and just go on after all of them are saved, Sequelize provides the `QueryChainer` module. It can be used like this:

```js
var chainer = new Sequelize.Utils.QueryChainer
chainer.add(/* Query | EventEmitter */)
chainer.run().success(function(){}).error(function(errors){})
```

And a real world example:

```js
var chainer = new Sequelize.Utils.QueryChainer
var Task    = sequelize.define('Task', /* ... */)

chainer
  .add(Task.drop())
  .add(Task.sync())

for(var i = 0; i < 20; i++)
  chainer.add(Task.create({}))

chainer
  .run()
  .success(function(){})
  .error(function(errors){})
```

It is also possible to force a serial run of the query chainer by using the following syntax:

```js
new Sequelize.Utils.QueryChainer()
  .add(Model, 'function', [param1, param2])
  .add(Model, 'function2', [param1, param2])
  .runSerially()
  .success(function() { /* no problems :) */ })
  .error(function(err) { /* hmm not good :> */ })

// and with options:

new Sequelize.Utils.QueryChainer()
  .add(Model, 'function', [param1, param2], {
    // Will be executed before Model#function is called
    before: function(model) {},

    /*
      Will be executed after Model#function was called
      and the function emitted a success or error event.
      If the following success option is passed, the function
      will be executed after the success function.
    */
    after: function(migration) {},

    // Will be executed if Model#function emits a success event.
    success: function(migration, callback) {}
  })
  // skipOnError: don't execute functions once one has emitted an failure event.
  .runSerially({ skipOnError: true })
  .success(function() { /* no problems :) */ })
  .error(function(err) { /* hmm not good :> */ })
```

If the success callbacks of the added methods are passing values, they can be utilized in the actual `success` method of the query chainer:

```js
chainer.add(Project.getTasks())
chainer.add(Project.getTeam())
chainer.run().success(function(results){
  var tasks = results[0]
  var team = results[1]
})
```
