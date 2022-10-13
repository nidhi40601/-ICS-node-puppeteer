const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
require('./models/scrappedData.model');
const scheduler = require('./scheduler');


scheduler();


app.listen(8000, () => console.log(`Server listening on port 8000`));