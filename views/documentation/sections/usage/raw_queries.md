### Executing raw SQL queries

As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can utilize the function `sequelize.query`.

Here is how it works:

```js
sequelize.query("SELECT * FROM myTable").success(function(myTableRows) {
  console.log(myTableRows)
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
