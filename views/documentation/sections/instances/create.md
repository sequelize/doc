#### Creating persistant instances | Create

Besides constructing objects, that needs an explicit save call to get stored in the database, there is also the possibility to do all those steps with one single command. It's called `create`.

```js
Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).success(function(task) {
  // you can now access the newly created task via the variable task
})
```

Sequelize `v1.5.0` introduced the possibility to define attributes which can be set via the create method. This can be especially very handy if you create database entries based on a form which can be filled by a user. Using that would for example allow you to restrict the `User` model to set only a username and an address but not an admin flag:

```js
User.create({ username: 'barfooz', isAdmin: true }, [ 'username' ]).success(function(user) {
  // let's assume the default of isAdmin is false:
  console.log(user.values) // => { username: 'barfooz', isAdmin: false }
})
```
Sequelize `v1.7.0` introduced the possibility to create multiple records at once

```js
User.bulkCreate([
  { username: 'barfooz', isAdmin: true },
  { username: 'foo', isAdmin: true },
  { username: 'bar', isAdmin: false }
]).success(function() { // Notice: There are no arguments here, as of right now you'll have to...
  User.findAll().success(function(users) {
    console.log(users) // ... in order to get the array of user objects
  })
})
```

```bulkCreate()``` by default will try to build every attribute within the DAO/Factory. For instance...

```js
User.bulkCreate([
  { username: 'foo' },
  { username: 'bar' }
]).success(function() {
  // most likely wont happen due to the model having an "id" column that's a sequence/serial/auto increment primary key (which isn't allowed to be null)
}).error(function() {
  // will most likely happen since every object became
  // { id: null, username: <username> }
})
```

To remedy this problem, ```bulkCreate()``` accepts a second parameter (an array) to let it know which fields you want to build explicitly

```js
User.bulkCreate([
  { username: 'foo' },
  { username: 'bar'}
], ['username']).success(function() {
  // will succeed due to .create() omiting values that can't be null, etc.
})

// an easier way to keep track of which fields you want to explicitly build, use Object.keys() like so
var objects = [
  { username: 'foo' },
  { username: 'bar' }
]

User.bulkCreate(objects, Object.keys(objects)).success(function() {
  // ...
})
```
