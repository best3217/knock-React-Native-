"use strict";

module.exports = {
    up: async(queryInterface) => {
        await queryInterface.bulkInsert(
            "user_role", [
                { description: 'Admin' },
                { description: 'User' },                
            ], {}
        );
    },
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete("user_role", null, {})
};