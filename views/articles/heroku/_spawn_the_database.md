In order to get a database on Heroku we can use their CLI. Just run the following command and take a closer look at it's output:

```bash
heroku addons:add heroku-postgresql:dev
```

This will result in something like this:

```bash
Adding heroku-postgresql:dev on fast-dusk-7858... done, v5 (free)
Attached as HEROKU_POSTGRESQL_BRONZE_URL
Database has been created and is available
 ! This database is empty. If upgrading, you can transfer
 ! data from another database with pgbackups:restore.
Use `heroku addons:docs heroku-postgresql:dev` to view documentation.
```

What we will need is the color (sounds strange right?) of the database. In this case we just created a `bronze` one. That means, that we will have an environment variable `HEROKU_POSTGRESQL_BRONZE_URL` containing the URI of the database.

If you are interested in the URI, you can just run this command:

```bash
heroku config:get HEROKU_POSTGRESQL_BRONZE_URL
# => postgres://pfforbjhkrletg:aic5oO6Cran1g3hk6mJa5QqNZB@ec2-23-21-91-97.compute-1.amazonaws.com:5432/dek11b2j1g3mfb
```
