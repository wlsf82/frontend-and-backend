# frontend-and-backend

![CI](https://github.com/wlsf82/frontend-and-backend/actions/workflows/ci.yml/badge.svg)

Sample project with basic "backend" and frontend, running Cypress tests on GitHub Actions.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.26.2` while writing this doc)
- [nodejs](https://nodejs.org/en/) (I've used version `14.17.3` while writing this doc)
- NPM (I've used version `6.14.13` while writing this doc)

**Note:** When installing nodejs, NPM is automatically installed too.

## Installing and starting the servers

Read the following [doc](./TestEnvironment.md) to install and start the backend and frontend servers.

## Installation of `devDependencies`

After cloning this project, to install the dev dependencies, run `npm install` (or `npm i` for short.)

## Tests

Run `npm run test:frontend:unit` to run the frontend unit tests.

Run `npm run test:api:with:servers` to run the API tests.

> **Note:** This script starts the required servers before-hand, and shuts them down when tests finish running.

Run `npm run test:frontend:with:server` to run the UI tests in headless mode.

> **Note 2:** This script starts the frontend server before-hand, and shuts it down when tests finish running.
>
> **Note 3:** When running in headless mode, Cypress automatically saves videos of the executions at `cypress/videos/`, and if tests fail, Cypress automatically saves screenshots of the failures at `cypress/screenshots/`.

### Interactive mode

1. Run `npm run cy:open:with:servers` to open the Cypress Test Runner to run tests in interactive mode.

> **Note 4:** This script starts the required servers before-hand, and shuts them down after the runner is closed.
2. With the test runner opened, click on the test file you want to test, or run them all.

___

Made with ❤️ by [Walmyr](https://walmyr.dev).
