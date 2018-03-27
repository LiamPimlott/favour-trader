# COMP 4350: Software Engineering 2
# Project: FavourTrader

Group 8 (Team 8x8):
- Alexander Mark
- Justine Bernshine
- Barry Yakimchuk
- Eric Dyck
- Liam Pimlott
- Jian Wen Chen
- Ismail Khowaja
- Beom-Jin Park

## Live Branch for Snapshots: 'master'

PLEASE NOTE: This project requires a .env file to run, please ask for a copy :)

Trello Board: https://trello.com/b/14MpAe9b

## Deployment

View our latest production build here: https://favour-trader.appspot.com/login

## Installation / Running Locally:
** In order to run this project locally, please ensure you have the latest version of Node (https://nodejs.org/en/).

Option 1 - Running server or client individually:

a) Running the server / api (note: This option (1a) alone is enough to see full functionality and is how the app is deployed)
- Navigate to /favour-trader
- Run `npm install` to install required packages (only once)
- Navigate to /favour-trader/client
- Run `npm install` then run `npm run build`
- Navigate back to /favour-trader
- Ensure there is a valid .env file in /favour-trader
- Run`npm run devServer` to spin up the server on localhost//:3001

b) Running the web client (note: this is intended to be a front end developement server and is useless with no backend to talk to)
- Navigate to /favour-trader/client
- Run `npm install` to install required packages (only once)
- Navigate back to /favour-trader
- Run `npm run devClient` to spin up a local webpack server on localhost//:3000

Option 2 - Running server and web client concurrently: (note: this option is more meant to make developing locally simpler)
- Navigate to /favour-trader
- Run `npm install` to install required packages (only once)
- Navigate to /favour-trader/client
- Run `npm install`
- Navigate back to /favour-trader
- Ensure there is a valid .env file in /favour-trader
- Run `npm run dev` to run the devServer and devClient concurrently in one shell.
- A front end build is only require if accessing the front-end from the server (localhost//:3001), otherwise just do any browsing through the webpack server (localhost//:3000).

## Testing:

The tests use Mocha, Chai, and CodeceptJS. They connect to a totally different MongoDB instance as to not destroy the dev or prod dbs.
- First ensure you have an up to date copy of the .env file
### Running the server tests:
- Navigate to /favour-trader
- Run `npm install`
- Run `npm test`
### Running the front-end-tests:
- Navigate to /favour-trader/client
- Run `npm install`
- Run `npm test`

Running / Testing Mobile Client:

- ** SEE THE README FILE IN THE /favour-trader-native DIRECTORY **

Notes for working on this repository:
- Please only work off of the 'develop' branch (we will merge develop into master when a new release is scheduled)
- You must have at least 1 code review before you merge your branch.
- Any changes must pass the TravisCI builds. (These are automaticly ran via github integrations).

### Running client accpetance tests:
- In the /favour-trader folder, run `node dbrefresh.js` with  `NODE_ENV=acceptance` in the .env file
- First, start the server and client like in Option 1 using `NODE_ENV=acceptance`
- in /favour-trader/client, run `npm run e2etests`

Note: the dbrefresh script sometimes doesn't add the skills into MongoDB, causing the tests to fail. If you encounter
the test failing when selecting a skill, try running the dbrefresh script again.
