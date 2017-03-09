var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('get /api/cart tests:', () => {
    it('it should get empty cart initially', (done) => {
    chai.request(server)
        .get('/api/cart')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body['data'].should.have.property('products');
            res.body['data']['products'].should.have.length(0);
            res.body['data'].should.have.property('total_sum', 0);
            res.body['data'].should.have.property('products_count', 0);
            done();
        });
    });
});
