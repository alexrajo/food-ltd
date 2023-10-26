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

_Run backend_

- Navigate to project-2/backend
- Run the backend: `npm run dev`

_Make sure to have a postgresql database running on your machine_

- Install postgresql on your machine, <a href="https://www.postgresql.org/download">see downloads</a>
- Make sure the psql command is in your OS's PATH environment variable
- Navigate to the project-2/backend/database directory
- Run `psql dishdb < database.psql`
- Add a .env file in project-2/backend and add

      DATABASE_URL=postgresql://username:password@localhost:5432/dishdb?schema=public

By default, username should be **postgres** and password shoudld be **postgres**.

4. **Testing**:

   - Navigate to either project-2/frontend or project-2/backend (depending on what you want to test)
   - Run the tests: `npm run test`
