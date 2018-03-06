# COMP 4350: Software Engineering 2
# Project: FavourTrader

Group 8 (Team 8x8):
- Alexander Mark
- Joseph Bernshine
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

Our current deployed version of the app is NOT our most up to date release.
It is currently more a testing ground while we work to seamlessly intregrate our 
continuous integration platform, Travis CI with our Google Compute Engine hosting service.

You can still create an account and poke around but there is less features than our most recent release.

View it here: https://favour-trader-test.appspot.com/login

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

Running Mobile Client:
- TBD

Notes for working on this repository:
- Please only work off of the 'develop' branch (we will merge develop into master when a new release is scheduled)
- You must have at least 1 code review before you merge your branch.
- Any changes must pass the TravisCI builds. (These are automaticly ran via github integrations).

## Testing:

The tests use Mocha and Chai. They connect to a totally different MongoDB instance as to not destroy the dev or prod dbs.
They also run the server locally. At least they do in the api tests. ¯\_(ツ)_/¯
Running the tests:
- Do option 1a at least.
- Run `npm test`
