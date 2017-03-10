var path = require('path');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('./lib/mongoose');
var config = require('./config/config');
var app = express();
var sessions = require('express-session');
var MongoStore = require('connect-mongo')(sessions);
var Cart = require('./models/cart');
var RewriteMiddleware = require('express-htaccess-middleware');
var RewriteOptions = {
  file: path.resolve(__dirname, '.htaccess'),
  verbose: (process.env.ENV_NODE == 'development'),
  watch: (process.env.ENV_NODE == 'development'),
  server: app,
};

app.set('port', process.env.PORT || config.get('port'))

app.use(RewriteMiddleware(RewriteOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessions({
  resave: true,
  saveUninitialized: true,
  secret: config.get("session:secret"),
  key: config.get("session:key"),
  cookie: config.get("session:cockie"),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/', require('./controllers'));

http.createServer(app).listen(app.get('port'), function() {
  onServerStart();
  console.log('Server is listening on port ' + app.get('port'));
});

function onServerStart() {
  Cart.setDeleteTimers();
}

module.exports = app;