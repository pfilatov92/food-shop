var mongoose = require('./mongoose');
var Product = require('../models/product');
var config = require('../config/config');
var _ = require('lodash');
var async = require('async');

createDb();

function createDb() {
    async.series([
        openDb,
        dropDb,
        createProducts
    ], function(err) {
        if (err)
            throw err;

        mongoose.disconnect();
    });
}

function openDb(callback) {
    mongoose.connection.on('open', callback);
}

function dropDb(callback) { 
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function createProducts(callback) {
    var products = config.get('products');
    if (!_.isArray(products))
        throw Error("Parameter is not array")//error mechanizm
    
    async.each(products, function(data, callback) {
        var p = new Product(data);
        p.save(callback);
    }, callback);
}

module.exports = createDb;