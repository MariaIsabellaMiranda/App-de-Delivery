const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Sale, SaleProduct } = require('../../database/models');
const checkoutMock = require('../mocks/checkout.mock');
const ordersMock = require('../mocks/orders.mock');
const app = require('../../api/app');
const jwt = require('../../helpers/jwt');

chai.use(chaiHttp);

const { expect } = chai;

describe('/ customer', () => {
  describe('/checkout - POST', () => {
    describe('quando os dados e o token são válidos', () => {
      before(() => {
        sinon.stub(Sale, 'create').resolves(checkoutMock.SEQUELIZE_CREATED_SALE);
        sinon.stub(SaleProduct, 'bulkCreate').resolves();
        sinon.stub(jwt, 'validateAccessToken').returns(checkoutMock.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.create.restore();
        SaleProduct.bulkCreate.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna o id do pedido', async () => {
        const response = await chai
          .request(app)
          .post('/customer/checkout')
          .set({ Authorization: checkoutMock.VALID_TOKEN})
          .send(checkoutMock.VALID_PAYLOAD);
          expect(response.status).to.be.equal(201);
          expect(response.body).to.deep.equal(checkoutMock.RESPONSE_VALID);
      });
    });

    describe('quando o token é inválido', () => {
      it('quando o token é inválido', async () => {
        const response = await chai
          .request(app)
          .post('/customer/checkout')
          .set({ Authorization: checkoutMock.INVALID_TOKEN })
          .send(checkoutMock.VALID_PAYLOAD);
          expect(response.status).to.be.equal(401);
          expect(response.body).to.deep.equal(checkoutMock.UNAUTHORIZED_ERROR_TOKEN);
      });

    });

    describe('quando não é passado o token', () => {
      it('quando não possui token',async () => {
        const response = await chai
          .request(app)
          .post('/customer/checkout')
          .set({ Authorization: '' })
          .send(checkoutMock.VALID_PAYLOAD);
          expect(response.status).to.be.equal(404);
          expect(response.body).to.deep.equal(checkoutMock.NOT_FOUND_ERROR_TOKEN);
      });
    });

    describe('quando os dados são inválidos', () => {
      before(() => {
        sinon.stub(jwt, 'validateAccessToken').returns(checkoutMock.JWT_VALIDATE_USER);
      });
  
      after(() => {
        jwt.validateAccessToken.restore();
      });

      it('quando não passa na verificação do joi', async () => {
        const response = await chai
          .request(app)
          .post('/customer/checkout')
          .set({ Authorization: checkoutMock.VALID_TOKEN })
          .send(checkoutMock.INVALID_PAYLOAD);
          expect(response.status).to.be.equal(400);
          expect(response.body).to.have.property('message');
      });
    });
  });

  describe('/orders/:id - GET', () => {
    describe('quando os dados e o token são válidos', () => {
      before(() => {
        sinon.stub(Sale, 'findOne').resolves(ordersMock.RESPONSE_VALID_ORDER);
        sinon.stub(jwt, 'validateAccessToken').returns(ordersMock.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna os dados do pedido correspondente ao id passado', async () => {
        const response = await chai
          .request(app)
          .get('/customer/orders/1')
          .set({ Authorization: ordersMock.VALID_TOKEN});

          expect(response.status).to.be.equal(200);
          expect(response.body).to.deep.equal(ordersMock.RESPONSE_VALID_ORDER);
      });
    });

    describe('quando não encontra o pedido', () => {
      before(() => {
        sinon.stub(Sale, 'findOne').resolves(null);
        sinon.stub(jwt, 'validateAccessToken').returns(ordersMock.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna erro', async () => {
        const response = await chai
          .request(app)
          .get('/customer/orders/1')
          .set({ Authorization: ordersMock.VALID_TOKEN})

          expect(response.status).to.be.equal(404);
          expect(response.body).to.deep.equal(ordersMock.NOT_FOUND_ERROR_ORDER);
      });
    });

    describe('quando o token é inválido', () => {
      it('retorna erro quando o token for inválido', async () => {
        const response = await chai
          .request(app)
          .get('/customer/orders/1')
          .set({ Authorization: ordersMock.INVALID_TOKEN });
  
          expect(response.status).to.be.equal(401);
          expect(response.body).to.deep.equal(ordersMock.UNAUTHORIZED_ERROR_TOKEN);
      });
    });
  
    describe('quando não é passado o token', () => {
      it('retorna erro quando não possui token',async () => {
        const response = await chai
          .request(app)
          .get('/customer/orders/1')
          .set({ Authorization: '' });
  
          expect(response.status).to.be.equal(404);
          expect(response.body).to.deep.equal(ordersMock.NOT_FOUND_ERROR_TOKEN);
      });
    });
  })

  describe('/orders/ - GET', () => {
    describe('quando os dados e o token são válidos', () => {
      before(() => {
        sinon.stub(Sale, 'findAll').resolves(ordersMock.RESPONSE_VALID_ORDERS);
        sinon.stub(jwt, 'validateAccessToken').returns(ordersMock.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.findAll.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna todos os pedidos de determinado usuário ', async () => {
        const response = await chai
          .request(app)
          .get('/customer/orders')
          .set({ Authorization: ordersMock.VALID_TOKEN});

          expect(response.status).to.be.equal(200);
          expect(response.body).to.deep.equal(ordersMock.RESPONSE_VALID_ORDERS);
      });
    });

    describe('quando o token é inválido', () => {
      it('retorna erro quando o token for inválido', async () => {
        const response = await chai
          .request(app)
          .get('/customer/orders')
          .set({ Authorization: ordersMock.INVALID_TOKEN });
  
          expect(response.status).to.be.equal(401);
          expect(response.body).to.deep.equal(ordersMock.UNAUTHORIZED_ERROR_TOKEN);
      });
    });
  
    describe('quando não é passado o token', () => {
      it('retorna erro quando não possui token',async () => {
        const response = await chai
          .request(app)
          .get('/customer/orders')
          .set({ Authorization: '' });
  
          expect(response.status).to.be.equal(404);
          expect(response.body).to.deep.equal(ordersMock.NOT_FOUND_ERROR_TOKEN);
      });
    });
  })
});