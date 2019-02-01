'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
  	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    gameId: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    Game.hasMany(models.Players, {foreignKey: 'gameId'})
    Game.hasOne(models.Decks, {foreignKey: 'gameId'})
    Game.hasMany(models.Hands, {foreignKey: 'gameId'})

    Game.belongsTo(models.Players, {as:'leader', foreignKey: 'leaderId'})
    Game.belongsTo(models.Players, {as:'currentTurn', foreignKey: 'currentTurnId'})
  };
  return Game;
};