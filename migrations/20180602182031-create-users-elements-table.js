module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('userElements', {
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
      elementId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'elements',
          key: 'id'
        },
      },
      count: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    }),

  down: queryInterface => queryInterface.dropTable('userElements')
};
