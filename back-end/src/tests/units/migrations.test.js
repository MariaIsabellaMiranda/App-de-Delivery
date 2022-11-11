const sinon = require('sinon');
const chai = require('chai');
const usersMigration = require('../../database/migrations/20221027214027-users');
const salesMigration = require('../../database/migrations/20221027214503-sales');
const productsMigration = require('../../database/migrations/20221027222412-products');
const salesProductsMigration = require('../../database/migrations/20221027222509-salesProducts');
const { expect } = chai;

describe('migrations', () => {
  const queryInterface = {
    createTable: sinon.stub().resolves(),
    dropTable: sinon.stub().resolves(),
  };

  const Sequelize = {
    INTEGER: 'INTEGER',
    STRING: 'STRING',
    DATE: 'DATE',
  };

  it('testando migrations', () => {
    const migrations = [
      salesMigration, productsMigration, usersMigration, salesProductsMigration
    ];
    migrations.forEach(async (migration) => {
      await migration.down(queryInterface, Sequelize);
      await migration.up(queryInterface, Sequelize);
      expect(queryInterface.dropTable).to.have.been.call();
      expect(queryInterface.createTable).to.have.been.call();
    });
  });
});
