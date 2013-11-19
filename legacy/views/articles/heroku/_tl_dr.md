This article explains a straight-forward but maintainable approach for hosting an express application on Heroku. If you don't want to read all the stuff mentioned, just execute the following stuff and have fun.

```bash
mkdir example-app
cd example-app
npm install express
node_modules/.bin/express . -f
npm install
curl -s https://gist.github.com/sdepold/ced7d2a4a847f38901ef/raw/459c923dd0a14841c932bb95ff3be8a8170bd563/package.json > package.json
echo "web: node app.js" > Procfile
echo "node_modules" > .gitignore
npm install --save sequelize pg mysql
mkdir models
git init
git add .
git commit -m "initial commit"
heroku create
git push heroku master
heroku ps:scale web=1
heroku addons:add heroku-postgresql:dev
curl -s https://gist.github.com/sdepold/ced7d2a4a847f38901ef/raw/6db41e130a8b901cd0843bf52390b7cb11db5f15/app.js > app.js
curl -s https://gist.github.com/sdepold/ced7d2a4a847f38901ef/raw/26c5a94d74db4a242464b02aa8e0ae4b3bac6880/models-index.js > models/index.js
curl -s https://gist.github.com/sdepold/ced7d2a4a847f38901ef/raw/3b37b0e5d459b2e4b3833a63a018b600a1001795/models-user.js > models/user.js
clear

# Now run the following command and change HEROKU_POSTGRESQL_BRONZE_URL in
# the file "models/index.js" to its result:
heroku config|grep HEROKU_POSTGRESQL|cut -d : -f 1

git add .
git commit -m "sequelize application"
git push heroku master
heroku open
```
