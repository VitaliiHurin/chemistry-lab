module.exports = (sequelize, DataTypes) => {
  const userCompounds = sequelize.define(
    'userCompounds',
    {
      userId: DataTypes.BIGINT,
      compoundId: DataTypes.BIGINT,
    },
    {
      timestamps: false
    }
  );


  return userCompounds;
};
