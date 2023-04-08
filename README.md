# CRUDSTROLOGY REDUX

## Elevator Pitch

### Legacy

- A single app source for zen-inducing quotes, daily horoscopes, and UNLIMITED tarot readings.
- Users can like the quotes from the feed on the homepage to view on a favorites list.
- Quotes and Horoscopes are collected from external APIs (with no keys required).
- Tarot readings are dynamically generated from a combination of api data and local data from the utils directory.

### Updates

2.0:

- Users now have social capabilties build into the app
  - This includes: Chat feed, User profiles, Followers list
- Users can test compatibility between signs for relationship purposes
- Users can write journals based anything they want, along with tying horoscopes to them
  - These journals can be read on a user's profile

## How to Start (for Devs)

- run `npm install` to make sure to have needed dependencies installed
- All versions in package.json are "approximately equivalent to" (~) so if major releases are not aligned, you will need to `npm-check-update` or something to that effect.
  - NOTE: Passport's version must be lower than 0.6 as there is a bug that prevents user's from logging in properly
- enter `sudo service mysql start` (bash) or `mysql.server start` (mac) to start database in bash terminal
- enter mysql shell: `mysql -u root` && `CREATE DATABASE dbstrology`
- optional: make sure `seeder()` is being invoked in /server/index.js --> app.listen anonymous function
  - the `seeder` is useful during development, as it allows you to test with multple users in the db
  - NOTE: there is a fetchTarot function in the seed you will have to use upon starting up the server, or else you tarot feature will not work
- remove _example_ from .env file and enter required keys which are created at https://console.cloud.google.com/apis/credentials
- `npm run build` && `npm run start` in terminal to run webpack and start the express server respectively
- visit http://localhost:8080/ to see served page

## Tech Stack and Docs

- Project Management Software: Trello
- Deployment: AWS (EC2 Ubuntu) (but seriously read the DigitalOcean docs)
  - https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04 --> Option 3
- Front End: React (Style Lib: Bootstrap?, Styled-Components)
- Server: Express
- Database: mySQL / Sequelize
- Auth: Passport-OAuth2
- APIs: https://aztro.sameerkumar.website/ && https://rapidapi.com/Alejandro99aru/api/horoscope-astrology && https://api.quotable.io
  && https://robohash.org/ && https://tarot-api.onrender.com/api/v1/cards/random?n=1
- Linting: ESLint / AirBnB
- Styled Components
- React Icons
- Moment (for dates);
- React QuillJS (for journal component)

## Contact Info

- Any issues for this updated version of the app feel free to contact the team in the github issues tab @ https://github.com/the-crudologists/crudstrology/issues
