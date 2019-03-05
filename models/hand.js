'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hands = sequelize.define('Hands', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    gameId: DataTypes.INTEGER,
    cardCount: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER
  }, {});
  Hands.associate = function(models) {
   Hands.hasMany(models.Cards, {foreignKey: 'handId'}) 
   Hands.belongsTo(models.Game, {foreignKey: 'gameId'})
   Hands.belongsTo(models.Players, {foreignKey: 'playerId'})
  };
  return Hands;
};