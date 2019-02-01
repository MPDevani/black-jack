'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hands = sequelize.define('Hands', {
    gameId: DataTypes.INTEGER,
    cardCount: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER
  }, {});
  Hands.associate = function(models) {
   Hands.belongsTo(models.Game, {foreignKey: 'gameId'})
   Hands.belongsTo(models.Players, {foreignKey: 'playerId'})
  };
  return Hands;
};