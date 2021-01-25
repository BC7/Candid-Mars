const express = require('express');
const latestRoute = require('./latest');
const archiveRoute = require('./archives');
const app = express();

// /api/latest
app.use('/latest', latestRoute);

// /api/archives
app.use('/archives/', archiveRoute);

// /api/
app.use('/', (req, res) => {
  res.send(':)');
});

module.exports = app;
