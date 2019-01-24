'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { //talk through this, why is this needed to associations.
    return queryInterface.addColumn(
      'Players',
      'gameId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
          key: 'id'
        }
      }
    )
   },  

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Players', 'gameId')
  }
};
