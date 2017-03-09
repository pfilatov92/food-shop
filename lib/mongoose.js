var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.Promise = global.Promise;//to prevent warning
mongoose.connect(config.get("mongoUri"));
module.exports = mongoose;