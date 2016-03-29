#### Flux + React Todo Example
![react flux architecture](https://cloud.githubusercontent.com/assets/5398914/14071719/efa7535a-f4f2-11e5-9365-9fc8d47f9431.png?)

An application architecture for React utilizing a unidirectional data flow.

## Learning Flux

The [Flux](http://facebook.github.io/flux) and [React](http://facebook.github.io/react) websites are great resources for getting started.

Read the blog post announcing Flux: ["An Application Architecture for React"](http://facebook.github.io/react/blog/2014/05/06/flux.html), then read more about the [Flux architecture](http://facebook.github.io/flux/docs/overview.html) and a [Todo tutorial](http://facebook.github.io/flux/docs/todo-list.html) explaining the structure of the files in this folder. 

## Running

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To build the project, first run this command:

    npm start

This will perform an initial build and start a watcher process that will update bundle.js with any changes you wish to make.  This watcher is based on [Browserify](http://browserify.org/) and [Watchify](https://github.com/substack/watchify), and it transforms React's JSX syntax into standard JavaScript with [Reactify](https://github.com/andreypopp/reactify).

To run the app, spin up an HTTP server and visit http://localhost/flux-react-example/.  Or simply open the index.html file in a browser.
