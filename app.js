//import express and CORS
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/auth/userRouter');
const orderRouter = require('./routers/order/orderRouter')
// declaring Middlewars 

app.use(express.json());
app.use(cors());
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter)

module.exports = app
