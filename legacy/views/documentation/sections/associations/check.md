#### Check associations

Sequelize `v1.5.0` introduced methods which allows you, to check if an object is already associated with another one (N:M only). Here is how you'd do it:

```js
// check if an object is one of associated ones:
Project.create({ /* */ }).success(function(project) {
  User.create({ /* */ }).success(function(user) {
    project.hasUser(user).success(function(result) {
      // result would be false
      project.addUser(user).success(function() {
        project.hasUser(user).success(function(result) {
          // result would be true
        })
      })
    })
  })
})

// check if all associated objects are as expected:
// let's assume we have already a project and two users
project.setUsers([user1, user2]).success(function() {
  project.hasUsers([user1]).success(function(result) {
    // result would be false
    project.hasUsers([user1, user2]).success(function(result) {
      // result would be true
    })
  })
})
```
