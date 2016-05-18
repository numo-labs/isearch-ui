# isearch-ui
The ui for inspirational search!

## Adding a component

The eventual aim is to abstract all the individual components (filter-tile, package-tile) into separate npm modules. Currently the main elements of the project are structured as follows:

```
├── LICENSE
├── package.json
├── README.md
├── fonts
├── lib
│   ├── filter-tile
│         |── index.js
│         └── styles.css
├── src
│     └──components
│         └── home
│               ├── index.js
│               └── styles.css
|     ├── index.js
|     ├── index.html
│     └── index.template.html
├── test         
```

The webpack config is set up so that any folder inside the lib folder behaves like an npm module so can be required as e.g. `const FilterTile = require('filter-tile');`

This line in the webpack config is the important part, so it can be removed once the modules have been published to npm:

```js
  root: [
    path.join(process.cwd(), 'lib')
  ]
```

To test out a new component before publishing to NPM:

* add a folder to the lib folder with an index.js file with the component
* add a styles.css file for the component. If custom fonts are required, they have to be linked from the fonts folder in the root of the project (as otherwise webpack wont be able to resolve the paths)

To move a component out into its own npm module
* Set up a babel-react-webpack project (use the [canary project](https://github.com/numo-labs/react-canary-component) as a template)
* Copy over the contents of the component from the lib folder
* Create a font folder and copy over the necessary font files

## Deployment to S3

A gulp script is used to deploy to an s3 bucket. At the top of the file you can define the bucket and folder options - change the variables: `bucketName` and `bucketfolder`.  Currently the bucket folder is set 'isearch/' plus the minor and patch version from the version in the package.json e.g. if the version is '1.0.1' the folder name will be 'isearch/0.1'. You also need to check you have the AWS CLI set up with the correct access keys. Then, in your terminal type:

```js
npm run deploy

```

This will build the bundle and put the index.html and bundle.js in to the public folder. The bundle will be hashed (to prevent caching by s3)and the index.html file will be built from the template in the src folder ('index.template.html'). The contents of the public folder will then be uploaded to the specified Amazon S3 bucket. Have a look at the 'gulpfile.js' for implementation details.

**We will use continuous integration with Codeship so the deployment will be done after code has been merged into the demo branch**


## Routing

This project uses 'react-router' and 'react-router-redux' for routing. The possible routes are specified in the file `src/containers/router.js`.

**NOTE**

Every time a new version is deployed to s3 the following code needs to be added to the s3 static permission hosting redirection rules - replace '0.14' with the name of the new version..

```
<RoutingRule>
<Condition>
  <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals >
  <KeyPrefixEquals>isearch/0.14</KeyPrefixEquals>
</Condition>
<Redirect>
  <ReplaceKeyWith>isearch/0.14/index.html</ReplaceKeyWith>
</Redirect>
</RoutingRule>
```

This is needed in order for s3 to not issue a `404 Not Found` error for changes to the browser URL (which is modified by react-router). The loading of the correct content is handled by the router rather than needing a server to serve the correct content based on url.

## Setting up the React Webpack Babel Project

Initialize your project by running the `$ npm init` command in the terminal.  

Basic file structure:
```
.
├── LICENSE
├── package.json
├── README.md
├── src
│   ├── index.js
│   └── index.html
├── test         
```


The basic setup required to build your initial bundle involves installing the following dependencies. Run this command in your command line:

`$ npm i --save-dev webpack babel-core babel-loader babel-preset-react babel-preset-es2015 react react-dom file-loader`

Create a `webpack.config.js` file and include the following within it:

```js
module.exports = {
  entry: {
    javascript: './src/index.js',
    html: './src/index.html'
  },

  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};
```

Create a `.babelrc` file and include the following within it:
```json
{
 "presets": ["es2015", "react"]
}
```

Then we have to add a 'build' script to our `package.json` that will create our bundle. It is written as follows:

```json
"build": "webpack --progress"
```

## Hot-loading
In order to enable hot-reloading of your project _(live updates in the browser)_ you'll need the following. Run this command in your terminal:

`$ npm i --save-dev webpack-dev-server react-hot-loader`

In your `webpack.config.js` file change your 'jsx' loader to the following:

```js
module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  }
```
**NOTE: The loader has changed to the plural 'loaders'**

We then need to add the following script to our `package.json` so that we can start our dev server:

```json
  "dev": "webpack-dev-server --hot --inline",
```
You can now visit your server by going to `http://localhost:8080/`

FYI: If you go to `http://localhost:8080/webpack-dev-server/#/` you can see hot-loading with errors.

## Linting
For linting we have chosen to use 'semistandard'. To install it run the following command in the command line:

`$ npm i --save-dev semistandard`

Now let's add a linting script to our `package.json` which is simply:

```json
"lint": "semistandard"
```

## Testing

To test our React components we are using Mocha. Run the following command in the terminal to install the testing framework:

`npm i --save-dev mocha jsdom react-addons-test-utils mocha-jsdom expect`

Include this script in your `package.json` to run your tests:

```json
"test": "npm run lint && mocha test/**/*.test.js --compilers js:babel-register"
```
