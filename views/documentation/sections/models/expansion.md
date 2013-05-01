### Expansion of models

Sequelize allows you to pass custom methods to a model and it's instances. Just do the following:

```js
var Foo = sequelize.define('Foo', { /* attributes */}, {
  classMethods: {
    method1: function(){ return 'smth' }
  },
  instanceMethods: {
    method2: function() { return 'foo' }
  }
})

// Example:
Foo.method1()
Foo.build().method2()
```

Of course you can also access the instance's data and generate virtual getters:

```js
var User = sequelize.define('User', { firstname: Sequelize.STRING, lastname: Sequelize.STRING }, {
  instanceMethods: {
    getFullname: function() {
      return [this.firstname, this.lastname].join(' ')
    }
  }
})

// Example:
User.build({ firstname: 'foo', lastname: 'bar' }).getFullname() // 'foo bar'
```

You can also set custom methods to all of your models during the instantiation:

```js
var sequelize = new Sequelize('database', 'username', 'password', {
  // Other options during the initialization could be here
  define: {
    classMethods: {
      method1: function() {},
      method2: function() {}
    },
    instanceMethods: {
      method3: function() {}
    }
  }
})

// Example:
var Foo = sequelize.define('Foo', { /* attributes */});
Foo.method1()
Foo.method2()
Foo.build().method3()
```
