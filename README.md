# Steps to use this repo

1. Clone the repo
2. In the root folder run `npm install` to downnload dependencies
3. Create a .env file, with the following (without " "):

- REACT_APP_API_KEY = "Your Google API key"
- REACT_APP_CLIENT_ID = "Your google client id"

4. Run the app in development mode: `npm start`

# Features

- Sign in with Google account to view Google calendar
- Display events from calendar in a simple list for 1, 7 or 30 following days
- Events are sorted into days in 1 and 7 view type, events are sorted into weeks in 30 days view type
- Events are sorted by time
- Events display: event title, envent start time, event end time
- Ability to add new events
- Ability to delete existing events

## Technologies

Project is created with:

- Core:
  - [ReactJS](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)
- Styling:
  - [Material UI](https://material-ui.com/)
  - [Material Pickers](https://material-ui-pickers.dev/)
- Date time:
  - [Luxon](https://moment.github.io/luxon/)
- APIs:
  - [Google Calendar API](https://developers.google.com/calendar/)
- Tools:
  - [Google Chrome](https://www.google.com/chrome/)
  - [VS Code](https://code.visualstudio.com/)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

To downnload dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
