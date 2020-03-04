const express = require('express');
const process = require('dotenv').config();

var teams = require('./routes/teams')

var app = express();


app.use(express.json());
app.use('/teams',teams);


app.listen(80,function(){
    console.log("listening on port 80")
})