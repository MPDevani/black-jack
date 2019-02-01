'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  let promises = [  
    queryInterface.addColumn(
      'Games',
      'leaderId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id'
        }
      }
    ),
    queryInterface.addColumn(
      'Games',
      'currentTurnId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id'
        }
      }
    )
   ]   

    return Promise.all(promises)
  },

  down: (queryInterface, Sequelize) => {
   return Promise.all([
    queryInterface.removeColumn('Games', 'leaderId'),
    queryInterface.removeColumn('Games', 'currentTurnId')
    ])
  }
};
