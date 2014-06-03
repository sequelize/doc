# sequelize-doc

## Starting the docs locally

```
git clone git@github.com:sequelize/sequelize-doc.git
cd sequelize-doc
npm install
npm start
```

Now open the browser on `http://localhost:3000`.

## Creating new versions of the documentation

```
cp -rf views/docs/latest views/docs/.x.x.x
```

It will automatically appear in the list of versions.
