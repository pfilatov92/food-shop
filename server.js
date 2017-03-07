var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose   = require('./lib/mongoose');
var config = require('./config/config');
var router = require('./router');
var app = express();

app.set('port', process.env.PORT || config.get('port'));

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

var sessions = require('express-session');
var MongoStore = require('connect-mongostore')(sessions);

app.use(sessions({
  resave: true,
  saveUninitialized: true,
  secret: config.get("session:secret"),
  key: config.get("session:key"),
  cookie: config.get("session:cockie"),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/api', router);
