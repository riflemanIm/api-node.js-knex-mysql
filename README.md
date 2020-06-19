# express-knex-mysql-boilerplate

Boilerplate code for quick setup for CRUD applications using express/knex/mysql/jest/supertest

##Setup - Detailed Instructions Below

1. Git clone the repo `git clone [url]` and remove origin `git remote remove origin`
2. npm install
3. setup mysql backend
4. Modify .env file to suit your backend and migrate/seed db
5. migrate tables `npx knex migrate:latest`
6. run seeds `npx knex seed:run`
7. npm run server
8. npm run test
9. modify code to suit your needs

## Setup PostgreSQL

### Homebrew (for macOS users)

If you dont have mysql follow this link (Follow directions until you're able to get into psql utility): https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

#### Create dev and test database (Mac)

In terminal run the following commands:

1. `psql` -- To get into postgreSQL utility
2. `CREATE DATABASE dbname;` -- Creates development server
3. `CREATE DATABASE dbname-test;` -- Creates testing server
4. `\q`
5. CD into your repo
