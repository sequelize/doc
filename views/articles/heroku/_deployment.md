### Deployment to Heroku

First of all, we need to add the right version of Node.JS and NPM to the `package.json`. The file should look similiar to this:

```js
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.1.1",
    "jade": "*"
  },
  "engines": {
    "node": "0.8.x",
    "npm": "1.1.x"
  }
}
```

Now we can create a Heroku application and deploy to it:

```bash
echo "web: node app.js" > Procfile
echo "node_modules" > .gitignore
git init
git add .
git commit -m "initial commit"
heroku create
git push heroku master
heroku ps:scale web=1
heroku open
```

You should now see a browser with the same application as on your local machine.
