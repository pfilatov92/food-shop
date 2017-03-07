var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(config.get("mongoUri"));
module.exports = mongoose;