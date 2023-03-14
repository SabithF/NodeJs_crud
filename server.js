// creating HTTP Server

const express = require('express');
const dotenv = require('dotenv');
const morgan= require('morgan'); 
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app=express();

//defining dotenv's path
dotenv.config({path: 'config.env'});

const PORT = process.env.PORT || 8080;

// Morgan module
// log request -- when ever we make a requrest it will print a log 
app.use(morgan('tiny'));

// Mongo DB connection
connectDB();

// parse request to body-parser
// app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// set view engine "ejs"/ "HTML"
app.set("view engine","ejs");

// if you're adding your views files into seperate folder under views you have to define the path
// app.set("views", path.resolve(__dirname, "views/ejs"));


// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// loading routers
app.use('/',require('./server/routes/router'));

app.listen(PORT, ()=> {console.log('Server is running on ',PORT)});