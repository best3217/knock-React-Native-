'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user_role', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
              },
              description: {
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
