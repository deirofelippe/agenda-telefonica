"use strict";

require("dotenv").config();
const { faker } = require("@faker-js/faker");
const uuid = require("uuid");

faker.locale = 'pt_BR'

module.exports = {
   up: async (queryInterface) => {
      const amount = 50;

      const contacts = [];
      let contact = {};

      for (let index = 1; index <= amount; index++) {
         contact = {
            id: uuid.v4(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber('#####-####'),
            image: faker.image.imageUrl(),
         };

         contacts.push(contact);
      }
      console.log(JSON.stringify(contacts));

      await queryInterface.bulkInsert("Contacts", contacts, {});
   },

   down: async (queryInterface) => {
      await queryInterface.bulkDelete("Contacts", null, {});
   },
};
