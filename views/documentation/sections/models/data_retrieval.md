### Data retrieval a.k.a. finders

Finder methods are designed to get data from the database. The returned data isn't just a plain object, but instances of one of the defined classes. Check the next major chapter about instances for further information. But as those things are instances, you can e.g. use the just describe expanded instance methods. So, here is what you can do:

#### find - Search for one specific element in the database

```js
// search for known ids
Project.find(123).success(function(project) {
  // project will be an instance of Project and stores the content of the table entry
  // with id 123. if such an entry is not defined you will get null
})

// search for attributes
Project.find({ where: {title: 'aProject'} }).success(function(project) {
  // project will be the first entry of the Projects table with the title 'aProject' || null
})

// since v1.3.0: only select some attributes and rename one
Project.find({
  where: {title: 'aProject'},
  attributes: ['id', ['name', 'title']]
}).success(function(project) {
  // project will be the first entry of the Projects table with the title 'aProject' || null
  // project.title will contain the name of the project
})
```

#### findOrCreate - Search for a specific element or create it if not available

The method `findOrCreate` can be used to check if a certain element is already existing in the database. If that is the case the method will result in a respective instance. If the element does not yet exist, it will be created.

Let's assume we have an empty database with a `User` model which has a `username` and a `job`.

```js
User.findOrCreate({ username: 'sdepold' }, { job: 'Technical Lead JavaScript' }).success(function(user) {
  console.log(user.values)

  /*
    {
      username: 'sdepold',
      job: 'Technical Lead JavaScript',
      id: 1,
      createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
      updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
    }
  */
})
```

The code created a just created instance.

So when we already have an instance ...

```js
User.create({ username: 'fnord', job: 'omnomnom' }).success(function() {
  User.findOrCreate({ username: 'fnord' }, { job: 'something else' }).success(function(user) {
    console.log(user.values)

    /*
      {
        username: 'fnord',
        job: 'omnomnom',
        id: 2,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      }
    */
  })
})
```

... the existing entry will not be changed. See the `job` of the second user.

#### findAll - Search for multiple elements in the database

```js
// find multiple entries
Project.findAll().success(function(projects) {
  // projects will be an array of all Project instances
})

// also possible:
Project.all().success(function(projects) {
  // projects will be an array of all Project instances
})

// search for specific attributes - hash usage
Project.findAll({ where: { name: 'A Project' } }).success(function(projects) {
  // projects will be an array of Project instances with the specified name
})

// search with string replacements
Project.findAll({ where: ["id > ?", 25] }).success(function(projects) {
  // projects will be an array of Projects having a greater id than 25
})

// search within a specific range
Project.findAll({ where: { id: [1,2,3] } }).success(function(projects) {
  // projects will be an array of Projects having the id 1, 2 or 3
  // this is actually doing an IN query
})

// or
Project.findAll({ where: "name = 'A Project'" }).success(function(projects) {
  // the difference between this and the usage of hashes (objects) is, that string usage
  // is not sql injection safe. so make sure you know what you are doing!
})
```

Of course you can pass a some options to the finder methods, to get more relevant data:

```js
// define the order of the queried data
Project.findAll({order: 'title DESC'})

// limit the results of the query
Project.findAll({limit: 10})

// step over some elements
// this only works with a specified limit
Project.findAll({offset: 10, limit: 2})
```

#### count - Count the occurences of elements in the database

There is also a method for counting database objects:

```js
Project.count().success(function(c) {
  console.log("There are " + c + " projects!")
})

Project.count({ where: ["id > ?", 25] }).success(function(c) {
  console.log("There are " + c + " projects with an id greater than 25.")
})
```

#### max - Get the greatest value of a specific attribute within a specific table

And here is a method for getting the max value of an attribute:

```js
/*
  Let's assume 3 person objects with an attribute age.
  The first one is 10 years old,
  the second one is 5 years old,
  the third one is 40 years old.
*/
Project.max('age').success(function(max) {
  // this will return 40
})
```
