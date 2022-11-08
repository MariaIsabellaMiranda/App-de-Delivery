const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User, Sale } = require('../../database/models');
const app = require('../../api/app');
const jwt = require('../../helpers/jwt');
const statusMock = require('../mocks/status.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('/status route', () => {
  describe('/status - PUT', () => {
    describe('quando os dados e o token são válidos', () => {
      before(() => {
        sinon.stub(Sale, 'findOne').resolves(statusMock.RESPONSE_VALID_ORDER);
        sinon.stub(Sale, 'update').resolves();
        sinon.stub(jwt, 'validateAccessToken').returns(statusMock.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.findOne.restore();
        Sale.update.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna o novo status do pedido', async () => {
        const response = await chai
         .request(app)
          .put('/status')
          .set({ Authorization: statusMock.VALID_TOKEN})
          .send(statusMock.VALID_PAYLOAD);

          expect(response.status).to.be.equal(201);
          expect(response.body).to.deep.equal(statusMock.RESPONSE_VALID_UPDATE);
      });
    });

    describe('quando não encontra o pedido', () => {
      before(() => {
        sinon.stub(Sale, 'findOne').resolves(null);
        sinon.stub(jwt, 'validateAccessToken').returns(statusMock.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna erro ao não encontrar o pedido', async () => {
        const response = await chai
          .request(app)
          .put('/status')
          .set({ Authorization: statusMock.VALID_TOKEN })
          .send(statusMock.INVALID_PAYLOAD);

          expect(response.status).to.be.equal(404);
          expect(response.body).to.deep.equal(statusMock.NOT_FOUND_ERROR_ORDER);
      });
    });

    describe('quando o usuário ou vendedor não é dono do pedido', () => {
      before(() => {
        sinon.stub(Sale, 'findOne').resolves(statusMock.RESPONSE_UNAUTHORIZED);
        sinon.stub(jwt, 'validateAccessToken').returns(statusMock.JWT_VALIDATE_USER);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna erro ao verificar o usuário ou vendedor responsável', async () => {
        const response = await chai
          .request(app)
          .put('/status')
          .set({ Authorization: statusMock.VALID_TOKEN })
          .send(statusMock.VALID_PAYLOAD);

          expect(response.status).to.be.equal(401);
          expect(response.body).to.deep.equal(statusMock.UNAUTHORIZED_ERROR_UPDATE);
      });
    });
  })

  describe('quando o token é inválido', () => {
    it('retorna erro quando o token for inválido', async () => {
      const response = await chai
        .request(app)
        .put('/status')
        .set({ Authorization: statusMock.INVALID_TOKEN })
        .send(statusMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal(statusMock.UNAUTHORIZED_ERROR_TOKEN);
    });
  });

  describe('quando não é passado o token', () => {
    it('retorna erro quando não possui token',async () => {
      const response = await chai
        .request(app)
        .put('/status')
        .set({ Authorization: '' })
        .send(statusMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.deep.equal(statusMock.NOT_FOUND_ERROR_TOKEN);
    });
  });

  describe('quando os dados são inválidos', () => {
    before(() => {
      sinon.stub(jwt, 'validateAccessToken').returns(statusMock.JWT_VALIDATE_USER);
    });

    after(() => {
      jwt.validateAccessToken.restore();
    });

    it('quando não passa na verificação do joi', async () => {
      const response = await chai
        .request(app)
        .put('/status')
        .set({ Authorization: statusMock.VALID_TOKEN })
        .send(statusMock.INVALID_JOI_PAYLOAD);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.have.property('message');
    });
  });
});