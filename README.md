# Food Ltd

Most importantly:

1. The application can be viewed [here](http://it2810-43.idi.ntnu.no/project2/).

Make sure to either use NTNU internet or vpn.

2. A better place to read the documentation can be found [here](http://it2810-43.idi.ntnu.no/project2/docs).

The documentation page hosts an enhanced rendition of this README file. While the core content remains unchanged, the documentation page offers a more user-friendly and enjoyable experience. And it took a little bit of time to make.

Table of Contents

- [Background](#background)
- [How to run the project](#running)
- [Project structure](#structure)
- [Technologies](#technologies)
- [Important choices](#choices)
- [Database and datasource](#database)
- [Testing](#testing)
- [Sustainability](#sustainability)

<a name="background"></a>

## Background

### Application description

Food Ltd. is a website for exploring a large number of food recipes. The user is immediately presented with over 1000 pages of recipes which can be navigated through. The number of results can be narrowed down by using search, or some of the filters.

The user can click on the dish of choice, taking them to a separate page. Here, more information about the dish can be found. This includes ingredients and the steps to reproduce.

The user may also leave a review and a rating on a dish, which will be visible to other users.

<a name="running"></a>

## Running the project

### Prerequisites

- Node.js v20.5+ and npm v9.8+.
- Vite 4.4+
- Clone the repository for the project:

`git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-43/prosjekt-2.git`

For backend:

- postgresql. Can be downloaded [here](https://www.postgresql.org/download/).

### Running without the backend

The backend can be slightly tricky to set up. For that reason, a shortcut is available for those who want to quickly get an overview.

- Navigate to frontend: `cd .\frontend\`
- Install dependencies: `npm install`
- Start the app: `npm run mock`

<b>Note!</b> This version of the app is intended for testing and development. The backend is not connected, which means that almost no functionality is supported. For that, you first need to set up the backend.

### Setting up the backend

- Navigate to project backend directory: `cd .\backend\`
- Install dependencies: `npm install`
- Initialize prisma with `npx prisma generate`

Set up database:

- Make sure the psql command is in your OS's PATH environment variable
- Make sure postgresql is running on your machine
- Make sure you have a user to log in with (with username postgres preferably)
  - On M1 mac run `/opt/homebrew/bin/createuser -s postgres`
  - On other macs, try running `/usr/local/opt/postgres/bin/createuser -s postgres`
  - By default, username should be **postgres** and password should be **postgres**.
- Run `psql -U postgres` and type in the password, likely "postgres" and press enter
  - If creating a user and accessing the database with said user does not work, try running `psql -d postgres`.
  - On unix based operating systems like MacOS and Linux, you can alternatively try running `sudo -i -u postgres` then `psql`.
- Run `CREATE DATABASE dishdb;`
- Exit psql (ctrl+z)

Populate the database with data:

- Navigate to the project-2/backend/database directory
- Go to the bottom of setup.sql
- Replace `FROM '/data` (line 36) with `FROM {path-to-csv}`. Path has to be absolute.
- Run `psql dishdb < setup.sql`
- Create a .env file in project-2/backend and put:

      DATABASE_URL=postgresql://username:password@localhost:5432/dishdb?schema=public

Comment to the reviewer: if you have tried this, please let us know if these instructions were satisfactory. We are aware that the steps can be unclear.

### Starting the Project

- Navigate to project-2/backend
- You may need to run `npx prisma db pull` and `npx prisma generate` after setting up the database
- Run the backend: `npm run dev`
- Navigate to project-2/frontend
- Install dependencies if not done: `npm install`
- Run the frontend: `npm run dev`

<a name="structure"></a>

## General

### Project Structure

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

The data used in this project is sourced from a publicly available dataset from [kaggle](https://www.kaggle.com/datasets/pes12017000148/food-ingredients-and-recipe-dataset-with-images).

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

### Screen size testing

The application has been tested using windows and macos on chrome and safari. It has also been tested on a standard size mobile phone.

## Accessibility

I. Included in the airbnb styleguide for coding is a11y standard for accessibility. These linting checks make sure that:

- All `<img>` tags have alt text.
- Alt texts are descriptive.
- Aria roles are valid and non-abstract.
- Clickable non-interactive element have at least one keyboard event listener.

... and more. These are great for making sure the code follows accessibility standards.

II. Zooming is possible. This is good for users with poor eyesight.

III. Color contrast should be reasonably high, since most colors are white/dark gray and orange. This could be more thoroughly checked, however.

IV. No blinking, sound, quick animations that might cause problems for some users.

## Environment

I. A focus has been placed on not fetching data unnecessarily. This is done by disabling queries when they are not needed, and caching most query results. Tanstack query makes this a lot easier.

II. Darkmode is set by default, which requires less power to display.

III. SVGs and Lottie animations are used. SVGs are compact, and much better than other images. Lottie animations also require a lot less resources than other types of animation.

IV. Only a limited number of results per page. Since images take up a lot of the traffic, only a few is fetched per page.

## Project requirement fulfillment

### Functionality

- Search functionality, e.g., through a dialog/form/search field for input of search.

  ✔ Large search bar on the main page.

- List-based presentation of search results, with support for handling large result sets through either pagination or dynamic loading of more results upon scrolling.

  ✔ 1000 pages of dishes with pagination.

- Ability to view more details about each object.

  ✔ Each dish can be clicked on, bringing the user to a separate page.

- Option for sorting and filtering the result set (note that sorting and filtering should be performed on the entire result set and not just what happens to be loaded on the client).

  ✔ Currently possible to filter by which ingredients you want/don't want, and sort by new/rating/alphabetic.

- Inclusion of some form of user-generated data that should be stored persistently on the database server and presented (e.g., user-contributed information, reviews, ratings, search history, shopping lists, etc.).

  ✔ Users can leave reviews/ratings on the dishes.

- The solution should demonstrate aspects of universal design/web accessibility (accessibility).

  ✔\* Discussed in its own section.

- The solution should demonstrate aspects of sustainable web development (through design choices).

  ✔\* Discussed in its own section.

- Good design, sensible choices, and solutions that align with the type of data you choose.

  ✔ At least we think so. Reviewers should free to suggest changes

- The database and backend for the project should be hosted on the group's virtual machine at the time of submission.

  ✔

### Use of technology

- The user interface should be based on React and programmed in TypeScript.

  ✔

- The project should be set up using Vite.

  ✔

- Use of state management, for example, Redux, Mobx, Recoil, Apollo local state management, etc.

  ✔ The project uses redux.

- Custom/developer-built GraphQL backend, free choice of the type of database server on the backend, but the project should use a backend database set up by the group.

  ✔ postresql with graphql.

- Use of good and relevant components and libraries (free choice, and we encourage maximum reuse of third-party solutions).

  ✔ Lottie, Formik, InfiniteScroll, React-Search-Autocomplete.

### Testing, development and quality control

- Linting and the use of Prettier.

  ✔ Using a prettier config and eslint with aribnb styleguide.

- Comprehensive testing of components (we use Vitest).

  ✔\* Most components are tested. More to come.

- Some form of automated end-to-end testing (in practice, testing a longer sequence of interactions) and API testing.

  X Must be implemented before

- The project should be documented with a README.md in the Git repository. The documentation should discuss, explain, and reference all the key choices and solutions made by the group (including component and API choices).

  ✔\* Need to expand the discussion on choices and solutions.

- The code should be readable, well-structured, and commented to make it easy for others to understand. Use of comments should be tailored to external code inspection.

  ✔\* Let us know if there are some parts that require more attention.
