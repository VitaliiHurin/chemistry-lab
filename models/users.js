module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      port: DataTypes.INTEGER,
      experience: DataTypes.DATE,
      createdAt: DataTypes.DATE
    },
    {
      timestamps: false
    }
  );

  users.associate = function (models) {
    users.belongsToMany(models.elements, { through: 'userElements', as: 'element' });
    users.belongsToMany(models.compounds, { through: 'userCompounds', as: 'compound' });
  };

  return users;
};
