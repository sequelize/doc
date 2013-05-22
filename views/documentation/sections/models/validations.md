#### Validations

In `v1.3.0` model validations have been added. They allow you to specify format/content/inheritance validations for each attribute of the model. You can perform the validation by calling the `validate()` method on an instance before saving. The validations are implemented by [node-validator](https://github.com/chriso/node-validator), and we are currently using v. 1.1.1.

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
such as `[['one', two']]` as shown above.

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

Since `v1.7.0` if a particular field of model is set to allow null (with
`allowNull: true`) and that value has been set to `null`, its validators do not
run. This means you can, for instance, have a string field which validates its
length to be at least 5 characters, but which also allows `null`.
