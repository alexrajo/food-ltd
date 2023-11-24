# Food Ltd

Most importantly:

1. The application can be viewed [here](http://it2810-43.idi.ntnu.no/project2/).

Make sure to either use NTNU internet or vpn.

2. A better place to read the documentation can be found [here](http://it2810-43.idi.ntnu.no/project2/docs).

The documentation page hosts an enhanced rendition of this README file. While the core content remains unchanged, the documentation page offers a more user-friendly and enjoyable experience. And it took a little bit of time to make.

Table of Contents

- [Background](#background)
- [How to run the project](#run)
- [General project information](#general)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Environment](#environment)
- [Project requirement checklist](#checklist)


<a name="background"></a>

## Background

### Application description

Food Ltd. is a website for exploring a large number of food recipes. The user is immediately presented with over 1000 pages of recipes which can be navigated through. The number of results can be narrowed down by using search, or some of the filters.

The user can click on the dish of choice, taking them to a separate page. Here, more information about the dish can be found. This includes ingredients and the steps to reproduce.

The user may also leave a review and a rating on a dish, which will be visible to other users.

<a name="run"></a>

## Running the project

### Prerequisites

There are several ways to run this project locally.
Each option is described in their own section, in increasing order of work needed to set up.

- Node.js v20.5+ and npm v9.8+.
- Vite 4.4+
- Clone the repository for the project:

`git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-43/project-2.git`

### Running without the backend

It is possible to run the project without any backend.

- Navigate to frontend: `cd .\frontend\`
- Install dependencies: `npm install`
- Start the app: `npm run mock`

<b>Note!</b> This version of the app is intended for testing and development. The backend is not connected, which means that almost no functionality is supported. For that, you should select one of the other options for running the project.

### Running with remote database

Uses the remote database on NTNU server.

- Connect to NTNU internet, either eduroam or vpn.
- Navigate to frontend: `cd .\frontend\`
- Install dependencies: `npm install`
- Start the app: `npm run dev-remote`

### Running with local database

This setup requires some work. You will need to setup and populate the databse locally.

- Install postgresql. Can be downloaded [here](https://www.postgresql.org/download/).

Prepare backend:

- Navigate to project backend directory: `cd .\backend\`
- Install dependencies: `npm install`
- Initialize prisma with `npx prisma generate`

Set up local database:

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

- Navigate to project-2/backend
- You may need to run `npx prisma db pull` and `npx prisma generate` after setting up the database
- Run the backend: `npm run dev`
- Navigate to project-2/frontend
- Install dependencies: `npm install`
- Run the frontend: `npm run dev`

### Other scripts

Scripts in the root folder. Before running, enter `npm install`

| Command | Comment |
|---------|---------|
| `npm run e2e` | Runs e2e test. It seems some might also need to run `npx install playwright` if it is the first time using this library. |
| `npx playwright show-report` | Must be run after e2e tests.

<br>
<br>

Scripts in the `./frontend/` folder. Make sure to run `npm install` if not already done.

| Command | Comment |
|---------|--------------|
| `npm run test` | Runs all the normal tests, focused on frontend components.|
| `npm run coverage` | Provides a coverage report for how much of the code is covered by tests. |
| `npm run lint` | Checks if the code breaks any linting rules defined `.eslintrc.cjs`|
| `npx prettier --write .` | will apply the prettier format specified in .prettierrc to the whole application.|

<a name="general"></a>

<br>
<br>

Scripts in the `./backend/` folder. Make sure to run `npm install` if not already done.

| Command | Comment |
|---------|--------------|
| `npm run lint` | Checks if the code breaks any linting rules defined `.eslintrc.cjs`|


<a name="general"></a>

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
    - `e2e`: Playwright end-to-end test.
    - `components`: Smaller parts of a page. Inside a subfolder indicating which page they belong to.
    - `hooks`: The hooks of the application
    - `pages`: The pages of the application
    - `redux`: Redux store and all reducers.
    - `tests`: Frontend tests
    - `utils`: Helperfunctions for api calls, tailwind merger and constants
    - `types`: Main frontent typescript types.
    - `App.tsx`: The main component of the application
    - `main.tsx`: The entry point of the application

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

Additional technologies:

- Testing-library
- Playwright
- Tailwind CSS
- Formik
- Lottie react
- Express
- Prisma
- Docker

These will be justified in the important choices section.

### Important Choices

Choices related to testing, environment and accessibility will be discussed in a separate section.

- The Airbnb style guide is used for coding/linting. They can be found
  [here](https://github.com/airbnb/javascript). Although the rules are strict, the advantages of a common coding pattern is worth the extra work and occasional roadblock.

- A prettier config, to make sure all contributors apply prettier in the same way. Without this config, each contributors would apply prettier according to personal settings, which would undermine the whole point of using a tool for standardizing.

- Tailwind CSS for all styling. This is a great way to make sure all code related to a component is collected in the same place. This makes adjustments easier, and bug fixing faster. All current contributors strongly prefer tailwind to all other css solutions.

- Formik is one of the many solutions for forms in react. The decision to pick this solution was made based on prior experience.

- Lottie react provides high quality json animations using a fraction of the space required by other animation types.

- The project uses absolute paths instead of relative paths for file import. This is mostly due to preferance among contributors.

### Database and datasource

The backend solution leverages GraphQL as the query language, with Express as the web framework, Prisma for database management, and Docker for containerization. This technology stack enables efficient data retrieval, seamless API development, and streamlined deployment in a containerized environment.

The data used in this project is sourced from a publicly available dataset from [kaggle](https://www.kaggle.com/datasets/pes12017000148/food-ingredients-and-recipe-dataset-with-images).

<a name="testing"></a>

## Testing

### Mocking

For all tests except e2e tests, mock data is used. Since these tests are intended to run frequently (unlike e2e), it would be a waste of resources to use real data.

To mock data, the api calls must be interrupted, and the expected result replaced with fake data. In this project, this is done by having a small number of json objects, using the same format as real data.

When tests are running, an evironment variable is set. Each function (in `src/utils/api-calls.ts`) checks for this environment variable before sending any network request. When tests are running, the functions simply return the relevant json object.

There are other ways of interrupting api calls. One common option is to use Mock Service Worker (MSW) or similar libraries. The advantage of this is that the testing code is completely seperate from the business code, which is preferred in general. Regardless, we chose to avoid this technique for simplicity. It was deemed acceptable to include a small amount of test code in the business code to allow quicker development, and less use of third party libraries. An added bonus is that it is now possible to start the app in "mock" mode, which allows developers to start the app without internet or backend.

The tests also mock Lottie animations. Since these animations are costly to run, and not needed in tests, they have been replaced by a dummy component.

### Frontend tests

Testing of the frontend is done using Vitest and React Testing Library. All frontend test files are organized under frontent/src/tests in order to maintain a good structure for the project.
To make it possible to test frontent components, a wrapper is created, and used in every test. This is essentially a copy of the whole project, making it possible to access redux store, query client and routes.

The reason for accepting this overhead cost for all tests, is that it allows the tests to mimick how a user would behave. This is in line with the guiding principle of Testing Library: "...tests should resemble how users interact with your code".

An illustrating example: adding a filter to the search result. The test starts off with a view of the main page. Then, a series of userEvents from Testing Library is used to simulate how a user would apply the filter in reality. After the short sequence of actions have completed, the test can then assert that the expected outcome has occured.

These tests might resemble e2e tests more than standard unit tests. This is preferable, beause the code consists primarily of elements that can be interacted with.

The frontend test coverage is around 80%. The major areas that are not tested include api-calls and documentation page. The documentation page is not tested because it is not integral to the application. Api-calls are tested indirectly, through e2e tests. Since the e2e tests use a different library, they do not show up on the coverage report.

### E2E and api testing

Api calls are not tested directly. Instead they are tested indirectly, through e2e tests. This is an acceptable way to test api, according to [instructor](https://piazza.com/class/llxfyt1xe9z2jn/post/147).

The e2e tests are longer series of actions, closely mimicking how a user would navigate in the application. They are not intended to run often and can therefore use real data fetched from the database.

The current e2e test follows these actions:

1. A user going to the website.
2. The user goes to one of the dishes on the front page.
3. Elements of the dish page is tested.

- Correct name
- Correct switch between celsius and fahrenheit

4. The user navigating back to main page.
5. Search for a specific dish.
6. Navigate to the dish.
7. Leave a review on that dish.

### Screen size testing

The application has been tested using windows and macos on chrome and safari. It has also been tested on a standard size mobile phone.

<a name="accessibility"></a>

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

<a name="environment"></a>

## Environment

I. A focus has been placed on not fetching data unnecessarily. This is done by disabling queries when they are not needed, and caching most query results. Tanstack query makes this a lot easier.

II. Darkmode is set by default, which requires less power to display.

III. SVGs and Lottie animations are used. SVGs are compact, and much better than other images. Lottie animations also require a lot less resources than other types of animation.

IV. Only a limited number of results per page. Since images take up a lot of the traffic, only a few is fetched per page.

<a name="checklist"></a>

## Project requirement fulfillment

### Functionality

| Requirement | Status | Comment                                        |
| ------------|--------|------------------------------------------------|
| Search functionality, e.g., through a dialog/form/search field for input of search. | ✔ | Large search bar on the main page. |
| List-based presentation of search results, with support for handling large result sets through either pagination or dynamic loading of more results upon scrolling. | ✔ | 1000 pages of dishes with pagination. |
| Ability to view more details about each object. | ✔ | Each dish can be clicked on, bringing the user to a separate page. |
| Option for sorting and filtering the result set (note that sorting and filtering should be performed on the entire result set and not just what happens to be loaded on the client). | ✔ | Currently possible to filter by which ingredients you want/don't want, and sort by new/rating/alphabetic. |
| Inclusion of some form of user-generated data that should be stored persistently on the database server and presented (e.g., user-contributed information, reviews, ratings, search history, shopping lists, etc.). | ✔ | Users can leave reviews/ratings on the dishes. |
| The solution should demonstrate aspects of universal design/web accessibility (accessibility). | ✔* | Discussed in its own section. |
| The solution should demonstrate aspects of sustainable web development (through design choices). | ✔* | Discussed in its own section. |
| Good design, sensible choices, and solutions that align with the type of data you choose. | ✔ | At least we think so. Reviewers should be free to suggest changes. |
| The database and backend for the project should be hosted on the group's virtual machine at the time of submission. | ✔ |  |


### Use of technology

| Requirement | Status | Comment                                        |
| ------------|--------|------------------------------------------------|
| The user interface should be based on React and programmed in TypeScript. | ✔ |  |
| The project should be set up using Vite. | ✔ |  |
| Use of state management, for example, Redux, Mobx, Recoil, Apollo local state management, etc. | ✔ | The project uses Redux. |
| Custom/developer-built GraphQL backend, free choice of the type of database server on the backend, but the project should use a backend database set up by the group. | ✔ | PostgreSQL with GraphQL. |
| Use of good and relevant components and libraries (free choice, and we encourage maximum reuse of third-party solutions). | ✔ | Lottie, Formik, InfiniteScroll, React-Search-Autocomplete. |


### Testing, development and quality control

| Requirement | Status | Comment                                        |
| ------------|--------|------------------------------------------------|
| Linting and the use of Prettier. | ✔ | Using a Prettier config and ESLint with Airbnb style guide. |
| Comprehensive testing of components (we use Vitest). | ✔* | Most components are tested. More to come. |
| Some form of automated end-to-end testing (in practice, testing a longer sequence of interactions) and API testing. | ✔ | Long sequences of actions testing interaction with the application. The API is tested indirectly through end-to-end tests, which is acceptable according to [instructor](https://piazza.com/class/llxfyt1xe9z2jn/post/147). |
| The project should be documented with a README.md in the Git repository. The documentation should discuss, explain, and reference all the key choices and solutions made by the group (including component and API choices). | ✔* | Need to expand the discussion on choices and solutions. |
| The code should be readable, well-structured, and commented to make it easy for others to understand. Use of comments should be tailored to external code inspection. | ✔* | Let us know if there are some parts that require more attention. |
