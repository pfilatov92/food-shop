var async = require('async');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('post /api/cart tests:', () => {
    it('it should add a product', (done) => {
        var agent = chai.request.agent(server);
        async.series([
            (cb) => {
                agent.post('/api/cart')
                .send({product_id: 2, quantity: 1})
                .end((err, res) => {
                    res.should.have.status(200);
                    cb();
                });
            },
            (cb) => {
                agent.get('/api/cart')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body['data']['products'].should.have.length(1);
                    res.body['data']['products'][0].should.have.property('productId', '2');
                    res.body['data']['products'][0].should.have.property('quantity', 1);
                    cb();
                });
            }
        ], done);
    });

    it('it should add some products', (done) => {
        var agent = chai.request.agent(server);
        async.series([
            (cb) => {
                agent.post('/api/cart')
                .send({product_id: 3, quantity: 5})
                .end((err, res) => {
                    res.should.have.status(200);
                    cb();
                });
            },
            (cb) => {
                agent.post('/api/cart')
                .send({product_id: 3, quantity: 2})
                .end((err, res) => {
                    res.should.have.status(200);
                    cb();
                });
            },
            (cb) => {
                agent.get('/api/cart')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body['data']['products'].should.have.length(1);
                    res.body['data']['products'][0].should.have.property('productId', '3');
                    res.body['data']['products'][0].should.have.property('quantity', 7);
                    cb();
                });
            }
        ], done);
    });

    it('it should not add product with wrong id', (done) => {
        chai.request(server)
        .post('/api/cart')
        .send({product_id: 666, quantity: 5})
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property('error');
            done();
        });
    });

    it('it should not add product with not integer quantity', (done) => {
        chai.request(server)
        .post('/api/cart')
        .send({product_id: 1, quantity: 'five'})
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            done();
        });
    });

    it('it should not add product with quntity not in range 1-10', (done) => {
        chai.request(server)
        .post('/api/cart')
        .send({product_id: 1, quantity: 11})
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            done();
        });
    });
 });
