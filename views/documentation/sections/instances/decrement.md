### Decrementing certain values of an instance

In order to decrement values of an instance without running into concurrency issues, you may use `decrement`.

First of all you can define a field and the value you want to add to it.

```js
User.find(1).success(function(user) {
  user.decrement('my-integer-field', 2).success(/* ... */)
})
```

Second, you can define multiple fields and the value you want to add to them.

```js
User.find(1).success(function(user) {
  user.decrement([ 'my-integer-field', 'my-very-other-field' ], 2).success(/* ... */)
})
```

Third, you can define an object containing fields and its decrement values.

```js
User.find(1).success(function(user) {
  user.decrement({
    'my-integer-field':    2,
    'my-very-other-field': 3
  }).success(/* ... */)
})
```
