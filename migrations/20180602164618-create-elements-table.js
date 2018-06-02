module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('elements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      symbol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      atomicMass: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
    }),

  down: queryInterface => queryInterface.dropTable('elements')
};
