//import express and CORS
const express = require('express');
const app = express();
const cors = require('cors');

// declaring Middlewars 

app.use(express.json());
app.use(cors());

module.exports = app
