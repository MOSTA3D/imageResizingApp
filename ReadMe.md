# Image resizing project

## Instructions

### Install dependencies

by typing `npm install` in the terminal within the project directory.

### Hints

for providing the best user expreience it's better to name the images as `imageName_full.jpg`

### Building the project

`npm run build`

### Linting

`npm run lint`

### Running prettier

`npm run prettier`

### Running tests _building first_

`npm run build&&npm run test`

### Accessing the application

This application works on port 3000 on the localhost
by providing url `localhost:3000`

### Access functionality

There are 2 ways for accessing the functionality of the app.
* in the root, you will find a form with 3 fields image, width and height, query parameters are the same names.

* by providing query parameters directly in the url ex: `http://localhost:3000?image=armored&width=500&height=500`, available images names are provided in the root route.

    