module.exports = (sequelize, DataTypes) => {
  const compounds = sequelize.define(
    'compounds',
    {
      name: DataTypes.STRING,
      elementsObject: DataTypes.JSONB,
      description: DataTypes.TEXT
    },
    {
      timestamps: false
    }
  );

  compounds.associate = function (models) {
    compounds.belongsToMany(models.users, { through: 'userCompounds', as: 'user' });
  };

  return compounds;
};
