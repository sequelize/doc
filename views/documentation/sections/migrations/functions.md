#### Functions

Using the `migration` object describe before, you will have access to most of already introduced functions. Furthermore there are some other methods, which are designed to actually change the database schema.

##### createTable(tableName, attributes, options) | createTable

This method allows creation of new tables. It is allowed to pass simple or complex attribute definitions. You can define the encoding of the table and the table's engine via options

```js
migration.createTable(
  'nameOfTheNewTable',
  {
    attr1: DataTypes.STRING,
    attr2: DataTypes.INTEGER,
    attr3: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    engine: 'MYISAM', // default: 'InnoDB'
    charset: 'latin1' // default: null
  }
)
```

##### dropTable(tableName) | dropTable

This method allows deletion of an existing table.

```js
migration.dropTable('nameOfTheExistingTable')
```

##### dropAllTables() | dropAllTables

This method allows deletion of all existing tables in the database.

```js
migration.dropAllTables()
```

##### renameTable(before, after) | renameTable

This method allows renaming of an existing table.

```js
migration.renameTable('Person', 'User')
```

##### showAllTables() | showAllTables

This method returns the name of all existing tables in the database.

```js
migration.showAllTables().success(function(tableNames) {})
```

##### describeTable(tableName) | describeTable

This method returns an array of hashes containing information about all attributes in the table.

```js
migration.describeTable('Person').success(function(attributes) {
  /*
    attributes will be something like:

    {
      name: {
        type:         'VARCHAR(255)', // this will be 'CHARACTER VARYING' for pg!
        allowNull:    true,
        defaultValue: null
      },
      isBetaMember: {
        type:         'TINYINT(1)', // this will be 'BOOLEAN' for pg!
        allowNull:    false,
        defaultValue: false
      }
    }
  */
})
```

##### addColumn(tableName, attributeName, dataTypeOrOptions) | addColumn

This method allows adding columns to an existing table. The data type can be simple or complex.

```js
migration.addColumn(
  'nameOfAnExistingTable',
  'nameOfTheNewAttribute',
  DataTypes.STRING
)

// or

migration.addColumn(
  'nameOfAnExistingTable',
  'nameOfTheNewAttribute',
  {
    type: DataTypes.STRING,
    allowNull: false
  }
)
```

##### removeColumn(tableName, attributeName) | removeColumn

This method allows deletion of a specific column of an existing table.

```js
migration.removeColumn('Person', 'signature')
```

##### changeColumn(tableName, attributeName, dataTypeOrOptions) | changeColumn

This method changes the meta data of an attribute. It is possible to change the default value, allowance of null or the data type. Please make sure, that you are completely describing the new data type. Missing information are expected to be defaults.

```js
migration.changeColumn(
  'nameOfAnExistingTable',
  'nameOfAnExistingAttribute',
  DataTypes.STRING
)

// or

migration.changeColumn(
  'nameOfAnExistingTable',
  'nameOfAnExistingAttribute',
  {
    type: DataTypes.FLOAT,
    allowNull: false,
    default: 0.0
  }
)
```

##### renameColumn(tableName, attrNameBefore, attrNameAfter) | renameColumn

This methods allows renaming attributes.

```js
migration.renameColumn('Person', 'signature', 'sig')
```

##### addIndex(tableName, attributes, options) | addIndex

This methods creates indexes for specific attributes of a table. The index name will be automatically generated if it is not passed via in the options (see below).

```js
// This example will create the index person_firstname_lastname
migration.addIndex('Person', ['firstname', 'lastname'])
```

```js
// This example will create a unique index with the name SuperDuperIndex using the optional 'options' field.
// Possible options:
// - indicesType: UNIQUE|FULLTEXT|SPATIAL
// - indexName: The name of the index. Default is <tableName>_<attrName1>_<attrName2>
// - parser: For FULLTEXT columns set your parser
// - indexType: Set a type for the index, e.g. BTREE. See the documentation of the used dialect
migration.addIndex(
  'Person',
  ['firstname', 'lastname'],
  {
    indexName: 'SuperDuperIndex',
    indicesType: 'UNIQUE'
  }
)
```

##### removeIndex(tableName, indexNameOrAttributes) | removeIndex

This method deletes an existing index of a table.

```js
migration.removeIndex('Person', 'SuperDuperIndex')

// or

migration.removeIndex('Person', ['firstname', 'lastname'])
```
