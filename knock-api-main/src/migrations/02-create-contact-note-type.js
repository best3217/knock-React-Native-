'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('contact_note_type', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            label: {
                type: Sequelize.STRING,
            },
            note: {
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
        await queryInterface.dropTable('contact_note_type');
    }
};
