'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define('Cards', {
  	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cardType: DataTypes.INTEGER
  }, {});
  Cards.associate = function(models) {
    Cards.belongsTo(models.Hands, {foreignKey: 'handId'})
  };
  return Cards;
};