//import express and CORS
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/auth/userRouter');
// declaring Middlewars 

app.use(express.json());
app.use(cors());
app.use('/api/users',userRouter);

module.exports = app
