"use strict";

import { faker } from "@faker-js/faker";
import uuid from "uuid";

faker.locale = "pt_BR";

async function up(queryInterface) {
  const amount = 30;

  const contacts = [];
  let contact = {};

  for (let index = 1; index <= amount; index++) {
    contact = {
      id: uuid.v4(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber("#####-####"),
      image: faker.image.imageUrl(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    contacts.push(contact);
  }
  console.log(JSON.stringify(contacts));

  await queryInterface.bulkInsert("Contacts", contacts, {});
}

async function down(queryInterface) {
  await queryInterface.bulkDelete("Contacts", null, {});
}

export { up, down };
