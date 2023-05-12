const express = require('express')
const dbconnect = require('./config')
const userRoute=require('./routes/userRoute')
const mechanicRoute=require('./routes/mechanicRoute')
const adminRoute=require('./routes/adminRoute')
require('dotenv').config()
const app=express()
dbconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',userRoute)
app.use('/mechanic',mechanicRoute)
app.use('/admin',adminRoute)


app.listen(4000,()=>{
    console.log("localhost running on http://localhost:4000");
})