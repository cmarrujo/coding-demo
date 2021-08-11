const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

const participants = require('./data/participants.json');
const games = require('./data/games.json');

app.use(cors({ origin: true }));

app.get('/participants', (req, res) => {
  res.json(participants);
});

app.get('/games', (req, res) => {
  res.json(games);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});