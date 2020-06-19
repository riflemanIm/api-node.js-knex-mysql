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

#### Create dev and test database (Mac)

In mysql worckbanch run the following commands:

2. `CREATE DATABASE dbname;` -- Creates development server
3. `CREATE DATABASE dbname-test;` -- Creates testing server
4. `\q`
5. CD into your repo
