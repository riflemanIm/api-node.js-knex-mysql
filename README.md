# REST API express-knex-mysql

Boilerplate code for quick setup for CRUD,JWT auth applications using express/knex/mysql/jest/supertest

##Setup - Detailed Instructions Below

1. Git clone the repo `git clone [url]` and remove origin `git remote remove origin`
2. yarn
3. setup mysql backend
4. Modify .env file to suit your backend and migrate/seed db
5. migrate tables `npx knex migrate:latest`
6. yarn seeds `npx knex seed:run`
7. yarn server
<!-- 8. npm run test
8. modify code to suit your needs -->

#### Create database

In mysql run the following commands:
`CREATE DATABASE heyo;` -- Creates DB
