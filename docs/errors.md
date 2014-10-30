### Class Errors
Sequelize provides a host of custom error classes, to allow you to do easier debugging. All of these errors are exposed on the sequelize object and the sequelize constructor.
All sequelize errors inherit from the base JS error object.


======
<a name="baseError">
### `new BaseError()`
The Base Error all Sequelize Errors inherit from.

__Aliases:__ Error

======

### `new ValidationError(message, [errors])`
Validation Error. Thrown when the sequelize validation has failed. The error contains an `errors` property,
which is an array with 1 or more ValidationErrorItems, one for each validation that failed.


##### Params:
| Name | Type | Description |
| ---- | ---- | ----------- |
| message | string | Error message |
| [errors] | Array | Array of ValidationErrorItem objects describing the validation errors  |


======

#### `get(path)`
Gets all validation error items for the path / field specified.


##### Params:
| Name | Type | Description |
| ---- | ---- | ----------- |
| path | string | The path to be checked for error items |


======

#### `errors()`
An array of ValidationErrorItems

======

### `new DatabaseError()`
A base class for all database related errors.

======

#### `parent()`
The database specific error which triggered this one

======

#### `sql()`
The SQL that triggered the error

======

### `new TimeoutError()`
Thrown when a database query times out because of a deadlock

======

### `new UniqueConstraintError()`
Thrown when a unique constraint is violated in the database

======

### `new ForeignKeyConstraintError()`
Thrown when a foreign key constraint is violated in the database

======

#### `message()`
The message from the DB.

======

#### `fields()`
The fields of the unique constraint

======

#### `value()`
The value(s) which triggered the error

======

#### `index()`
The name of the index that triggered the error

======

### `new ValidationErrorItem(message, type, path, value)`
Validation Error Item
Instances of this class are included in the `ValidationError.errors` property.


##### Params:
| Name | Type | Description |
| ---- | ---- | ----------- |
| message | string | An error message |
| type | string | The type of the validation error |
| path | string | The field that triggered the validation error |
| value | string | The value that generated the error |


======

_This document is automatically generated based on source code comments. Please do not edit it directly, as your changes will be ignored. Please write on <a href="irc://irc.freenode.net/#sequelizejs">IRC</a>, open an issue or a create a pull request if you feel something can be improved. For help on how to write source code documentation see [JSDoc](http://usejsdoc.org) and [dox](https://github.com/tj/dox)_