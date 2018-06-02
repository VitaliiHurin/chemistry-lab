module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('compounds', {
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
      elementsObject: {
        allowNull: false,
        type: Sequelize.JSONB
      },
      description: {
        type: Sequelize.TEXT
      },
    }),

  down: queryInterface => queryInterface.dropTable('compounds')
};
