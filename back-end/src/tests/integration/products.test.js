const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const productsMock = require('../mocks/products.mock');
const { Product } = require('../../database/models');
const app = require('../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('/products route', () => {
  
  describe('/ - GET', () => {

    describe('quando existe produtos no banco de dados', () => {

      before(() => {
        sinon.stub(Product, 'findAll').resolves(productsMock.PRODUCTS);
      });

      after(() => {
        Product.findAll.restore();
      });

      it('retorna a lista de produtos', async () => {
        const response = await chai
          .request(app)
          .get('/products');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal(productsMock.PRODUCTS);
      });

    });

  });
  
});
