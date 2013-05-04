### A minimal express application

In order to create a minimal express application, we need to install express first. We can do this via the following commands:

```bash
mkdir example-app
cd example-app
npm install express
node_modules/.bin/express . -f
npm install
node app.js
```

So now we have a default express application. If you point your browser to `http://localhost:8080`, you will see a tiny page welcoming you.

Next step: Deploy the application to Heroku.
