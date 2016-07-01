# isearch-ui
The ui for inspirational search!

The ui is hosted as a static website from an s3 bucket. We use React and Redux with Babel and Webpack for transpiling and bundling. Data fetching is done by making GrahQL requests and recieving results through a web socket channel.

## Folder Structure

The eventual aim is to abstract all the individual components (filter-tile, package-tile) into separate npm modules. Currently the main elements of the project are structured as follows:

```
├── LICENSE
├── package.json
├── README.md
├── fonts
├── lib
│   ├── filter-tile
│         |── index.js
│         |── styles.css
│         └── test
│           └── index.test.js
├── src
│     └──components
│         └── home
│               ├── index.js
│               └── styles.css
│     ├──containers
│     ├──reducers
│     ├──constants
│     ├──actions
│     ├──store
|     ├── index.js
|     ├── index.html
│     └── index.template.html
├── test
```

All the re-usable React components are kept in the lib folder with their own tests so that they can easily be published to NPM if desired.

To create a new component:
* add a folder to the lib folder with an index.js file with the component
* add a styles.css file for the component. If custom fonts are required, they have to be linked from the fonts folder in the root of the project (as otherwise webpack wont be able to resolve the paths)

To move a component out into its own npm module
* Set up a babel-react-webpack project (use the [canary project](https://github.com/numo-labs/react-canary-component) as a template)
* Copy over the contents of the component from the lib folder
* Create a font folder and copy over the necessary font files and the same for assets

## Routing

This project uses 'react-router' and 'react-router-redux' for routing. The possible routes are specified in the file `src/containers/router.js`. Each route is a redux container - i.e. a React component which directly gets props from the redux store. The containers are in the folder `src/containers`.

### Routing history

Currently, `hashHistory` is being used with react-router to enable shareable links - the website is served from an s3 bucket so with `browserHistory` the user would get 404 errors (no files in the bucket matching the browser url).

**TODO: To enable `browserHistory`, we need to be able to redirect the user to the index.html page whenever there is a 404 error so react-router can use the url to render the correct page.**

### Scroll Position

Scroll behaviour when transitioning between routes is controlled using 'react-router-scroll' which can be customised in the router `src/containers/router.js`.

## Services

### Websocket channel

When the app is mounted a connection is established with a web socket server. A connection ID is obtained which is saved to the redux store and used for every search request.

The web socket handler functions can be found in `src/services/websockets.js`;

### GraphQL

To initiate a search, a GraphQL mutation is launched (defined in `src/constants/mutations.js`) with the search query, along with the web socket connection id and a client id.

The results of the search are sent from the socket server through the web socket channel and saved to the redux store.

## Testing

### React

Front end React tests are written using a testing utility called [Enzyme](https://github.com/airbnb/enzyme) which has useful methods for shallow rendering as well as full DOM rendering (using jsdom) and easy traversal using jQuery like syntax. Examples of tests can be found in the `src/test/components` folder or in each of the individual component folders within `lib`.
Assertions are written using Chai `expect`.

### Redux

Synchronous Redux actions can be tested as normal functions. Asynchronous actions which use 'redux-thunk' and the `dispatch` and `getState` functions can be tested using the `mockConfigureStore` helper function from the `test/actions/test-helpers.js` file. This can be used to initialise a mock store with an initial state. `store.dispatch` can be used to mock dispatch an action and the `store.getActions` function can be used to retrieve the actions dispatched within the action being tested to check that the correct actions are being called.

```js
import thunk from 'redux-thunk';
import configureMockStore from './test-helpers';
import { expect } from 'chai';
const mockStore = configureMockStore([thunk]);
describe('Autocomplete actions', () => {
  it(`getAutocompleteOptions does not launch graphql query when the
      searchString value is 0`, (done) => {
    const expectedActions = [];
    const store = mockStore({search: { searchString: '' }});
    store.dispatch(actions.getAutocompleteOptions());
    expect(store.getActions()).to.deep.equal(expectedActions);
    done();
  });
});
```

## Analytics


## Deployment to S3

A gulp script is used to deploy to an s3 bucket. At the top of the file you can define the bucket and folder options - change the variables: `bucketName` and `bucketfolder`.

**Currently the bucket folder is set 'isearch/' plus the minor and patch version from the version in the package.json e.g. if the version is '1.0.1' the folder name will be 'isearch/0.1'**

You also need to check you have the AWS CLI set up with the correct access keys. Then, in your terminal type:

```js
npm run ci:build

or

npm run prod:build

```

This will use webpack config (either ci or prod) to build the bundle and put the index.html and bundle.js in to the public folder. The bundle will be hashed (to prevent caching by s3) and the index.html file will be built from the template in the src folder ('index.template.html').

To upload the files to s3 use the corresponding deploy commands:

```js
npm run ci:deploy

or

npm run prod:deploy

```

The contents of the public folder will then be uploaded to the specified Amazon S3 bucket. Have a look at the 'gulpfile.js' for implementation details.

### Deploying to Production

The production URL is [http://inspirationalsearch.spies.dk/isearch/prod/index.html](http://inspirationalsearch.spies.dk/)

To deploy to production create a PR from `master` into `prod`. Once that's merged Codeship will do the rest (basically calling `gulp prod:deploy` with the S3 bucket name set to `inspirationalsearch.spies.dk`).

# APPENDIX

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


## Automated Browser Testing

We are using Nightwatch to run User Acceptance Tests.

As a developer, all you need to do is run the following commands:

```sh
npm install
```
(_ensure that you have the 
> Note: if you don't already have Java installed on your localhost, 
see: [#**installing-java**](https://github.com/dwyl/learn-nightwatch/#installing-java-runtime-environment-jre)

Once all `devDependencies` have installed, simply run:
```sh
npm run nightwatch
```
This will run the tests locally using Selenium and Chromedriver




## Debugging (Tracing Requests)

isearch-ui now comes with it's own debugging toolbar baked in, it is shown when the Konami code:

`up, up, down, down, left, right, left, right, b, a` is pressed on the arrow keys and keyboard.

![screenshot from 2016-07-01 11-22-44](https://cloud.githubusercontent.com/assets/524382/16519035/3ae2969c-3f7e-11e6-9796-e371be3a15de.png)

A breakdown of what the toolbar shows is:

Interactive: The number of miliseconds until the DOM is responsive to use.
Complete: The number of miliseconds until the DOM is complete.
Load: The number of miliseconds until everything has loaded.
[Tracey](https://github.com/numo-labs/tracey): A link to tracey with the current search result id.
[Logs](https://github.com/numo-labs/inspirational-search-docs/blob/master/logging.md): A link to kibana to view the logs of the current request.

