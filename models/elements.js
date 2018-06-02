module.exports = (sequelize, DataTypes) => {
  const elements = sequelize.define(
    'elements',
    {
      name: DataTypes.STRING,
      symbol: DataTypes.STRING,
      atomicMass: DataTypes.INTEGER,
      description: DataTypes.TEXT
    },
    {
      timestamps: false
    }
  );

  elements.associate = function (models) {
    elements.belongsToMany(models.users, { through: 'userElements', as: 'user' });
  };

  return elements;
};
