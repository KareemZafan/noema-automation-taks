# Noema Automation Task

This project contains test automation scripts using Playwright for a fictional web application representing a bank,
accessible at https://parabank.parasoft.com/parabank/index.htm.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Folder Structure](#folder-structure)
- [Running Tests](#running-tests)

## Prerequisites

- Node.js installed (https://nodejs.org/) with version +16
- Docker Desktop installed (for running Parabank locally)

## Setup

1. Clone the repository:

   ```clone the repo
   git clone https://github.com/KareemZafan/noema-automation-task.git
   ```
   ```navigate to the repo
    cd noema-automation-task
   ```
   
   ```install node package manager
   npm install
   ```
   ``` install playwright
   npm init playwright@latest
   ```

## Running Container, opening website locally 

- To run the tests, make sure the Parabank web application is running locally using Docker:

 ```bash
  docker-compose -f docker-compose-parabank.yml up
 ```
 ```
  http://localhost:8080/parabank/
 ```

## Folder Structure

- /tests: Contains test scripts for different scenarios.
- /pages: Page objects representing different pages of the application.
- /reports: Generated test reports.
- /resource: Test data need for running tests.

## Running Tests

``` run all test in parallel using chrome and firefox
  npx playwright test tests/ --headed 
```

```run all tests in single browser (Firefox) only 
  npx playwright test tests/ --headed --project firefox 
```

```show test report 
   npx playwright show-report
```
