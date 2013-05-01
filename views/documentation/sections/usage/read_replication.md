### Read replication

Sequelize supports read replication, i.e. having multiple servers that you can connect to when you want to do a SELECT query. When you do read replication, you specify one of more servers to act as read replicas, and one server to act as the write master, which handles all writes and updates and propagates them to the replicas (note that the actual replication process is **not** handled by Sequelize, but should be set up in MySql).

```js
var sequelize = new Sequelize('database', null, null, {
  dialect: 'mysql',
  port: 3306
  replication: {
    read: [
      { host: '8.8.8.8', username: 'anotherusernamethanroot', password: 'lolcats!' },
      { host: 'localhost', username: 'root', password: null }
    ],
    write: { host: 'localhost', username: 'root', password: null }
  },
  pool: { // If you want to override the options used for the read pool you can do so here
    maxConnections: 20,
    maxIdleTime: 30000
  },
})
```

If you have any general settings that apply to all replicas you do not need to provide them for each instance. In the code above, database name and port is propagated to all replicas. The same will happen for user and password, if you leave them out for any of the replicas. Each replica has the following options: `host`, `port`, `username`, `password`, `database`

Sequelize uses a pool to manage connections to your replicas. The default options are:

```js
{
  maxConnections: 10,
  minConnections: 0,
  maxIdleTime:    1000
}
```

If you want to modify these, you can pass pool as an options when instantiating Sequelize, as shown above.

**Note:** Read replication only works for MySQL at the moment!
