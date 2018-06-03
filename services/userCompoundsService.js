const sequelize = require('sequelize');
const { userElements, elements } = require('../models');

async function addCompound(userId, addCompound) {
  for (const element of addElements) {
    const getElement = await elements.findOne({ where: { symbol: element } }, { type: sequelize.QueryTypes.SELECT });
    const elementId = getElement.dataValues.id;

    const getUserElement = await userElements.findOne({ where: { userId, elementId } }, { type: sequelize.QueryTypes.SELECT });

    if (!getUserElement) {
      await userElements.create({ userId, elementId, count: 1 });
    } else {
      await getUserElement.update({ count: getUserElement.dataValues.count + 1 });
    }
  }
}

module.exports = {
  addElements
}

