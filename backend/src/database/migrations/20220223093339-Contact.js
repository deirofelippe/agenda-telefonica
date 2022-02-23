'use strict';

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Contacts', {
         id: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
         },
         name: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
         },
         phone: {
            type: Sequelize.DataTypes.STRING(10),
            allowNull: false,
            unique: true,
         },
         email: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
         },
         image: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
         },
         createdAt: Sequelize.DataTypes.DATE,
         updatedAt: Sequelize.DataTypes.DATE,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Contacts');
   }
};
