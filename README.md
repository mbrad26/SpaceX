[![Netlify Status](https://api.netlify.com/api/v1/badges/95473105-43d5-43ab-b33c-ff7e55f8f5a5/deploy-status)](https://app.netlify.com/sites/spacex-mbrad26/deploys)
[![Build Status](https://travis-ci.org/mbrad26/SpaceX.svg?branch=master)](https://travis-ci.org/mbrad26/SpaceX)

# **SpaceX**  

This is a small project that provides a brief overview of SpaceX's rockets and dragons capsules.

[LIVE](https://spacex-mbrad26.netlify.app/)

![Screenshot](./images/Screenshot1.png)

![Screenshot](./images/Screenshot2.png)

![Screenshot](./images/Screenshot3.png)

### Approach

This project was a first dive in the world of React Hooks and React Context Api as a state management solution.

I researched on React Hooks by reading official [docs](https://reactjs.org/docs/hooks-intro.html) and also spent time reading blogs by Dan Abramov, Robin Wieruch and Kent.C.Dodds:
  * https://overreacted.io/
  * https://www.robinwieruch.de/blog/
  * https://kentcdodds.com/blog/

My approach was to grab some data from the SpaceX api and display it on the web page using React Hooks (as many as possible, even if they weren't absolutely necessary :) ).

State management wise, I started with `useState` hook and then transitioned towards `useReducer` and `useContext` hooks.

Testing wise, also a first: React Testing Library.

### Requirements

* Fetch and render a list of rockets or dragons from SpaceX's API.
* Show extended information about a selected list item in a separate box, modal or page.

### Getting started

Clone this repository to your local machine.

```js
// install dependencies
> npm install

// start server
> npm start

// run tests
> npm test
```

### Tech stack

- React
- Axios
- Bootstrap
- CSS
- HTML
- Jest + react testing library

### To do

* Update the README with a screen shot and a short description of the process.
* Extract `fetchData` to own file.
* Add more tests to cover edge cases and to improve coverage overall.
