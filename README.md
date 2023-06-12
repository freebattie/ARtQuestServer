# ARtQuestServer

ARtQuestServer is a server for the ARtQuest app. It uses a REST API to communicate with the client.
It runs on Node.js and uses Express.js as a server framework.

## Requirements

The project requires Node.js v18.16.0 or later and npm
The project also requires a PostgreSQL database, either install it locally, or use a docker image.

## Setup instructions

1. Install dependencies with `npm i`
2. Rename `.env(template)` to `.env`
3. Fill in the fields in `.env` with your passwords, port etc, the file should be in `.gitignore`
4. Copy the `.env` file to `db/migration` folder
   The folder structure should look like this:
   ```
   ARtQuestServer
   ├── db
   │   ├── migration
   │   │   ├── .env
   │   │   ├── ...other files
   │   └── ... npm package files
   └── ...source code files and project files
   ```
4. Create a database with pgadmin or command line, the name of the db should be the same as `DB_NAME` in the `.env` file
5. To have a updated database with some test data run `npm run db-migrate`
6. Run the server with `npm run dev`
7. The server should now be up and running on `localhost:3000` where 3000 should be the same as `PORT` in `.env`


## Database migration tool
Tool to help everyone to have same setup for DB with easy terminal commando.
You need a copy of your .env file from root to this location = "db/migration"
If you dont add this file here it wont work!!!

First time setup run this command:
1. Run commando `npm run db-install`
2. Run commando `npm run db-migrate`

To update database with new SQL updates == `npm run db-migrate`
To reset database == `npm run db-reset`

### How to add a migration

First navigate to db/migration in a terminal and run `npx db-migrate create <name> --sql-file` where \<name\> is an arbitrary title for the migration.

The command will create three new file:
   `db/migration/migrations/<number>-init.js` - Don't touch this file
   `db/migration/migrations/sqls/<number>-init-up.sql` - Write how to apply the migration
   `db/migration/migrations/sqls/<number>-init-down.sql` - Write how to remove the migration
