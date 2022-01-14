//import dotenv and config
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');

//import mongoose and connect Mongo Db
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_SERVER)
.then(()=>{
    console.log('Database Connected');
})
.catch(error =>{
    console.log(error)
})

const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})