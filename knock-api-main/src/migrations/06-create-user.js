'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user', {
          id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT,
          },
          name: {
            type: Sequelize.STRING,
          },  
          email: {
            type: Sequelize.STRING,
          },
          password:{
            type: Sequelize.STRING,
          },
          phone: {
            type: Sequelize.STRING,
          },
          frn_user_roleid: {
            type: Sequelize.BIGINT,
          },
          phone_verification_code: {
            type: Sequelize.INTEGER,
          },
          is_phone_verified:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          is_email_verified:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          is_locked:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          frn_doorid: {
            type: Sequelize.BIGINT,
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
          is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          }
      });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('property');
    }
};
