#### The binary

In order to run migrations, sequelize comes with a handy binary file which can setup your project and run migrations. The following snippet shows the possible things:

```bash
sequelize -h
sequelize --help
--> prints the help

sequelize -V
sequelize --version
--> prints the version

sequelize -i
sequelize --init
--> creates a migration folder
--> creates a config folder
--> saves a config.json inside the config folder

sequelize -i -f
sequelize --init --force
--> forced creation of migration and config folder
--> existing data will be deleted first

sequelize -m
sequelize --migrate
--> needs a valid config.json
--> runs pending migrations
--> saves successfully executed migrations inside the database

sequelize -m -u
sequelize --migrate --undo
--> needs a valid config.json
--> reverts the last successfull migration
--> when there were multiple executed migrations, all of them are reverted

sequelize -c [migration-name]
sequelize --create-migration [migration-name]
--> creates the migrations folder
--> creates a file with current timestamp + migration-name
--> migration-name has the default 'unnamed-migration'
```
