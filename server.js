const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./Routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnet_nosqldb', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true

});


mongoose.set('debug', true);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);

})








