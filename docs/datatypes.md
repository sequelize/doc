### Class DataTypes
A convenience class holding commonly used data types. The datatypes are used when definining a new model using `Sequelize.define`, like this:
```js
sequelize.define('model', {
  column: DataTypes.INTEGER
})
```
When defining a model you can just as easily pass a string as type, but often using the types defined here is beneficial. For example, using `DataTypes.BLOB`, mean
that that column will be returned as an instance of `Buffer` when being fetched by sequelize.

Some data types have special properties that can be accessed in order to change the data type. For example, to get an unsigned integer with zerofill you can do `DataTypes.INTEGER.UNSIGNED.ZEROFILL`.
The order you access the properties in do not matter, so `DataTypes.INTEGER.ZEROFILL.UNSIGNED` is fine as well. The available properties are listed under each data type.

To provide a length for the data type, you can invoke it like a function: `INTEGER(2)`

Three of the values provided here (`NOW`, `UUIDV1` and `UUIDV4`) are special default values, that should not be used to define types. Instead they are used as shorthands for 
defining default values. For example, to get a uuid field with a default value generated following v1 of the UUID standard:
```js
sequelize.define('model', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true 
  }
})
```


======

#### `STRING`
A variable length string. Default length 255

Available properties: `BINARY`


======

#### `CHAR`
A fixed length string. Default length 255

Available properties: `BINARY`


======

#### `TEXT`
An unlimited length text column

======

#### `INTEGER`
A 32 bit integer.

Available properties: `UNSIGNED`, `ZEROFILL`


======

#### `BIGINT`
A 64 bit integer.

Available properties: `UNSIGNED`, `ZEROFILL`


======

#### `DATE`
A datetime column

======

#### `BOOLEAN`
A boolean / tinyint column, depending on dialect

======

#### `FLOAT`
Floating point number. Accepts one or two arguments for precision

Available properties: `UNSIGNED`, `ZEROFILL`


======

#### `NOW`
A default value of the current timestamp

======

#### `BLOB`
Binary storage. Available lengths: `tiny`, `medium`, `long`


======

#### `DECIMAL`
Decimal number. Accepts one or two arguments for precision

Available properties: `UNSIGNED`, `ZEROFILL`


======

#### `UUID`
A column storing a unique univeral identifier. Use with `UUIDV1` or `UUIDV4` for default values.

======

#### `UUIDV1`
A default unique universal identifier generated following the UUID v1 standard

======

#### `UUIDV4`
A default unique universal identifier generated following the UUID v2 standard

======

#### `HSTORE`
A key / value column. Only available in postgres.

======

#### `VIRTUAL`
A virtual value that is not stored in the DB. This could for example be useful if you want to provide a default value in your model
that is returned to the user but not stored in the DB.

You could also use it to validate a value before permuting and storing it. Checking password length before hashing it for example:
```js
sequelize.define('user', {
  password_hash: DataTypes.STRING
  password: {
    type: DataTypes.VIRTUAL,
    set: function (val) {
       this.setDataValue('password', val);
       this.setDataValue('password_hash', this.salt + val); 
     },
     validate: {
        isLongEnough: function (val) {
          if (val.length < 7) {
            throw new Error("Please choose a longer password")
         }
      }
    }
  }
})
```
In the above code the password is stored plainly in the password field so it can be validated, but is never stored in the DB. 
__Aliases:__ NONE

======

#### `ENUM`
An enumeration. `DataTypes.ENUM('value', 'another value')`.


======

#### `ARRAY()`
An array of `type`, e.g. `DataTypes.ARRAY(DataTypes.DECIMAL)`. Only available in postgres.

======

_This document is automatically generated based on source code comments. Please do not edit it directly, as your changes will be ignored. Please write on <a href="irc://irc.freenode.net/#sequelizejs">IRC</a>, open an issue or a create a pull request if you feel something can be improved. For help on how to write source code documentation see [JSDoc](http://usejsdoc.org) and [dox](https://github.com/tj/dox)_