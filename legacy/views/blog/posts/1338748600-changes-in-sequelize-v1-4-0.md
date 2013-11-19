### Changes in Sequelize v1.4.0

Sequelize v1.4.0 was released in April 2012. Besides some important bugfixes, the new version shipped also major improvements as support for PostgreSQL, compatibility to JSON.stringify, connection pooling for MySQL, the possibility to set a date’s default value to the current date, as well as the chance to customize the logging strategy.

#### PostgreSQL support

Due to the great work of [Shawn Woodtke](https://github.com/swoodtke), Sequelize is from v1.4.0 on compatible to PostgreSQL. This means it can for example be used with Heroku! Massive win :) The documentation about that feature can be found [here](http://sequelizejs.com/documentation#usage-dialects).

So, if you want to use PostgreSQL, you need to install the library `pg`. The best way to do it is either automagically via `npm install pg --save` or manually via adding `pg` to the `package.json` file:

```js
{
  "name": "my project",
  // ...
  "dependencies": {
    // ...
    "pg": "0.6.x",
    "sequelize": "1.3.x",
    // ...
  }
  // ...
}
```

Furthermore it is necessary to define the dialect when instantiating Sequelize:

```js
var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres'
})
```

#### JSON.stringify

One often reported issue was the incompatibility of objects to JSON.stringify. In the past you got an error saying something about circular references. Instead of that error, you will now get a map of all attributes and it’s values.

#### Connection pooling (MySQL)

[Meg Sharkey](https://github.com/megshark) added (again :D) support for connection pooling for MySQL. You can use pooling in order to reduce db connection overload and to increase speed of db queries. To activate it, you have to do this:

```js
var sequelize = new Sequelize('database', 'username', 'password', {
  pool: { maxConnections: 5, maxIdleTime: 30 }
})
```

#### Default value for date attributes

You can now define, that a date’s value should be the current time by default. This is how to do it:

```js
var User = sequelize.define('users', {
  myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
})
```

#### Bug fixes

`v1.4.0` fixed the following bugs:

* fixed booleans in sqlite (thanks to alexstrat)
* fixed forced sync of many-to-many associations (thanks to SirUli)
* Fixed date handling in sqlite (thanks to iizukanao)
