# UX Log Study

- Hosted on netlify
- Needs netlify.toml in order for netlify to redirect all requests to index.html
- Uses GA4 > wwwdev.ebi.ac.uk/uniprot/front-end/ux (377516108) to track data
- Use UX branch but build with build:ux-netlify so that the PUBLIC_PATH is / and the GA4 tracking from above is used.

Steps:

1. From local machine goto uniprot-website repository.
2. `git checkout ux`
3. `git fetch`
4. `git merge origin/main`
5. `rm -rf node_modules; yarn; yarn build:ux-netlify`
6. Make sure is in the `build` directory
7. Upload the `build` directory to netlify

### Installing JavaScript Dependencies

To install JavaScript dependencies, first make sure you are in the root directory of your `uniprot-website` project -- this directory should contain a file named `package.json`, then type `yarn` in the command-line and press return. This should download and install the required JavaScript packages -- this may take a few minutes to finish.

# Usage

Run `yarn run start`

# Coding-styles & Linters

Our preferred coding-style conventions are the [Airbnb's](http://airbnb.io/projects/styleguides/) [JavaScript](https://github.com/airbnb/javascript), [React](https://github.com/airbnb/javascript/tree/master/react) and [CSS+Sass](https://github.com/airbnb/css) style guides.

You don't need to read or memorise all the styling rules; Write your code exactly the same way you always do, but when you are finished with editing a file or a even better, after modifying a few lines, go ahead and run the relevant linter in your terminal and the result of linter should be clear and self-explanatory enough for you to easily modify your changes to satisfy the linters.

### Running TypeScript/TSX/React Linter

Simply execute `yarn lint`.

# Running Unit Tests

Currently all tests are written on top of Facebook's [Jest Framework](https://facebook.github.io/jest/). Running existing tests would be as easy as executing `yarn test` in the root directory of the project, in the command-line.

# Writing Unit Tests

As mentioned above, tests are written on top of [Jest](https://facebook.github.io/jest/). If you aren't familiar with either Jest or Unit Testing in general, the best place to start would be [Jest's Getting Started](https://facebook.github.io/jest/docs/en/getting-started.html) page.

Once you have got yourself familiar with _Jest_, then start looking at the `__tests__` directory in the root of code-base. You should be able to find a few existing tests there which might be a good template for your first tests here.

Before you start writing your tests, make sure they are in the write place:

- All tests should be placed in the `__tests__` directory, in the root of code-base.
- The `__tests__` directory mimics the exact structure of the `src` directory. The only exceptions are non-JavaScript files and folders e.g. `styles`. You would need to follow this carefully as they are not automatically enforced by linters.

### Working with Jest Snapshots

_Jest_ has a rather unique feature called _Snapshot Testing_. If you are not familiar with that, have a look at [Jest's official documentation](https://facebook.github.io/jest/docs/en/snapshot-testing.html). You must be able to find a few examples of the snapshot testing in the `__tests__` directory as well.

Here there are two points to keep in mind:

1.  _Jest_ will automatically create a directory called `__snapshots__`, where ever it can find a snapshot test! All of your compiled snapshots will be stored in that directory and they need to be committed to the repository as well, as they are part of your tests.
2.  After updating a component which has snapshots tests already, you would need to run the following command to update your snapshots with the latest changes from your component: `yarn update-snapshots`. [Jest's documentation](https://facebook.github.io/jest/docs/en/snapshot-testing.html#updating-snapshots) has a section for updating, as well as resolving failing snapshot tests.

### Debugging service workers

Service workers shouldn't be registered on a live-reload development
environment. To be able to have them running, you need to generate a build,
preferably a dev build through `yarn run build:dev` to have an easier time
debugging. Serve the compiled website through any static asset server (e.g.
running `npx serve build`) and you can have a look at the website where the
service worker should be registered and functioning.

Something's gone wrong with caching on a deployed build? In the entry point use
the `unregister` function instead of the `register` function.

### Build Scripts

| Build script | Use                               |
| ------------ | --------------------------------- |
| `build:prod` | Web Production Kubernetes cluster |
| `build:dev`  | Debugging service workers         |
