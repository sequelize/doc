### Import

You can also store your model definitions in a single file using the `import`-method. The returned object is exactly the same as defined in the imported file's function. Since `v1.5.0` of Sequelize the import is cached, so you won't run into troubles when calling the import of a file twice or more often.

```js
// in your server file - e.g. app.js
var Project = sequelize.import(__dirname + "/path/to/models/project")

// The model definition is done in /path/to/models/project.js
// As you might notice, the DataTypes are the very same as explained above
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Project", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  })
}
```
