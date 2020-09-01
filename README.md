# MyCypressApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

When we run cypress command we obtain the screenshots in the folder outputs
and the report and the folder cypress/results. We can changed this configuration in the file cypress.json

The project have a pipeline for dockerized jenkins. Almost the project generate a report of lighthouse

## Configuration
We need to install cypress in our computer. If we using docker and jenkins, remember install google-chrome into the dockerized jenkins, also, we need obtain the image cypress and the image browslesschrome for the correct work.

¡¡Remember add the label docker in the global configuration of jenkins dockerized!!

## Running unit tests

```node 
npm run test or ng test
```

## Running end-to-end tests

 you can choose two types of reports:

- Report 1 with xml files:
    - Add into cypress.json:
    ```json
        "reporter": "cypress-multi-reporters",
        "reporterOptions": {
            "configFile": "reporter-config.json"
        },
        ...
    ```

 - Report 2 with json and html files:
    - Add into cypress.json:
    ```json
        "reporter": "mochawesome",
        "reporterOptions": {
            "reportDir": "cypress/results",
            "overwrite": false,
            "html": true,
            "json": true
        },
        ...
    ```

## Execute commands:
- Report 1: 
    ```node 
    - npm run prereport
    - npm run cy:run:chrome:report or npm rucy:run:firefox:report or npm run cy:run:edge:report
    ```
Report 2:
```node 
npm run cy:run:mochawesome
```
    
Lighthouse:
```node 
npm run lighthouse
```

