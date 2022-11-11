const sinon = require('sinon');
const chai = require('chai');
const productsSeeders = require('../../database/seeders/20221027220953-products');
const usersSeeders = require('../../database/seeders/20221027220230-users');
const { expect } = chai;

describe('seeders', () => {
  const queryInterface = {
    bulkInsert: sinon.stub().resolves(),
    bulkDelete: sinon.stub().resolves(),
  };

  it('testando seeders', () => {
    const seeders = [productsSeeders, usersSeeders];
    seeders.forEach(async (seed) => {
      await seed.down(queryInterface);
      await seed.up(queryInterface);
      expect(queryInterface.bulkInsert).to.have.been.call();
      expect(queryInterface.bulkDelete).to.have.been.call();
    });
  });
});
