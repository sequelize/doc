### Reloading instances | Reload

If you need to get your instance in sync, you can use the method `reload`. It will fetch the current data from the database and overwrite the attributes of the model on which the method has been called on.

```js
Person.find({ where: { name: 'john' } }).success(function(person) {
  person.name = 'jane'
  console.log(person.name) // 'jane'

  person.reload().success(function() {
    console.log(person.name) // 'john'
  })
})
```
