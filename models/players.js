'use strict';
module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define('Players', {
  	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userName: DataTypes.STRING
  }, {});
  Players.associate = function(models) {
    Players.belongsTo(models.Game, {foreignKey:'gameId'})
    Players.hasOne(models.Hands, {foreignKey: 'playerId'})
  };
  return Players;
};