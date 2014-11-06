<style type="text/css">
table {
  width:100%;
}

th:nth-child(1),
td:nth-child(1) {
  width: 35%;
  word-break: break-all;
}

td:nth-child(2),
td:nth-child(2) {
  width: 20%;
  word-break: break-word;
}

td,
th {
  padding: 6px 13px;
  border: 1px solid #ddd;
}
tr:nth-child(2n) {
  background-color: #f8f8f8;
}
</style>

<a name="promise"></a>
# Class Promise
[View code](https://github.com/sequelize/sequelize/blob/c4584892582e63a5b68d0e803a04abd2bf78d24c/lib/promise.js#L25)
A slightly modified version of bluebird promises. This means that, on top of the methods below, you can also call all the methods listed on the link below.

The main difference is that sequelize promises allows you to attach a listener that will be called with the generated SQL, each time a query is run.

The sequelize promise class works seamlessly with other A+/thenable libraries, with one exception.
If you want to propagate SQL events across `then`, `all` calls etc., you must use sequelize promises exclusively.

### Mixes:
* https://github.com/petkaantonov/bluebird/blob/master/API.md

***

<a name="on"></a>
## `on(evt, fct)`
[View code](https://github.com/sequelize/sequelize/blob/c4584892582e63a5b68d0e803a04abd2bf78d24c/lib/promise.js#L108)
Listen for events, event emitter style. Mostly for backwards compat. with EventEmitter


**Params:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| evt | String |  |
| fct | Function |  |


***

<a name="emit"></a>
## `emit(type, value(s)*)`
[View code](https://github.com/sequelize/sequelize/blob/c4584892582e63a5b68d0e803a04abd2bf78d24c/lib/promise.js#L127)
Emit an event from the emitter

**Params:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| type | string | The type of event |
| value(s)* | any | All other arguments will be passed to the event listeners |


***

<a name="success"></a>
## `success(onSuccess)` -> `this`
[View code](https://github.com/sequelize/sequelize/blob/c4584892582e63a5b68d0e803a04abd2bf78d24c/lib/promise.js#L163)
Listen for success events.

```js
promise.success(function (result) {
 //...
});
```


**Params:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| onSuccess | function |  |

__Aliases:__ ok

***

<a name="error"></a>
## `error(onError)` -> `this`
[View code](https://github.com/sequelize/sequelize/blob/c4584892582e63a5b68d0e803a04abd2bf78d24c/lib/promise.js#L188)
Listen for error events

```js
promise.error(function (err) {
 //...
});
```


**Params:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| onError | function |  |

__Aliases:__ fail, failure

***

<a name="done"></a>
## `done(onDone)` -> `this`
[View code](https://github.com/sequelize/sequelize/blob/c4584892582e63a5b68d0e803a04abd2bf78d24c/lib/promise.js#L209)
Listen for both success and error events.

```js
promise.done(function (err, result) {
 //...
});
```


**Params:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| onDone | function |  |

__Aliases:__ complete

***

<a name="sql"></a>
## `sql(onSQL)` -> `this`
[View code](https://github.com/sequelize/sequelize/blob/c4584892582e63a5b68d0e803a04abd2bf78d24c/lib/promise.js#L234)
Attach a function that is called every time the function that created this emitter executes a query.

**Params:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| onSQL | function |  |


***

<a name="proxy"></a>
## `proxy(promise, [options])` -> `this`
[View code](https://github.com/sequelize/sequelize/blob/c4584892582e63a5b68d0e803a04abd2bf78d24c/lib/promise.js#L247)
Proxy every event of this promise to another one.


**Params:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| promise | SequelizePromise | The promise that should receive the events. |
| [options] | Object |  |
| [options.events] | Array | An array of the events to proxy. Defaults to sql, error and success |


***

_This document is automatically generated based on source code comments. Please do not edit it directly, as your changes will be ignored. Please write on <a href="irc://irc.freenode.net/#sequelizejs">IRC</a>, open an issue or a create a pull request if you feel something can be improved. For help on how to write source code documentation see [JSDoc](http://usejsdoc.org) and [dox](https://github.com/tj/dox)_