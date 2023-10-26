# Project 2

### How to run project

1. Prerequisites:

   - Node.js v20.5+ and npm v9.8+.
   - Vite 4.4+

2. **Installation**:

   - Clone the repository from gitlab and navigate to the project root directory
   - Navigate to project directory (frontend): `cd .\frontend\`
   - Install dependencies: `npm install`
   - Navigate back to the project root directory
   - Navigate to project backend directory: `cd .\backend\`
   - Install dependencies: `npm install`
   - Initialize prisma with `npx prisma generate`

3. **Starting the Project**:

_Run frontend_

- Navigate to project-2/frontend
- Run the frontend: `npm run dev`

_Make sure to have a postgresql database running on your machine before running the backend_

- Install postgresql on your machine, <a href="https://www.postgresql.org/download">see downloads</a>
- Make sure the psql command is in your OS's PATH environment variable
- Make sure postgresql is running on your machine
- Make sure you have a user to log in with (with username postgres preferably)
- (You may need to create the user if postgresql is installed with homebrew)
  - On M1 mac run `/opt/homebrew/bin/createuser -s postgres`
  - On other macs, try running `/usr/local/opt/postgres/bin/createuser -s postgres`
- Run `psql -U postgres` and type in the password, likely "postgres" and press enter
- Run `CREATE DATABASE dishdb;`
- Exit psql (ctrl+z)
- Navigate to the project-2/backend/database directory
- In setup.sql, replace the csv link with the absolute path to the dishes.csv file on your machine
- Run `psql dishdb < setup.sql`
- Add a .env file in project-2/backend and add

      DATABASE_URL=postgresql://username:password@localhost:5432/dishdb?schema=public

By default, username should be **postgres** and password should be **postgres**.

_Run backend_

- Navigate to project-2/backend
- You may need to run `npx prisma db pull` and `npx prisma generate` after setting up the database
- Run the backend: `npm run dev`

4. **Testing**:

   - Navigate to either project-2/frontend or project-2/backend (depending on what you want to test)
   - Run the tests: `npm run test`
