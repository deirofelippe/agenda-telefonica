const { faker } = require("@faker-js/faker");
const uuid = require("uuid");
faker.locale = "pt_BR";

/**
 *
 * @param {*} amount por padrão o valor é 1
 * @returns
 */
function contactFactory(amount = 1) {
   const contacts = [];
   for (let index = 1; index <= amount; index++) {
      contacts.push({
         id: uuid.v4(),
         name: faker.name.findName(),
         email: faker.internet.email(),
         phone: faker.phone.phoneNumber('#####-####'),
         image: faker.image.imageUrl(),
      });
   }

   return contacts;
}

module.exports = contactFactory;
