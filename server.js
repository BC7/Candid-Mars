require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.static('public'));
app.use('/', routes);

app.listen(PORT, (err) => {
  if (err) throw err;
  if (PORT == 8000) console.log(`http://localhost:8000`);
  console.log(`Listening on port ${PORT}`);
});
