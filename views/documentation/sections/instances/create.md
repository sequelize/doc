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
