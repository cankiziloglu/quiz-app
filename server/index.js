const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
