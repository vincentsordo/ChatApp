require('./config/config.js');

const express = require('express');
const path = require('path');

const port = process.env.PORT;

const app = express();

// middleware for static files
app.use(express.static(path.join(__dirname, '../public')));


app.listen(port, () => {
  console.log(`Started on port ${port}`);
})
