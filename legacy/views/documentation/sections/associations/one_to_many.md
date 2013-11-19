#### One-To-Many associations | One-To-Many

One-To-Many associations are connecting one source with multiple targets. The targets however are again connected to exactly one specific source.

```js
var User = sequelize.define('User', {/* ... */})
var Project = sequelize.define('Project', {/* ... */})

// OK. Now things get more complicated (not really visible to the user :)).
// First let's define a hasMany association
Project.hasMany(User, {as: 'Workers'})
```

This will add the attribute ProjectId or project_id to User, depending on your settings for `underscored`.
Instances of Project will get the accessors getWorkers and setWorkers.

We could just leave it the way it is and let it be a one-way association.
But we want more! Continue to the next section to define it the other way around:
