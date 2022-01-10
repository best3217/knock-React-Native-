'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('contact', {
          id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT,
          },
          frn_from_userid: {
            type: Sequelize.BIGINT,
          },
          frn_to_userid: {
            type: Sequelize.BIGINT,
          },
          is_read_from: {
            type: Sequelize.BOOLEAN
          },
          is_read_to: {
            type: Sequelize.BOOLEAN
          },
          status: {
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
        await queryInterface.dropTable('contact');
    }
};
