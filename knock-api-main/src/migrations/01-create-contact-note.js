'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('contract_note', {
           id: {
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
            },
            frn_contactid: {
              type: Sequelize.BIGINT
            },
            frn_contact_note_typeid:{
              type: Sequelize.BIGINT
            },
            frn_objectid: {
              type: Sequelize.BIGINT
            },
            note: {
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
        await queryInterface.dropTable('contract_note');
    }
};
