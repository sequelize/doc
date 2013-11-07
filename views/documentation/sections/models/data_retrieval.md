#### Data retrieval a.k.a. finders | Finders

Finder methods are designed to get data from the database. The returned data isn't just a plain object, but instances of one of the defined classes. Check the next major chapter about instances for further information. But as those things are instances, you can e.g. use the just describe expanded instance methods. So, here is what you can do:

##### find - Search for one specific element in the database | find

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

##### findOrCreate - Search for a specific element or create it if not available | findOrCreate

The method `findOrCreate` can be used to check if a certain element is already existing in the database. If that is the case the method will result in a respective instance. If the element does not yet exist, it will be created.

Let's assume we have an empty database with a `User` model which has a `username` and a `job`.

```js
User.findOrCreate({ username: 'sdepold' }, { job: 'Technical Lead JavaScript' }).success(function(user, created) {
  console.log(user.values)
  console.log(created)

  /*
    {
      username: 'sdepold',
      job: 'Technical Lead JavaScript',
      id: 1,
      createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
      updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
    }
    created: true
  */
})
```

The code created a new instance.

So when we already have an instance ...

```js
User.create({ username: 'fnord', job: 'omnomnom' }).success(function() {
  User.findOrCreate({ username: 'fnord' }, { job: 'something else' }).success(function(user, created) {
    console.log(user.values)
    console.log(created)

    /*
      {
        username: 'fnord',
        job: 'omnomnom',
        id: 2,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      }
      created: false
    */
  })
})
```

... the existing entry will not be changed. See the `job` of the second user, and the fact that created was false.

##### findAndCountAll - Search for multiple elements in the database, returns both data and total count | findAndCountAll

This is a convienience method that combines `findAll()` and `count()` (see below), this is useful when dealing with queries related to pagination
where you want to retrieve data with a `limit` and `offset` but also need to know the total number of records that match the query.

The success handler will always receive an object with to properties:

+ `count`   - an integer, total number records (matching the where clause)
+ `rows`    - an array of objects, the records (matching the where clause) within the limit/offset range

```js
Project.findAndCountAll({where: ["title LIKE 'foo%'"], offset: 10, limit: 2}).success(function(result) {
  console.log(result.count);
  console.log(result.rows);
});
```

The options [object] that you pass to `findAndCountAll()` is the same as for `findAll()` (described below).

##### findAll - Search for multiple elements in the database | findAll

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

// since v1.7.0 we can now improve our where searches
Project.findAll({
  where: {
    id: {
      gt: 6,              // id > 6
      gte: 6,             // id >= 6
      lt: 10,             // id < 10
      lte: 10,            // id <= 10
      ne: 20,             // id != 20
      between: [6, 10],   // BETWEEN 6 AND 10
      nbetween: [11, 15]  // NOT BETWEEN 11 AND 15
      like: '%sdepold'    // LIKE '%monkey'
      nlike: 'cat'        // NOT LIKE 'cat'
    }
  }
})
```

##### Manipulating the dataset with limit, offset, order and group | limit / offset / order / group
To get more relevant data, you can use limit, offset, order and grouping:

```js
// limit the results of the query
Project.findAll({ limit: 10 })

// step over the first 10 elements
Project.findAll({ offset: 10 })

// step over the first 10 elements, and take 2
Project.findAll({ offset: 10, limit: 2 })
```

The syntax for grouping and ordering are equal, so below it is only explained with a single example for group, and the rest for order. Everything you see below can also be done for group

```js
Project.findAll({order: 'title DESC'})
// yields ORDER BY title DESC 

Project.findAll({group: 'name'})
// yields GROUP BY name
```

Notice how in the two examples above, the string provided is inserted verbatim into the query, i.e. column names are not escaped. When you provide a string to order / group, this will always be the case as per v 1.7.0. If you want to escape column names, you should provide an array of arguments, even though you only want to order / group by a single column

```js
something.find({
  order: [
    'name',
    // will return `name`
    'username DESC', 
    // will return `username DESC` -- i.e. don't do it!
    ['username', 'DESC'], 
    // will return `username` DESC
    sequelize.fn('max', sequelize.col('age')), 
    // will return max(`age`)
    [sequelize.fn('max', sequelize.col('age')), 'DESC'], 
    // will return max(`age`) DESC
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'], 
    // will return otherfunction(`col1`, 12, 'lalala') DESC
    [sequelize.fn('otherfunction', sequelize.fn('awesomefunction', sequelize.col('col'))), 'DESC'] 
    // will return otherfunction(awesomefunction(`col`)) DESC, This nesting is potentially infinite!
    [{ raw: 'otherfunction(awesomefunction(`col`))' }, 'DESC']
    // This won't be quoted, but direction will be added
  ]
})
```

To recap, the elements of the order / group array can be the following:

* String - will be quoted
* Array - first element will be qouted, second will be appended verbatim
* Object -
  * Raw will be added verbatim without quoting
  * Everything else is ignored, and if raw is not set, the query will fail
* Sequelize.fn and Sequelize.col returns functions and quoted cools

##### Raw queries | raw
Sometimes you might be expecting a massive dataset that you just want to display, without manipulation. For each row you select, Sequelize creates a *DAO*, with functions for update, delete, get associations etc. If you have thousands of rows, this might take some time. If you only need the raw data and don't want to update anything, you can do like this to get the raw data.

```js
// Are you expecting a masssive dataset from the DB, and don't want to spend the time building DAOs for each entry?
// You can pass an extra query option to get the raw data instead:
Project.findAll({ where: ... }, { raw: true })
```

##### count - Count the occurences of elements in the database | count

There is also a method for counting database objects:

```js
Project.count().success(function(c) {
  console.log("There are " + c + " projects!")
})

Project.count({ where: ["id > ?", 25] }).success(function(c) {
  console.log("There are " + c + " projects with an id greater than 25.")
})
```

##### max - Get the greatest value of a specific attribute within a specific table | max

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

##### min - Get the least value of a specific attribute within a specific table | min

And here is a method for getting the min value of an attribute:

```js
/*
  Let's assume 3 person objects with an attribute age.
  The first one is 10 years old,
  the second one is 5 years old,
  the third one is 40 years old.
*/
Project.min('age').success(function(max) {
  // this will return 5
})
```
