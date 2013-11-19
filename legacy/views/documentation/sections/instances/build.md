#### Building a not-persistant instance | Build

In order to create instances of defined classes just do as follows. You might recognize the syntax if you coded Ruby in the past. Using the `build`-method will return an unsaved object, which you explicitly have to save.

```js
var project = Project.build({
  title: 'my awesome project',
  description: 'woot woot. this will make me a rich man'
})

var task = Task.build({
  title: 'specify the project idea',
  description: 'bla',
  deadline: new Date()
})
```

Built instances will automatically get default values when they were defined:

```js
// first define the model
var Task = sequelize.define('Project', {
  title: Sequelize.STRING,
  rating: { type: Sequelize.STRING, defaultValue: 3 }
})

// now instantiate an object
var task = Task.build({title: 'very important task'})

task.title  // ==> 'very important task'
task.rating // ==> 3
```

To get it stored in the database, use the `save`-method and catch the events … if needed:

```js
project.save().success(function() {
  // my nice callback stuff
})

task.save().error(function(error) {
  // mhhh, wth!
})

// you can also build, save and access the object with chaining:
Task
  .build({ title: 'foo', description: 'bar', deadline: new Date() })
  .save()
  .success(function(anotherTask) {
    // you can now access the currently saved task with the variable anotherTask... nice!
  }).error(function(error) {
    // Ooops, do some error-handling
  })
```
