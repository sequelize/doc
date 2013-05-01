### Many-To-Many associations

Many-To-Many associations are connecting sources with multiple targets. Furthermore the targets can also have connections to multiple sources.

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
// use the option foreignKey and useJunctionTable:
Person.hasMany(Person, { as: 'Children', foreignKey: 'ParentId', useJunctionTable: false })

// You can also use a predefined junction table using the option joinTableName:
Project.hasMany(User, {joinTableName: 'project_has_users'})
User.hasMany(Project, {joinTableName: 'project_has_users'})

// If you need your association table to have additional attributes, an alternative
// way to do this would be to define the table and then use two hasMany relationship.

UserProject = sequelize.define('user_projects',{
   count : Sequelize.INTEGER
})

Project.hasMany(UserProjects);
User.hasMany(UserProjects);
UserProject.belongsTo(User);
UserProject.belongsTo(Project);

// NOTE : this does NOT allow you direct access from Project to User. You can access
// UserProject which will give you access to the User, but it is not a direct relationship
```
