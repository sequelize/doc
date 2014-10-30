### Class Transaction
The transaction object is used to identify a running transaction. It is created by calling `Sequelize.transaction()`.

To run a query under a transaction, you should pass the transaction in the options object.

======

#### `ISOLATION_LEVELS`
The possible isolations levels to use when starting a transaction

```js
{
  READ_UNCOMMITTED: "READ UNCOMMITTED",
  READ_COMMITTED: "READ COMMITTED",
  REPEATABLE_READ: "REPEATABLE READ",
  SERIALIZABLE: "SERIALIZABLE"
}
```


======

#### `LOCK`
Possible options for row locking. Used in conjuction with `find` calls:

```js
t1 // is a transaction
Model.findAll({
  where: ...
}, {
  transaction: t1,
  lock: t1.LOCK.UPDATE,
  lock: t1.LOCK.SHARE
})
```

======

#### `commit()` -> `this`
Commit the transaction


======

#### `rollback()` -> `this`
Rollback (abort) the transaction


======

_This document is automatically generated based on source code comments. Please do not edit it directly, as your changes will be ignored. Please write on <a href="irc://irc.freenode.net/#sequelizejs">IRC</a>, open an issue or a create a pull request if you feel something can be improved. For help on how to write source code documentation see [JSDoc](http://usejsdoc.org) and [dox](https://github.com/tj/dox)_