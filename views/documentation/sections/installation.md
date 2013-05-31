You have two options to install Sequelize:

1\. Install it via NPM:

```js
// Use npm on the commandline:
npm install sequelize

// Then require the installed library in your application code:
var Sequelize = require("sequelize")
```

2\. Download the code from the git repository and require it's entry file index.js:

```bash
// Checkout the current code from the repository using the commandline
cd path/to/lib
git clone git://github.com/sequelize/sequelize.git
```

Then require the installed library in your application code:

```js
var Sequelize = require(__dirname + "/lib/sequelize/index")
```

This will make the class `Sequelize` available.
