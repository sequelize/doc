#### Asynchronicity

Since `v1.3.0` there are multiple ways of adding listeners to asynchronous requests. First of all, each time you call a finder method or save an object, sequelize triggers asynchronous logic. To react to the success or the failure (or both) of the request, you can do the following:

```js
// the old, pre-v1.3.0 way
Model.findAll().on('success', function(models) { /* foo */ })
Model.findAll().on('failure', function(err) { /* bar */ })

// the new, >=v1.3.0 way
// each one is valid
Model.findAll().on('success', function(models) { /* foo */ })
Model.findAll().success(function(models) { /* foo */ })
Model.findAll().ok(function(models) { /* foo */ })

// Model.findAll().on('failure', function(err) { /* bar */ }) ==> invalid since v1.5.0
Model.findAll().on('error', function(err) { /* bar */ }) //   ==> new since v1.5.0
Model.findAll().error(function(err) { /* bar */ })
Model.findAll().failure(function(err) { /* bar */ })
Model.findAll().fail(function(err) { /* bar */ })

Model.findAll().complete(function(err, result) { /* bar */ })
Model.findAll().done(function(err, result) { /* bar */ })
```

**Please notice:** Since v1.5.0 the 'error' event is used to notify about errors. If such events aren't caught however, Node.JS will throw an error. So you would probably like to catch them :D
