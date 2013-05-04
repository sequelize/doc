#### Database synchronization

When starting a new project you won't have a database structure and using Sequelize you won't need to. Just specify your model structures and let the library do the rest. Currently supported is the creation and deletion of tables:

```js
// Create the tables:
Project.sync() // will emit success or failure event
Task.sync() // will emit success or failure event

// Force the creation!
Project.sync({force: true}) // this will drop the table first and re-create it afterwards

// drop the tables:
Project.drop() // will emit success or failure event
Task.drop() // will emit success or failure event

// event handling:
Project.[sync|drop]().success(function() {
  // ok ... everything is nice!
}).error(function(error) {
  // oooh, did you entered wrong database credentials?
})
```

Because synchronizing and dropping all of your tables might be a lot of lines to write, you can also let Sequelize do the work for you:

```js
// create all tables... now!
sequelize.sync() // will emit success or failure

// force it!
sequelize.sync({force: true}) // emit ... nomnomnom

// want to drop 'em all?
sequelize.drop() // I guess you've got it (emit)

// emit handling:
sequelize.[sync|drop]().success(function() {
  // woot woot
}).error(function(error) {
  // whooops
})
```
