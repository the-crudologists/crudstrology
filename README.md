# CRUDSTROLOGY

## Elevator Pitch
- A single app source for zen-inducing quotes, daily horoscopes, and UNLIMITED tarot readings.
- Users can like the quotes from the feed on the homepage to view on a favorites list. 
- Quotes and Horoscopes are collected from external APIs (with no keys required).
- Tarot readings are dynamically generated from a combination of api data and local data from the utils directory.


## How to Start (for Devs)

- run `npm install` to make sure to have needed dependencies installed
- All versions in package.json are "approximately equivalent to" (~) so if major releases are not aligned, you will need to `npm-check-update` or something to that effect.
- enter `sudo service mysql start` (bash) or `mysql.server start` (mac) to start database in bash terminal
- enter mysql shell: `mysql -u root` && `CREATE DATABASE dbstrology`
- make sure `seeder()` is being invoked in /server/index.js --> app.listen anonymous function
- remove _example_ from .env file and enter required keys which are created at https://console.cloud.google.com/apis/credentials 
- `npm run build` && `npm run start` in terminal to run webpack and start the express server respectively
- visit http://localhost:8080/ to see served page

## Tech Stack and Docs

- Project Management Software: Trello
- Deployment: AWS (EC2 Ubuntu) (but seriously read the DigitalOcean docs)
  - https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04 --> Option 3
- Front End: React (Style Lib: Bootstrap?)
- Server: Express
- Database: mySQL / Sequelize
- Auth: Passport-OAuth2
- APIs: https://aztro.readthedocs.io/en/latest/# && https://api.quotable.io
 && https://robohash.org/ && https://tarot-api.onrender.com/api/v1/cards/random?n=1
- Linting: ESLint / AirBnB
- Styled Components
- React Icons

## Contact Info

 - report issues and ask questions via Github Issues @ https://github.com/krewe-deaux-code/crudstrology/issues
