## Getting started

### Introduction

This article explains the basic concepts of Sequelize. You will learn how to use the supported dialects, which ways of database setup approaches are available and how common scenarios can be achieved.

### Premise

We will skip the very basic things and directly dive into the Sequelize related stuff. Here is a list of things that have to be in place before you can start:

* Node.JS at v0.8 or higher
* One of the supported databases / SQLite bindings
* The credentials for the respective database
* A basic understanding of how databases are working
* Optional but recommended: Coffee :)

### Setting up a project

Now that your computer is prepared and your coffee sits next to your keyboard, we can finally get started. First things first: Create a directory and initialize it with NPM!

```bash
$ mkdir my-project
$ cd my-project
$ npm init
```

NPM will ask you a couple of questions. Answer them or just hit the return key until it's satisfied. Once done, you can install Sequelize and the connector for your database of choice.
    
```bash
npm install --save sequelize
npm install --save pg       # for postgres
npm install --save mysql    # for mysql
npm install --save sqlite3  # for sqlite
npm install --save mariasql # for mariasql
```

### Connecting to the database

Open the created directory in your favorite text editor and add a new file called `app.js` with the following content.

```js
var Sequelize = require('sequelize')
  , sequelize = new Sequelize('database_name', 'username', 'password', {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    })

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })
```

### Managing the schema of your database

Sequelize supports two way of schema management. You can either define so called migrations, which are programmatically changing your database's structure. Or you can let Sequelize create the tables for you.

While the first possibility of using `migrations` takes more time to setup, it's most likely the way to go, if you want to deploy your application on many different server environments. The reason for that is based on the fact, that migrations are consistently changing your database according to the current state of the schema.

However, the automated way of using Sequelize's function `sequelize.sync` will probably be a good choice on your local machine or if you just want to quickly spin up a prototype.

As this article is for beginners, we will skip migrations for now and take a closer look at the automated way.

#### Defining a model

In order to let Sequelize create a schemas in the database, you need to describe, what kind of data you want to store. This can be done with `sequelize.define`:
    
```js
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
})
```

This will define a user model that has a username and password. Furthermore, Sequelize will automatically add the columns `id`, `createdAt` and `updatedAt`.

#### Synchronizing the schema

As we want to store data in the database, we need to create a representation of the model.
    
```js
sequelize
  .sync({ force: true })
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while creating the table:', err)
     } else {
       console.log('It worked!')
     }
  })
```

Once executed, the database will contain a table `Users` (note the plural) with the columns:

* id - INT(11)
* username - VARCHAR(255)
* password - VARCHAR(255)
* createdAt - DATETIME
* updatedAt - DATETIME

Please note, that `{ force: true }` will remove all existing tables and re-create them afterwards.

#### Configuration

You might not need the timestamps or you might not want the plural of the model's name as table name, right? Luckily there are configuration possibilities for that.

```js
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  tableName: 'my_user_table', // this will define the table's name
  timestamps: false           // this will deactivate the timestamp columns
})
```

And just in case you want to customize the timestamp field names, you can do it like this:

```js
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  updatedAt: 'last_update',
  createdAt: 'date_of_creation'
})
```

### Creating and persisting instances

Sequelize allows the creation of instances in two ways. You can either `build` an object and `save` it afterwards. Or you can directly `create` an instance in the database:
    
```js
var user = User.build({
  username: 'john-doe',
  password: generatePasswordHash('i-am-so-great')
})

user
  .save()
  .complete(function(err) {
    if (!!err) {
      console.log('The instance has not been saved:', err)
    } else {
      console.log('We have a persisted instance now')
    }
  })
```

This persists the instance in a two step way. If you want to do everything at once, use the following approach:
   
```js
User
  .create({
    username: 'john-doe',
    password: generatePasswordHash('i-am-so-great')
  })
  .complete(function(err, user) {
    /* ... */
  })
```

### Reading data from the database

Every defined model has finder methods, with which you can read the database. Searching for a specific item can be done with `Model.find`. Retrieval of multiple items needs the use of `Model.findAll`.
    
```js
User
  .find({ where: { username: 'john-doe' } })
  .complete(function(err, johnDoe) {
    if (!!err) {
      console.log('An error occurred while searching for John:', err)
    } else if (!johnDoe) {
      console.log('No user with the username "john-doe" has been found.')
    } else {
      console.log('Hello ' + johnDoe.username + '!')
      console.log('All attributes of john:', johnDoe.values)
    }
  })
```

Please note that there won't be any error if no user with the name "john-doe" has been found. This is intended, as there is not internal or authentication error.

### Defining associations

A very common use case is the definition of associations between two or even more models. Once declared, Sequelize will know how to query the database to get or set associated data. Furthermore it will be able to automatically create the respective foreign key columns for you.

Before taking a closer look at the code, it is critical to understand some details about the three different association types.

#### One to one

An association between one source and one target is called "one to one" or 1:1 association. It consists of a source that **has one** target and a target that **belongs to** a source.

Sequelize expects a foreign key in the target's schema. That means that there has to be an attribute respectively a column in the target's table.

```js    
var Source = sequelize.define('Source', {})
  , Target = sequelize.define('Target', {})

Source.hasOne(Target)
Target.belongsTo(Source)

sequelize
  .sync({ force: true })
  .complete(function(err) {
    // Even if we didn't define any foreign key or something else,
    // instances of Target will have a column SourceId!
  })
```

#### One to many

An association between one source and many target is called "one to many" or 1:N association. It consists of a source that **has many** targets and some targets that are **belonging to** a source.

Sequelize expects a foreign key in the target's schema. That means that there has to be an attribute respectively a column in the target's table.
    
```js
var Source = sequelize.define('Source', {})
  , Target = sequelize.define('Target', {})

Source.hasMany(Target)
Target.belongsTo(Source)

sequelize
  .sync({ force: true })
  .complete(function(err) {
    // Even if we didn't define any foreign key or something else,
    // instances of Target will have a column SourceId!
  })
```

#### Many to many

An association between many sources and many targets is called "many to many" or N:M association. It consists of sources that **have many** targets and some targets that **have many** a source.

Sequelize expects a junction table which contains a foreign key to the source table and a foreign key to the target table. A row in the table connects a source with a target.

```js
var Source = sequelize.define('Source', {})
  , Target = sequelize.define('Target', {})

Source.hasMany(Target)
Target.hasMany(Source)

sequelize
  .sync({ force: true })
  .complete(function(err) {
    // Even if we didn't define any foreign key or something else,
    // Sequelize will create a table SourcesTargets.
  })
```

#### Getting/Setting associations

Defining associations is nice, but won't give you any advantage if you cannot read or set associations. Of course Sequelize will add respective functions to your models. Depending on the type of association you will find different methods:
    
```js
var Source = sequelize.define('Source', {})
  , Target = sequelize.define('Target', {})

Source.hasOne(Target)
Target.belongsTo(Source)

Source.create({}).complete(function(err, source) {
  Target.create({}).complete(function(err, target) {
    // Set the association
    source.setTarget(target).complete(function(err) {
      // Get the association
      source.getTarget().complete(function(err, _target) {
        console.log(_target.values)
        /*
          {
            id: 1,
            createdAt: Sun Dec 08 2013 11:46:42 GMT+0100 (CET),
            updatedAt: Sun Dec 08 2013 11:46:42 GMT+0100 (CET),
            SourceId: 1
          }
        */
      })
    })
  })
})
```

#### Clearing associations

Assuming we already defined the models (as in the previous code example) and synced the schema with the database, we can clear the associations like this:

```js  
source.setTarget(null).complete(function(err) {
  source.getTarget().complete(function(err, target) {
    console.log(target)
    // null
  })
})
```

#### Adding / removing associations

For 1:N and N:M associations it makes sense to not only set the associations,but also to add or remove associations. Furthermore checking for an association can be handy.
    
```js
var Source = sequelize.define('Source', {})
  , Target = sequelize.define('Target', {})

Source.hasMany(Target)
Target.belongsTo(Source)

Source.create({}).complete(function(err, source) {
  Target.create({}).complete(function(err, target1) {
    Target.create({}).complete(function(err, target2) {
      // Set the association
      source.setTargets([target1, target2]).complete(function(err) {
        // Get the association
        source.getTargets().complete(function(err, targets) {
          console.log(targets.length) // = 2
          // Remove an association
          source.removeTarget(target1).complete(function(err) {
            source.getTargets().complete(function(err, targets) {
              console.log(targets.length) // = 1
              // Check for an association
              source.hasTarget(target1).complete(function(err, hasTarget) {
                console.log(hasTarget) // false
                // Adding an association
                source.addTarget(target1).complete(function(err) {
                  source.getTargets().complete(function(err, targets) {
                    console.log(targets.length) // = 2
                    source.hasTarget(target1).complete(function(err, hasTarget) {
                      console.log(hasTarget) // true
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
```

### A combined example

Now that you know the basics of Sequelize, you might want to see everything in a single program.
    
```js
var Sequelize = require('sequelize')
  , sequelize = new Sequelize('database_name', 'username', 'password')
  , User      = sequelize.define('User', {
                  username: Sequelize.STRING,
                  password: Sequelize.STRING
                })

sequelize.sync({ force: true }).complete(function(err) {
  User.create({ username: 'john', password: '1111' }).complete(function(err, user1) {
    User.find({ username: 'john' }).complete(function(err, user2) {
      console.log(user1.values, user2.values)
    })
  })
})
```

### What's next?

As there are some more advanced features in Sequelize which are a bit inappropriate for this article, you can check the following resources for further advice:

* [Migrations](docs/migrations)
* [Data types](docs/models#data-types)
* [Configuration of the model](doca/models#configuration)
* [Validations](docs/models#validations)
* [Finders](docs/models#finders)
* [Associations](docs/associations)