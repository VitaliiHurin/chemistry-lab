module.exports = (sequelize, DataTypes) => {
  const userElements = sequelize.define(
    'userElements',
    {
      userId: DataTypes.BIGINT,
      elementId: DataTypes.BIGINT,
      count: DataTypes.INTEGER,
    },
    {
      timestamps: false
    }
  );

  return userElements;
};
