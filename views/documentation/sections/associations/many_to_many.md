#### Many-To-Many associations | Many-To-Many

Many-To-Many associations are used to connect sources with multiple targets. Furthermore the targets can also have connections to multiple sources.

```js
// again the Project association to User
Project.hasMany(User, { as: 'Workers' })

// now comes the association between User and Project
User.hasMany(Project)

/*
  This will remove the attribute ProjectId (or project_id) from User and create
  a new model called ProjectsUsers with the equivalent foreign keys ProjectId
  (or project_id) and UserId (or user_id). If the attributes are camelcase or
  not depends on the Model it represents.

  Now you can use Project#getWorkers, Project#setWorkers, User#getTasks and
  User#setTasks.
*/

// Of course you can also define self references with hasMany:

Person.hasMany(Person, { as: 'Children' })
// This will create the table ChildrenPersons which stores the ids of the objects.

// Since v1.5.0 you can also reference the same Model without creating a junction
// table (but only if each object will have just one 'parent'). If you need that,
// use the option foreignKey and set useJunctionTable to false
Person.hasMany(Person, { as: 'Children', foreignKey: 'ParentId', useJunctionTable: false })

// You can also use a predefined junction table using the option joinTableName:
Project.hasMany(User, {joinTableName: 'project_has_users'})
User.hasMany(Project, {joinTableName: 'project_has_users'})
```

If you want additional attributes in your join table, you can define a model for the join table in sequelize, before you define the association, and then tell sequelize that it should use that model for joining, instead of creating a new one:

```js
User = sequelize.define('User', {})
Project = sequelize.define('Project', {})
UserProjects = sequelize.define('UserProjects', {
    status: DataTypes.STRING
})

User.hasMany(Project, { joinTableModel: UserProjects })
Project.hasMany(User, { joinTableModel: UserProjects })
```

The code above will add ProjectId and UserId to the UserProjects table, and *remove the id attribute*, if it was added previously - the table will be uniquely identified by the combination of the keys of the two tables, and there is no reason to have an id column as well.