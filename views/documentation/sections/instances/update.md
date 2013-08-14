#### Updating / Saving / Persisting an instance | Update

Now lets change some values and save changes to the database... There are two ways to do that:

```js
// way 1
task.title = 'a very different title now'
task.save().success(function() {})

// way 2
task.updateAttributes({
  title: 'a very different title now'
}).success(function() {})
```

Since `v1.4.1` it's also possible to define which attributes should be saved when calling `save`. This is useful when you set attributes based on a previously defined object. E.g. if you get the values of an object via a form of a web app. Furthermore this is used internally for `updateAttributes`. This is how it looks like:

```js
task.title = 'foooo'
task.description = 'baaaaaar'
task.save(['title']).success(function() {
 // title will now be 'foooo' but description is the very same as before
})
```

Since `v1.7.0` you can now call an `update()` method on the model.

```js
Task.bulkCreate([
  {subject: 'programming', status: 'executing'},
  {subject: 'reading', status: 'executing'},
  {subject: 'programming', status: 'finished'}
]).success(function() {
  Task.update({status: 'inactive'} /* set attributes' value */, {subject: 'programming'} /* where criteria */).success(function() {
    Task.findAll().success(function(tasks) {
      console.log(tasks) // the 'programming' tasks will both have a status of 'inactive'
    })
  })
})
```