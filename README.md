# Food Ltd

## Table of Contents

- [Background](#background)
- [How to run the project](#running)
- [Project structure](#structure)
- [Technologies](#technologies)
- [Important choices](#choices)
- [Database and datasource](#database)
- [Testing](#testing)
- [Sustainability](#sustainability)

<a name="background"></a>

### Background

This application allows the user to browse a large number of food recipes. Each recipe can be selected to show more information, like ingredients, steps to make and more. Users can also leave reviews on the dish.

Finding the right dish is done through search, filtering or navigating. 

<a name="running"></a>

### Running the project

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


<a name="structure"></a>

### Project structure

The project is structured as follows:

- `backend`: Server source code
    - `prisma`: Schema definition of the data  
    - `src`: GraphQL API server
- `database`: Data to populate database, and PostgreSQL docker creation.  
- `frontend`:
    - `src`: Client source code
        - `assets`: SVGs, Lottie animatinos and mock data
        - `components`: Smaller parts of a page. Inside a subfolder indicating which page they belong to. 
        - `hooks`: The hooks of the application
        - `pages`: The pages of the application
        - `redux`: Redux store and all reducers.
        - `tests`: Frontend tests
        - `utils`: Helperfunctions for api calls, tailwind merger and constants
        - `types`: Main frontent typescript types.
        - `App.tsx`: The main component of the application
        - `main.tsx`: The entry point of the application

<a name="technologies"></a>

### Technologies

Required technologies used: 

- Vite / React / Typescript
- Redux w/persist
- GraphQL
- ESLint
- Prettier
- Vitest
- React Router
- TanStack Query
- Vitest
- Testing-library

Additional technologies: 

- Tailwind CSS
- Formik
- Lottie react
- Express
- Prisma
- Docker

These will be justified in the important choices section.

### Important Choices 
<a name="choices"></a>

- The Airbnb style guide is used for coding/linting. They can be found
[here](https://github.com/airbnb/javascript). Although the rules are strict, the advantages of a common coding pattern is worth the extra work and occasional roadblock.

- A prettier config, to make sure all contributors apply prettier in the same way. 

- Tailwind CSS for all styling. This is a great way to make sure all code related to a component is collected in the same place. This makes adjustments easier, and bug fixing faster. All current contributors strongly prefer tailwind to all other css solutions. 

- Formik is one of the many solutions for forms in react. The decision to pick this solution was made based on prior experience.

- Lottie react provides high quality json animations using a fraction of the space required by other animation types. 

- The project uses absolute paths instead of relative paths for file import. This is mostly due to preferance among contributors. 


<a name="database"></a>

### Database and datasource

The backend solution leverages GraphQL as the query language, with Express as the web framework, Prisma for database management, and Docker for containerization. This technology stack enables efficient data retrieval, seamless API development, and streamlined deployment in a containerized environment.

The data used in this project is sourced from a publicly available dataset from [kaggle](https://www.kaggle.com/datasets/pes12017000148/food-ingredients-and-recipe-dataset-with-images').


<a name="testing"></a>

### Testing

1. Frontend

Testing of the frontend is done using Vitest and React Testing Library. All frontend test files are organized under frontent/src/tests in order to maintain a good structure for the project.
To make it possible to test frontent components, a wrapper is created, and used in every test. This is essentially a copy of the whole project, making it possible to access redux store, query client and routes. 

The benefit of this is that the tests mimick how the user behaves. This is in line with the philosophy of the creator of Testing Library, which says that tests should resemble how software is used. 

To test, for example, that adding a filter to the search result works as expected, a series of userEvents is used. Since the tests have access to the whole application, the filter is added with a userEvent opening the filter menu, searching for the filter, clicking the filter. The test can then assert that the filter is applied properly. 

Additionally, the test suite includes some mock data. To avoid unnecessary api calls during testing, the mock data is used instead. 

Interrupting api calls is a common way to avoid api calls during testing. Mock Service Worker (MSW) is a popular library for this. An alternative approach was used in this project, where each api call function checks for an environment variable to be set to 'test'. In that case, mock data is returned. 

The advantage of this, is that no extra library is needed. In addition, it makes it possible to use mock data when running the project without a backed. The drawback is that the api call functions get cluttered.

The fontend test coverage is around 80%.

While this number could be higher, the focus for future testing should rather be to improve quality of the tests. Currently, most tests are simple, and do not actually cover important functionality.

2. Backend

No tests currently exist for the backend, but they will soon.

3. E2E testing

Nothing yet.


<a name="sustainability"></a>

## Sustainability


