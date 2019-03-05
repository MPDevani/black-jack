'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
      'Hands',
      'cardType',
      {
        type: Sequelize.INTEGER
      }
    )
   },  

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Hands','cardType');
  }
};
