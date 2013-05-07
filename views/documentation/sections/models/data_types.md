#### Data types

Sequelize currently supports the following datatypes:

```js
Sequelize.STRING  // VARCHAR(255)
Sequelize.TEXT    // TEXT
Sequelize.INTEGER // INTEGER
Sequelize.BIGINT  // BIGINT
Sequelize.DATE    // DATETIME
Sequelize.BOOLEAN // TINYINT(1)
Sequelize.FLOAT   // FLOAT

Sequelize.ENUM('value 1', 'value 2') // An ENUM with allowed values 'value 1' and 'value 2'
Sequelize.DECIMAL(10, 2)             // DECIMAL(10,2)
Sequelize.ARRAY(Sequelize.TEXT)      // Defines an array. PostgreSQL only.
```

Usage in object notation:

```js
// for enums:
sequelize.define('model', {
  states: {
    type:   Sequelize.ENUM,
    values: ['active', 'pending', 'deleted']
  }
})
```
