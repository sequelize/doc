#### Validations

In `v1.3.0` model validations have been added. They allow you to specify format/content/inheritance validations for each attribute of the model. You can perform the validation by calling the `validate()` method on an instance before saving. The validations are implemented by [node-validator](https://github.com/chriso/node-validator), and we are currently using v. 1.1.1.

**Note:** In `v1.7.0` validations will now be called when executing the `build()` or `create()` functions.

```js
var ValidateMe = sequelize.define('Foo', {
  foo: {
    type: Sequelize.STRING,
    validate: {
      is: ["[a-z]",'i'],        // will only allow letters
      not: ["[a-z]",'i'],       // will not allow letters
      isEmail: true,            // checks for email format (foo@bar.com)
      isUrl: true,              // checks for url format (http://foo.com)
      isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true,             // checks for IPv4 (129.89.23.1)
      isIPv6: true,             // checks for IPv6 format
      isAlpha: true,            // will only allow letters
      isAlphanumeric: true      // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true           // will only allow numbers
      isInt: true,              // checks for valid integers
      isFloat: true,            // checks for valid floating point numbers
      isDecimal: true,          // checks for any numbers
      isLowercase: true,        // checks for lowercase
      isUppercase: true,        // checks for uppercase
      notNull: true,            // won't allow null
      isNull: true,             // only allows null
      notEmpty: true,           // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo',          // force specific substrings
      notIn: [['foo', 'bar']],  // check the value is not one of these
      isIn: [['foo', 'bar']],   // check the value is one of these
      notContains: 'bar',       // don't allow specific substrings
      len: [2,10],              // only allow values with length between 2 and 10
      isUUID: 4,                // only allow uuids
      isDate: true,             // only allow date strings
      isAfter: "2011-11-05",    // only allow date strings after a specific date
      isBefore: "2011-11-05",   // only allow date strings before a specific date
      max: 23,                  // only allow values <= 23
      min: 23,                  // only allow values >= 23
      isArray: true,            // only allow arrays
      isCreditCard: true,       // check for valid credit card numbers

      // custom validations are also possible:
      isEven: function(value) {
        if(parseInt(value) % 2 != 0) {
          throw new Error('Only even values are allowed!')
        // we also are in the model's context here, so this.otherField
        // would get the value of otherField if it existed
        }
      }
    }
  }
})
```

Note that where multiple arguments need to be passed to the built-in validation
functions, the arguments to be passed must be in an array. But if a single array
argument is to be passed, for instance an array of acceptable strings for
`isIn`, this will be interpreted as multiple string arguments instead of one
array argument. To work around this pass a single-length array of arguments,
such as `[['one', 'two']]` as shown above.

To use a custom error message instead of that provided by node-validator, use an
object instead of the plain value or array of arguments, for example a validator
which needs no argument can be given a custom message with

```js
isInt: {
  msg: "Must be an integer number of pennies"
}
```

or if arguments need to also be passed add an <code>args</code> property:

```js
isIn: {
  args: [['en', 'zh']],
  msg: "Must be English or Chinese"
}
```

When using custom validator functions the error message will be whatever message
the thrown `Error` object holds.

See [the node-validator project](https://github.com/chriso/node-validator) for
more details on the built in validation methods.

**Hint:** You can also define a custom function for the logging part. Just pass
a function. The first parameter will be the string that is logged.

##### Validators and `allowNull`

Since `v1.7.0` if a particular field of a model is set to allow null (with
`allowNull: true`) and that value has been set to `null`, its validators do not
run. This means you can, for instance, have a string field which validates its
length to be at least 5 characters, but which also allows `null`.

##### Model validations

Since `v1.7.0`, validations can also be defined to check the model after the
field-specific validators. Using this you could, for example, ensure either
neither of <code>latitude</code> and <code>longitude</code> are set or both, and
fail if one but not the other is set.

Model validator methods are called with the model object's context and are
deemed to fail if they throw an error, otherwise pass. This is just the same as
with custom field-specific validators.

Any error messages collected are put in the validation result object alongside
the field validation errors, with keys named after the failed validation
method's key in the `validate` option object. Even though there can only be one
error message for each model validation method at any one time, it is presented
as a single string error in an array, to maximize consistency with the field
errors. (Note that the structure of `validate()`'s output is scheduled to change
in `v2.0` to avoid this awkward situation. In the mean time, an error is issued
if a field exists with the same name as a custom model validation.)

An example:

```js
var Pub = Sequelize.define('Pub', {
  name: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  latitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -180, max: 180 }
  },
}, {
  validate: {
    bothCoordsOrNone: function() {
      if ((this.latitude === null) === (this.longitude === null)) {
        throw new Error('Require either both latitude and longitude or neither')
      }
    }
  }
})
```

In this simple case an object fails validation if latitude or longitude is
given, but not both. If we try to build one with an out-of-range latitude and no
longitude, `raging_bullock_arms.validate()` might return

```js
{
  'latitude': ['Invalid number: latitude'],
  'bothCoordsOrNone': ['Require either both latitude and longitude or neither']
}
```
