var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('get unknown url tests:', () => {
    it('it should return 404 on /api/products/smth', (done) => {
    chai.request(server)
        .get('/api/products/smth')
        .end((err, res, body) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            done();
        });
    });
});