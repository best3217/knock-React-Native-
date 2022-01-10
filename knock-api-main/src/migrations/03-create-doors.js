'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doors', {
          id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT
          },
          code: {
            type: Sequelize.STRING
          },
          image: {
            type: Sequelize.STRING,
          },    
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('property');
    }
};
