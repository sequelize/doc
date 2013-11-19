#### Associating objects

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

Adding associations to a relation with a custom join table can be done in two ways (continuing with the associations defined in the previous chapter):

```js
// Either by adding a property with the name of the join table model to the object, before creating the association
project.UserProjects = {
  status: 'active'
}
u.addProject(project)
            
// Or by providing a second argument when adding the association, containing the data that should go in the join table
u.addProject(project, { status: 'active' })


// When associating multiple objects, you can combine the two options above. In this case the second argument 
// will be treated as a defaults object, that will be used if no data is provided
project1.UserProjects = {
    status: 'inactive'
}

u.setProjects([project1, project2], { status: 'active' })
// The code above will record inactive for project one, and active for project two in the join table
```

When getting data on an association that has a custom join table, the data from the join table will be returned as a DAO instance:

```js
u.getProjects().success(function(projects) {
  var project = projects[0]

  if (project.UserProjects.status === 'active') {
    // .. do magic

    // since this is a real DAO instance, you can save it directly after you are done doing magic
    project.UserProjects.save()
  }
})
```

If you only need some of the attributes from the join table, you can provide an array with the attributes you want:

```js
// This will select only name from the Projects table, and only status from the UserProjects table
user.getProjects({ attributes: ['name'], joinTableAttributes: ['status']})
```