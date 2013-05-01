### Basic usage

To get the ball rollin' you first have to create an instance of Sequelize. Use it the following way:

```js
var sequelize = new Sequelize('database', 'username'[, 'password'])
```

This will save the passed database credentials and provide all further methods. Furthermore you can specify a non-default host/port:

```js
var sequelize = new Sequelize('database', 'username', 'password', {
  host: "my.server.tld",
  port: 12345
})
```

If you just don't have a password:

```js
var sequelize = new Sequelize('database', 'username')
// or
var sequelize = new Sequelize('database', 'username', null)
```
