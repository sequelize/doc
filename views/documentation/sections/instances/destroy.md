#### Destroying / Deleting persistant instances | Destroy

Once you created an object and got a reference to it, you can delete it from the database. The relevant method is `destroy`:

```js
Task.create({ title: 'a task' }).success(function(task) {
  // now you see me...

  task.destroy().success(function() {
    // now i'm gone :)
  })
})

// you can also add a where search criteria
Task.bulkCreate([...]).success(function() {
    Task.destroy({subject: 'programming', status: 'completed'}).success(function() {
      Task.findAll().success(function(tasks) {
        console.log(tasks) // tasks that don't match the above criteria
      })
    })
  })
})
```
