#### Executing raw SQL queries | Raw queries

As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can utilize the function `sequelize.query`.

Here is how it works:

```js
// Arguments for raw queries
sequelize.query('your query', [, callee], [, options], [, replacements])

// Quick example
sequelize.query("SELECT * FROM myTable").success(function(myTableRows) {
  console.log(myTableRows)
})

// Callee is the model definition. This allows you to easily map a query
// to a predefined model for sequelizejs e.g:
sequelize.query('SELECT * FROM projects', Projects).success(function(projects){
  console.log(projects) // Each record will now be mapped to the Projects DAO/factory.
});

/*
Options is an object with the following keys:
{
  logging: console.log, // a function (or false) for logging your queries
  plain: false,         // if plain is true, then sequelize will return all of the records within an array, otherwise it will return a single object/first record returned.
  raw: false            // Set this to true if you don't have a model definition for your query
}
*/

// Note the second argument being null!
// Even if we declared a callee here, the raw: true would supersede and return a raw object.
sequelize.query('SELECT * FROM projects', null, {raw: true}).success(function(projects) {
  console.log(projects)
})

/*
Replacements in a query can be done in two different ways, either using named parameters (starting with :), or unnamed, represented by a ?

The syntax used depends on the fourth argument passed to the function:
  * If an array is passed, ? will be replaced in the order that they appear in the array
  * If an object is passed, :key will be replaced with the keys from that object. If the object contains keys not found in the query or vice verca, 
    an exception will be thrown.
*/
sequelize.query('SELECT * FROM projects WHERE status = ?', null, {raw: true}, ['active']).success(function(projects) {
  console.log(projects)
})

sequelize.query('SELECT * FROM projects WHERE status = :status ', null, {raw: true}, { status: 'active' }).success(function(projects) {
  console.log(projects)
})
```

**One note:** If the attribute names of the table contain dots, the resulting objects will get a nesting:

```js
sequelize.query('select 1 as `foo.bar.baz`').success(function(rows) {
  console.log(JSON.stringify(rows))

  /*
    [{
      "foo": {
        "bar": {
          "baz": 1
        }
      }
    }]
  */
})
```
