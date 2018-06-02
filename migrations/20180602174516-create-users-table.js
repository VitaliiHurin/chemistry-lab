module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      port: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      experience: {
        allowNull: false,
        type: Sequelize.BIGINT
      }
    }),

  down: queryInterface => queryInterface.dropTable('users')
};
