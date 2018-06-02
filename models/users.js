module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      port: DataTypes.INTEGER,
      experience: DataTypes.DATE
    },
    {
      timestamps: false
    }
  );

  users.associate = function (models) {
    users.belongsToMany(models.users, { through: 'userElements', as: 'element' });
    users.belongsToMany(models.users, { through: 'userCompounds', as: 'compound' });
  };

  return users;
};
