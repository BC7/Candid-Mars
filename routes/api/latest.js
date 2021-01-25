const express = require('express');
const search = require('../../utils/search');
const app = express();

// GET: /api/latest/:rover
app.get('/:rover', async (req, res) => {
  // 24 hours = 86400000 milliseconds
  const { rover } = req.params;
  let date = new Date();
  let photos = [];
  let earth_date = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  while (photos.length <= 0) {
    let { data } = await search({
      rover,
      earth_date,
    });

    photos = data.photos;

    if (photos.length <= 0) {
      date = new Date(date.getTime() - 86400000);
      earth_date = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
    }
  }

  res.json({ photos, earth_date, rover });
});
module.exports = app;
