#### Lodash.js

You can access all the methods of lodash like this:

```js
Sequelize.Utils._.each(/* ... */)
Sequelize.Utils._.map(/* ... */)
Sequelize.Utils._...
```

Also Sequelize ships the Underscore extension `underscore.string`, which allows nifty string manipulation:

```js
Sequelize.Utils._.camelize('something') // Something
```

Check out the page of [Lodash](http://lodash.com/), [Underscore](http://underscorejs.org/) and [underscore.string](https://github.com/epeli/underscore.string) for further information.
