var express = require('express');
var path = require('path');
var http = require('http');
var indexRouter = require('./routes/index');

var app = express();

app.set( 'views', path.join(__dirname, 'views') );
app.set( 'view engine', 'ejs' );

app.use( express.static( path.join(__dirname, 'public') ) );
app.use( indexRouter );

var server = http.createServer(app);
server.listen(process.env.PORT || 3000);
