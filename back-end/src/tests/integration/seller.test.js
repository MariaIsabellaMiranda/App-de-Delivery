const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../database/models');
const app = require('../../api/app');
const sellerMocks = require('../mocks/seller.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('/seller route', () => {
  describe('/ GET', () => {
    describe('retorna uma lista com todos os usuários com role seller', () => {
      before(() => {
        sinon.stub(User, 'findAll').resolves(sellerMocks.RESPONSE_VALID);
      });

      after(() => {
        User.findAll.restore();
      });

      it('se retorna a lista de usuários seller', async () => {
        const response = await chai
          .request(app)
          .get('/seller')
          expect(response.status).to.be.equal(200);
          expect(response.body).to.deep.equal(sellerMocks.RESPONSE_VALID);
      })
    })
  })
})