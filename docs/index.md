# Sequelize

The Sequelize library provides easy access to MySQL, MariaDB, SQLite or PostgreSQL databases by mapping database entries to objects and vice versa.

To put it in a nutshell, it's an ORM (Object-Relational-Mapper). The library is written entirely in JavaScript and can be used in the Node.JS environment.

* ### [Getting started](articles/getting-started)
* ###[Use with Express](articles/express)
* ###[Use on Heroku](articles/heroku)
* ###[Fork on Github](https://github.com/sequelize/sequelize)

## Easy installation

```cmd    
$ npm install sequelize
$ npm install mysql
```

## Simple usage
```js
var Sequelize = require('sequelize')
  , sequelize = new Sequelize('database', 'username', 'password')

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
})

sequelize.sync().success(function() {
  User.create({
    username: 'sdepold',
    birthday: new Date(1986, 06, 28)
  }).success(function(sdepold) {
    console.log(sdepold.values)
  })
})
```

## Trusted and used by

<a href="http://www.shutterstock.com"><img style="max-width:300px;" alt="Shutterstock" src="./images/users/shutterstock.png"></a>

<a href="http://www.clevertech.biz"><img style="max-width:300px;" alt="Clevertech" src="./images/users/clevertech.png"></a>

<a href="http://www.metamarkets.com"><img style="max-width:300px;" alt="Metamarkets" src="./images/users/metamarkets.png"></a>

<a href="http://www.filsh.net"><img style="max-width:300px;" alt="Filsh" src="./images/users/filsh.png"></a>

(c)
Sascha Depold,
[et al.](https://github.com/sequelize/sequelize-doc/graphs/contributors)
2006 - 2014

[Imprint][16]