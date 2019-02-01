'use strict';
module.exports = (sequelize, DataTypes) => {
  const Decks = sequelize.define('Decks', {
    gameId: DataTypes.INTEGER,
    cardCount: DataTypes.INTEGER
  }, {});
  Decks.associate = function(models) {
    Decks.belongsTo(models.Game, {foreignKey: 'gameId'})
  };
  return Decks;
};