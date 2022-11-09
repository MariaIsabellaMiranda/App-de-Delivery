const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User, Sale } = require('../../database/models');
const app = require('../../api/app');
const jwt = require('../../helpers/jwt');
const admMock = require('../mocks/adm.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('/adm route', () => {
  describe('adm/register - POST', () => {

    describe('quando os dados são válidos', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(admMock.RESPONSE_ADM);
        sinon.stub(User, 'findOrCreate').resolves([{ get: () => admMock.SEQUELIZE_CREATED_USER },{created: true}]);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        User.findOrCreate.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna informações do usuário criado', async () => {
        const response = await chai
          .request(app)
          .post('/adm/register')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.deep.equal(admMock.RESPONSE_VALID);
      });
    });

    describe('quando os dados são válidos mas já existe um email/name correspondendo no database', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(admMock.RESPONSE_ADM);
        sinon.stub(User, 'findOrCreate').resolves([{ get: () => admMock.SEQUELIZE_CREATED_USER }]);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        User.findOrCreate.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna um erro - CONFLICT 401', async () => {
        const response = await chai
          .request(app)
          .post('/adm/register')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(409);
        expect(response.body).to.deep.equal(admMock.CONFLICT_ERROR);
      });
    });

    describe('quando os dados são inválidos', () => {
      it('retorna um erro do joi - BAD REQUEST 400', async () => {
        const response = await chai
          .request(app)
          .post('/adm/register')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.INVALID_PAYLOAD);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.deep.equal(admMock.BAD_REQUEST_ERROR);
      });
    });

    describe('quando a requisição não é feita por um administrador', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(admMock.RESPONSE_NOT_ADM);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna um erro de unauthorized', async () => {
        const response = await chai
          .request(app)
          .post('/adm/register')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal(admMock.UNAUTHORIZED_ERROR);
      });
    });

    describe('quando o token é inválido', () => {
      it('retorna erro quando o token for inválido', async () => {
        const response = await chai
          .request(app)
          .post('/adm/register')
          .set({ Authorization: admMock.INVALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);
  
          expect(response.status).to.be.equal(401);
          expect(response.body).to.deep.equal(admMock.UNAUTHORIZED_ERROR_TOKEN);
      });
    });
  
    describe('quando não é passado o token', () => {
      it('retorna erro quando não possui token',async () => {
        const response = await chai
          .request(app)
          .post('/adm/register')
          .set({ Authorization: ''})
          .send(admMock.VALID_PAYLOAD);
  
          expect(response.status).to.be.equal(404);
          expect(response.body).to.deep.equal(admMock.NOT_FOUND_ERROR_TOKEN);
      });
    });

    describe('quando a pessoa que fez a requisição não existe no db', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna um erro de NotFound', async () => {
        const response = await chai
          .request(app)
          .post('/adm/register')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.deep.equal(admMock.NOT_FOUND_ERROR_USER);
      });
    });
  });

  describe('/ GET', () => {
    describe('retorna os dados dos usuários cadastrados que não são administradores', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(admMock.RESPONSE_ADM);
        sinon.stub(User, 'findAll').resolves(admMock.RESPONSE_VALID_USERS);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findAll.restore();
        User.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('se retorna a lista de usuários', async () => {
        const response = await chai
          .request(app)
          .get('/adm')
          .set({ Authorization: admMock.VALID_TOKEN});

          expect(response.status).to.be.equal(200);
          expect(response.body).to.deep.equal(admMock.RESPONSE_VALID_USERS);
      });
    });

    describe('quando a requisição não é feita por um administrador', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(admMock.RESPONSE_NOT_ADM);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna um erro de unauthorized', async () => {
        const response = await chai
          .request(app)
          .get('/adm')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal(admMock.UNAUTHORIZED_ERROR);
      });
    });

    describe('quando a pessoa que fez a requisição não existe no db', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna um erro de NotFound', async () => {
        const response = await chai
          .request(app)
          .get('/adm')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.deep.equal(admMock.NOT_FOUND_ERROR_USER);
      });
    });
  });

  describe('/ DELETE', () => {
    describe('exclui a pessoa usuária com sucesso', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(admMock.RESPONSE_ADM);
        sinon.stub(User, 'destroy').resolves();
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        User.destroy.restore();
        jwt.validateAccessToken.restore();
      });

      it('se exclui o usuário', async () => {
        const response = await chai
          .request(app)
          .delete('/adm/8')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

          expect(response.status).to.be.equal(200);
      });
    });

    describe('quando a requisição não é feita por um administrador', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(admMock.RESPONSE_NOT_ADM);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna um erro de unauthorized', async () => {
        const response = await chai
          .request(app)
          .delete('/adm/8')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal(admMock.UNAUTHORIZED_ERROR);
      });
    });

    describe('quando a pessoa que fez a requisição não existe no db', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna um erro de NotFound', async () => {
        const response = await chai
          .request(app)
          .delete('/adm/8')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.deep.equal(admMock.NOT_FOUND_ERROR_USER);
      });
    });

    describe('quando a pessoa que será excluída não existe no db', () => {
      before(() => {
        sinon.stub(User, 'findOne')
        .onCall(0).resolves(admMock.RESPONSE_ADM)
			  .onCall(1).resolves(null);
        sinon.stub(jwt, 'validateAccessToken').returns(admMock.JWT_VALIDATE_USER);
      });

      after(() => {
        User.findOne.restore();
        jwt.validateAccessToken.restore();
      });

      it('retorna um erro de NotFound', async () => {
        const response = await chai
          .request(app)
          .delete('/adm/8')
          .set({ Authorization: admMock.VALID_TOKEN})
          .send(admMock.VALID_PAYLOAD);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.deep.equal(admMock.NOT_FOUND_ERROR_USER);
      });
    });
  });
});