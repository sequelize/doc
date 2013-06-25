#### Property getters and setters

It is possible to define 'object-property' getters and setter functions on your models, these can be used both for 'protecting' properties that map to database fields and for defining 'pseudo' properties.

Getters and Setters can be defined in 2 ways (you can mix and match these 2 approaches!):

+ as part of a single property definition
+ as part of a model options

**N.B.:** If a getter or setter is defined in both places then the function found in the relevant property definition will always take precedence.

##### Defining as part of a property

```js
var Foo = sequelize.define('Foo', {
  title: {
    type     : Sequelize.STRING,
    allowNull: false,
    get      : function()  { /* do your magic here and return something! */ },
    set      : function(v) { /* do your magic with the input here! */ }
  }
});
```

##### Defining as part of the model options

Below is an example of defining the getters and setters in the model options, notice the `title_slug` getter, it shows how you can define `pseudo` properties on your models! (the `slugify()` function was taken from the [Underscore.String module](https://github.com/epeli/underscore.string), it is slightly modified here so that the example remains self-contained), note that the `this.title` reference in the `title_slug` getter function will trigger a call to the `title` getter function. if you do not want that then
use the `getDataValue()` method ([see below](#get_and_set_helper_funcs)).

```js


  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return ;
  };

var slugify function(str) {
  var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøśùúüûñçżź",
      to    = "aaaaaaaaceeeeeiiiilnoooooosuuuunczz",
      regex = new RegExp('[' + from.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + ']', 'g');

  if (str == null) return '';

  str = String(str).toLowerCase().replace(regex, function(c) {
    return to.charAt(from.indexOf(c)) || '-';
  });

  return str.replace(/[^\w\s-]/g, '').replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}

var Foo = sequelize.define('Foo', {
  title: {
    type     : Sequelize.STRING,
    allowNull: false,
  }
}, {

  getterMethods   : {
    title       : function()  { /* do your magic here and return something! */ },
    title_slug  : function()  { return slugify(this.title); }
  },

  setterMethods   : {
    title       : function(v) { /* do your magic with the input here! */ },
  }
});
```


##### <a id="get_and_set_helper_funcs"></a> Helper functions for use inside getter/setter definitions

+ retrieving an underlying property value? always use `this.getDataValue()`, e.g.:

```js
/* a getter for 'title' property */
function() {
    return this.getDataValue('title');
}
```
+ setting an underlying property value? always use `this.setDataValue()`, e.g.:

```js
/* a setter for 'title' property */
function(title) {
    return this.setDataValue('title', title.toString().toLowerCase());
}
```

**N.B.:** It is important to stick to using the `setDataValue()` and `getDataValue()` functions (as opposed to accessing the underlying "data values" property directly) - doing so protects your custom getters and setters from changes in the underlying model implementations (i.e. how and where data values are stored in your model instances)


##### Setter methods and Object Initialization


!!!TODO: write about how setters affect object initialization (both creating new objects with Model.build and retrieving existing objects from storage) !!!!!
