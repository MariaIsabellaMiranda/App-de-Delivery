const jwt = require('../../helpers/jwt');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const registerMock = require('../mocks/register.mock');
const loginMock = require('../mocks/login.mock');
const { User } = require('../../database/models');
const app = require('../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('/common route', () => {

  describe('/register - POST', () => {

    describe('quando os dados são válidos', () => {

      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(User, 'create').resolves({ get: () => registerMock.SEQUELIZE_CREATED_USER });
        sinon.stub(jwt, 'createAccessToken').returns(loginMock.RESPONSE_VALID.token);
      });

      after(() => {
        User.findOne.restore();
        User.create.restore();
        jwt.createAccessToken.restore();
      });

      it('retorna informações do usuário com o token', async () => {
        const response = await chai
          .request(app)
          .post('/common/register')
          .send(registerMock.VALID_PAYLOAD);
        expect(response.status).to.be.equal(201);
        expect(response.body).to.deep.equal(registerMock.RESPONSE_VALID);
      });

    });

    describe('quando os dados são válidos mas já existe um email/name correspondendo no database', () => {

      before(() => {
        sinon.stub(User, 'findOne').resolves(registerMock.SEQUELIZE_CREATED_USER);
      });

      after(() => {
        User.findOne.restore();
      });

      it('retorna um erro - CONFLICT 401', async () => {
        const response = await chai
          .request(app)
          .post('/common/register')
          .send(registerMock.VALID_PAYLOAD);
        expect(response.status).to.be.equal(409);
        expect(response.body).to.deep.equal(registerMock.CONFLICT_ERROR);
      });

    });

    describe('quando os dados são inválidos', () => {

      it('retorna um erro - BAD REQUEST 400', async () => {
        const response = await chai
          .request(app)
          .post('/common/register')
          .send(registerMock.INVALID_PAYLOAD);
        expect(response.status).to.be.equal(400);
        expect(response.body).to.deep.equal(registerMock.BAD_REQUEST_ERROR);
      });

    });

  });

  describe('/login - POST', () => {

    describe('quando os dados são válidos', () => {

      before(() => {
        sinon.stub(User, 'findOne').resolves(loginMock.SEQUELIZE_USER);
        sinon.stub(jwt, 'createAccessToken').returns(loginMock.RESPONSE_VALID.token);
      });

      after(() => {
        User.findOne.restore();
        jwt.createAccessToken.restore();
      });

      it('retorna informações do usuário com o token', async () => {
        const response = await chai
          .request(app)
          .post('/common/login')
          .send(loginMock.VALID_PAYLOAD);
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal(loginMock.RESPONSE_VALID);
      });

    });

    describe('quando os dados são válidos mas já não existe no database', () => {

      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
      });

      after(() => {
        User.findOne.restore();
      });

      it('retorna um erro - NOT FOUND 404', async () => {
        const response = await chai
          .request(app)
          .post('/common/login')
          .send(loginMock.VALID_PAYLOAD);
        expect(response.status).to.be.equal(404);
        expect(response.body).to.deep.equal(loginMock.NOT_FOUND_ERROR);
      });

    });

    describe('quando os dados são válidos mas a senha é inválida', () => {

      before(() => {
        sinon.stub(User, 'findOne').resolves({ ...loginMock.SEQUELIZE_USER, password: 'invalid_password' });
      });

      after(() => {
        User.findOne.restore();
      });

      it('retorna um erro - BAD REQUEST 400', async () => {
        const response = await chai
          .request(app)
          .post('/common/login')
          .send(loginMock.VALID_PAYLOAD);
        expect(response.status).to.be.equal(400);
        expect(response.body).to.deep.equal(loginMock.BAD_REQUEST_ERROR_PASS);
      });

    });

    describe('quando os dados são inválidos', () => {

      it('retorna um erro - BAD REQUEST 400', async () => {
        const response = await chai
          .request(app)
          .post('/common/login')
          .send(loginMock.INVALID_PAYLOAD);
        expect(response.status).to.be.equal(400);
        expect(response.body).to.deep.equal(loginMock.BAD_REQUEST_ERROR_JOI);
      });

    });

  });

});
