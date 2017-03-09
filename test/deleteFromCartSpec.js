var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var async = require('async');
var should = chai.should();

chai.use(chaiHttp);

describe('delete /api/cart tests:', () => {
    it('it should delete single products', (done) => {
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
                agent.delete('/api/cart')
                .send({product_id: 2})
                .end((err, res) => {
                    res.should.have.status(200);
                    cb();
                });
            },
            (cb) => {
                agent.get('/api/cart')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body['data']['products'].should.have.length(0);
                    cb();
                })
            }
        ], done)
    });

    it('it should reduce count of multiple products', (done) => {
        var agent = chai.request.agent(server);
        async.series([
            (cb) => {
                agent.post('/api/cart')
                .send({product_id: 2, quantity: 5})
                .end((err, res) => {
                    res.should.have.status(200);
                    cb();
                });
            },
            (cb) => {
                agent.delete('/api/cart')
                .send({product_id: 2})
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
                    res.body['data']['products'][0].should.have.property('quantity', 4);
                    cb();
                })
            }
        ], done)
    });

    it('it should not delete inexisting products', (done) => {
    chai.request(server)
        .delete('/api/cart')
        .send({product_id: 4})
        .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have.property('error');
            done();
        });
    });
});
