'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('post_card', {
          id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT
          },
          card_name: {
            type: Sequelize.STRING
          },
          frn_userid: {
            type: Sequelize.BIGINT
          },
          attachment_url: {
            type: Sequelize.STRING
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
        await queryInterface.dropTable('post_card');
    }
};
