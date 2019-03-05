'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    let createCardsTable = queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      cardType: {
        type: Sequelize.INTEGER
      },
      handId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Hands',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    let removeCardTypeFromHand = queryInterface.removeColumn('Hands', 'cardType');

    return Promise.all([createCardsTable, removeCardTypeFromHand]);
  },

  down: (queryInterface, Sequelize) => {
    let removeCardsTable = queryInterface.dropTable('Cards');
    let addCardTypeToHand = queryInterface.addColumn(
      'Hands',
      'cardType',
      {
        type: Sequelize.INTEGER
      }
    );

    return Promise.all([removeCardsTable, addCardTypeToHand]);
  }
};