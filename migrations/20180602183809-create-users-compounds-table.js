module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('userCompounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      userId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      compoundId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'compounds',
          key: 'id'
        },
      }
    }),

  down: queryInterface => queryInterface.dropTable('userCompounds')
};
