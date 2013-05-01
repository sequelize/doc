### Destroying / Deleting persistant instances

Once you created an object and got a reference to it, you can delete it from the database. The relevant method is `destroy`:

```js
Task.create({ title: 'a task' }).success(function(task) {
  // now you see me...

  task.destroy().success(function() {
    // now i'm gone :)
  })
})
```
