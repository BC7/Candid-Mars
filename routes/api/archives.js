const express = require('express');
const search = require('../../utils/search');
const app = express();

// GET: /api/archives/rover/date
app.get('/:rover/:earth_date', (req, res) => {
  const { rover, earth_date } = req.params;
  const pg = req.query.pg;

  search({
    rover,
    earth_date,
    pg,
  })
    .then(({ data }) => {
      res.json({ photos: data.photos, earth_date });
    })
    .catch(() => {
      res.json({ photos: [], earth_date, rover });
    });
});
module.exports = app;
