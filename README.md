# Candid-Mars

A landing page that displays photos of mars taken by the Mars Rover via NASA's Mars Rover Photo api

[demo](https://candid-mars.herokuapp.com/)

## Prequisites

- NASA_API_KEY environment variable ([NASA Developer Key](https://api.nasa.gov/#signUp))

- NPM or Yarn

## Setup

`yarn install` or `npm install`

`yarn start` or `npm start`

## Usage

- /api/recent

  - Returns a list of latest photos taken for a specified rover (default curiosity) along with the earth_date it was taken on and the rover that took it

- /api/archives/{rover}/{earth_date}?pg={page}

  - Returns a list of photos taken on a specific earth_date by a specific rover

  - Returns first page by default if no pg parameter is found
