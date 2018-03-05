COMP 4350: Software Engineering 2
Project: FavourTrader
Trello: https://trello.com/b/14MpAe9b

## Live Branch for Snapshots: 'production'

Please note: This project requires a .env file to run, please ask for a copy :)

Group 8 (Team 8x8):
Alexander Mark
Joseph Bernshine
Barry Yakimchuk
Eric Dyck
Liam Pimlott
Jian Wen Chen
Ismail Khowaja
Beom-Jin Park

## Installation / Running Locally:
** In order to run this project locally, please ensure you have the latest version of Node (https://nodejs.org/en/).

Option 1 - Running server or client individually:
a) Running the server / api
- Navigate to /favour-trader/
- Run `npm install` to install required packages (only once)
- Run `npm run prodServer` or `npm run devServer` to spin up the server locally with either prod or dev environment flags.

b) Running the web client
- Navigate to /favour-trader/client
- Run `npm install` to install required packages (only once)
- Run `npm start` to spin up a local instance of the client (this will automatically try to connect to local back-end intance)

Option 2 - Running server and web client concurrently:
- Navigate to /favour-trader/
- Run `npm install` to install required packages (only once)
- Run `npm run dev` to run the dev server and dev client concurrently in one shell

Running Mobile Client:
- TBD

Notes for working on this repository:
- Please ensure you have at least 1 code review before you merge your branch
- Please only work off of the 'develop' branch (we will merge develop into master at times when we all agree to do so)

## Testing:

The tests use Mocha and Chai. They connect to a totally different MongoDB instance as to not destroy the dev or prod dbs.
They also run the server locally. At least they do in the api tests. ¯\_(ツ)_/¯
Running the tests:
- Do option 1a at least.
- Run `npm test`
