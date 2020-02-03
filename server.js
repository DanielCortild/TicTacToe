/*
Created on: Friday December 17th of January 2020
Author: Daniel Cortild (https://github.com/DanielCortild)
*/

var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

app.set( 'views', path.join(__dirname, 'views') );
app.set( 'view engine', 'ejs' );

app.use( express.static( path.join(__dirname, 'public') ) );

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'TicTacToe' });
});

app.use( router );

var server = http.createServer(app);
server.listen(process.env.PORT || 5000);
