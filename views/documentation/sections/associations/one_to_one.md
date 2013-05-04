#### One-To-One associations | One-To-One

One-To-One associations are connecting one source with exactly one target. In order to define a proper database schema, Sequelize utilizes the methods `belongsTo` and `hasOne`. You can use them as follows:

```js
var User = sequelize.define('User', {/* ... */})
var Project = sequelize.define('Project', {/* ... */})

// One-way associations
Project.hasOne(User)

/*
  In this example hasOne will add an attribute ProjectId to the User model!
  Furthermore, Project.prototype will gain the methods getUser and setUser according
  to the first parameter passed to define. If you have underscore style
  enabled, the added attribute will be project_id instead of ProjectId.

  You can also define the foreign key, e.g. if you already have an existing
  database and want to work on it:
*/

Project.hasOne(User, { foreignKey: 'initiator_id' })

/*
  Because Sequelize will use the model's name (first parameter of define) for
  the accessor methods, it is also possible to pass a special option to hasOne:
*/

Project.hasOne(User, { as: 'Initiator' })
// Now you will get Project#getInitiator and Project#setInitiator

// Or let's define some self references
var Person = sequelize.define('Person', { /* ... */})

Person.hasOne(Person, {as: 'Father'})
// this will add the attribute FatherId to Person

// also possible:
Person.hasOne(Person, {as: 'Father', foreignKey: 'DadId'})
// this will add the attribute DadId to Person

// In both cases you will be able to do:
Person#setFather
Person#getFather

// If you need to join a table twice you can double join the same table
Team
  .hasOne(Game, {foreignKey : 'homeTeamId'});
  .hasOne(Game, {foreignKey , 'awayTeamId'});
Game
  .belongsTo(Team);


// Since v1.3.0 you can also chain associations:
Project
  .hasOne(User)
  .hasOne(Deadline)
  .hasOne(Attachment)
```

To get the association working the other way around (so from `User` to `Project`), it's necessary to do this:

```js
var User = sequelize.define('User', {/* ... */})
var Project = sequelize.define('Project', {/* ... */})

// One-way back associations
Project.belongsTo(User)

/*
  In this example belongsTo will add an attribute UserId to the Project model!
  That's the only difference to hasMany. Self references are working the very same way!
*/
```
