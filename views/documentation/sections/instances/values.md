### Values of an instance | Values

If you log an instance you will notice, that there is a lot of additional stuff. In order to hide such stuff and reduce it to the very interesting information, you can use the `values`-attribute. Calling it will return only the values of an instance.

```js
Person.create({
  name: 'Rambow',
  firstname: 'John'
}).success(function(john) {
  console.log(john.values)
})

// result:

// { name: 'Rambow',
//   firstname: 'John',
//   id: 1,
//   createdAt: Tue, 01 May 2012 19:12:16 GMT,
//   updatedAt: Tue, 01 May 2012 19:12:16 GMT
// }
```

**Hint:** You can also transform an instance into JSON by using `JSON.stringify(instance)`. This will basically return the very same as `values`.
