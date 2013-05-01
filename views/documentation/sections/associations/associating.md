### Associating objects

Because Sequelize is doing a lot of magic, you have to call `Sequelize#sync` after setting the associations! Doing so will allow you the following:

```js
Project.hasMany(Task)
Task.hasMany(Project)

Project.create()...
Task.create()...
Task.create()...

// save them... and then:
project.setTasks([task1, task2]).success(function() {
  // saved!
})

// ok now they are save... how do I get them later on?
project.getTasks().success(function(associatedTasks) {
  // associatedTasks is an array of tasks
})

// You can also pass filters to the getter method.
// They are equal to the options you can pass to a usual finder method.
project.getTasks({ where: 'id > 10' }).success(function(tasks) {
  // tasks with an id greater than 10 :)
})

// You can also only retrieve certain fields of a associated object.
// This example will retrieve the attibutes "title" and "id"
project.getTasks({attributes: ['title']}).success(function(tasks) {
  // tasks with an id greater than 10 :)
})
```

To remove created associations you can just call the set method without a specific id:

```js
// remove the association with task1
project.setTasks([task2]).success(function(associatedTasks) {
  // you will get task2 only
})

// remove 'em all
projects.setTasks([]).success(function(associatedTasks) {
  // you will get an empty array
})

// or remove 'em more directly
projects.removeTask(task1).success(function() {
  // it's gone
})

// and add 'em again
projects.addTask(task1).success(function() {
  // it's back again
})
```

You can of course also do it vice versa:

```js
// project is associated with task1 and task2
task2.setProject(null).success(function() {
  // and it's gone
})
```

For hasOne/belongsTo its basically the same:

```js
Task.hasOne(User, {as: "Author"})
Task#setAuthor(anAuthor)
```
