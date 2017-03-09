var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('get /api/products tests:', () => {
    it('it should get 4 products from db', (done) => {
    chai.request(server)
        .get('/api/products')
        .end((err, res, body) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body['data'].should.be.a('array');
            res.body['data'].should.have.length(4);
            done();
        });
    });
});