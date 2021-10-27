const express = require('express');
//const mongoose = require('mongoose');
const Routes = require('./Routes');
const db = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Routes);

//mongoose.set('debug', true);
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
