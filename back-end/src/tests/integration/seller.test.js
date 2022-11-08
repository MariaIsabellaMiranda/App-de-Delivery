const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User, Sale } = require('../../database/models');
const app = require('../../api/app');
const jwt = require('../../helpers/jwt');
const sellerMocks = require('../mocks/seller.mock');
const ordersMock = require('../mocks/orders.mock');

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
      });
    });
  });

  describe('seller/orders/:id - GET', () => {
    describe('quando os dados e o token são válidos', () => {
      before(() => {
        sinon.stub(Sale, 'findOne').resolves(ordersMock.RESPONSE_VALID_ORDER);
        sinon.stub(jwt, 'validateAccessToken').returns(sellerMocks.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna os dados do pedido correspondente ao id passado', async () => {
        const response = await chai
          .request(app)
          .get('/seller/orders/1')
          .set({ Authorization: sellerMocks.VALID_TOKEN});

          expect(response.status).to.be.equal(200);
          expect(response.body).to.deep.equal(ordersMock.RESPONSE_VALID_ORDER);
      });
    });

    describe('quando não encontra o pedido', () => {
      before(() => {
        sinon.stub(Sale, 'findOne').resolves(null);
        sinon.stub(jwt, 'validateAccessToken').returns(sellerMocks.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna erro', async () => {
        const response = await chai
          .request(app)
          .get('/seller/orders/2')
          .set({ Authorization: sellerMocks.VALID_TOKEN})

          expect(response.status).to.be.equal(404);
          expect(response.body).to.deep.equal(sellerMocks.NOT_FOUND_ERROR_ORDER);
      });
    });

    describe('quando o token é inválido', () => {
      it('retorna erro quando o token for inválido', async () => {
        const response = await chai
          .request(app)
          .get('/seller/orders/2')
          .set({ Authorization: sellerMocks.INVALID_TOKEN });
  
          expect(response.status).to.be.equal(401);
          expect(response.body).to.deep.equal(sellerMocks.UNAUTHORIZED_ERROR_TOKEN);
      });
    });
  
    describe('quando não é passado o token', () => {
      it('retorna erro quando não possui token',async () => {
        const response = await chai
          .request(app)
          .get('/seller/orders/2')
          .set({ Authorization: '' });
  
          expect(response.status).to.be.equal(404);
          expect(response.body).to.deep.equal(sellerMocks.NOT_FOUND_ERROR_TOKEN);
      });
    });
  })

  describe('seller/orders/ - GET', () => {
    describe('quando os dados e o token são válidos', () => {
      before(() => {
        sinon.stub(Sale, 'findAll').resolves(sellerMocks.RESPONSE_VALID_ORDERS);
        sinon.stub(jwt, 'validateAccessToken').returns(sellerMocks.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.findAll.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna todos os pedidos de determinado vendedor ', async () => {
        const response = await chai
          .request(app)
          .get('/seller/orders')
          .set({ Authorization: sellerMocks.VALID_TOKEN});

          expect(response.status).to.be.equal(200);
          expect(response.body).to.deep.equal(sellerMocks.RESPONSE_VALID_ORDERS);
      });
    });

    describe('quando o token é inválido', () => {
      it('retorna erro quando o token for inválido', async () => {
        const response = await chai
          .request(app)
          .get('/seller/orders')
          .set({ Authorization: sellerMocks.INVALID_TOKEN });
  
          expect(response.status).to.be.equal(401);
          expect(response.body).to.deep.equal(sellerMocks.UNAUTHORIZED_ERROR_TOKEN);
      });
    });
  
    describe('quando não é passado o token', () => {
      it('retorna erro quando não possui token',async () => {
        const response = await chai
          .request(app)
          .get('/seller/orders')
          .set({ Authorization: '' });
  
          expect(response.status).to.be.equal(404);
          expect(response.body).to.deep.equal(sellerMocks.NOT_FOUND_ERROR_TOKEN);
      });
    });
  })
})