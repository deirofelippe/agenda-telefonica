import { Faker, pt_BR } from "@faker-js/faker";
import * as uuid from "uuid";
import "../src/types";

const faker = new Faker({
  locale: [pt_BR],
});

/**
 * @param {number} amount por padrão o valor é 1
 * @returns {Contact[]}
 */
function contactFactory(amount = 1) {
  const contacts = [];
  for (let index = 1; index <= amount; index++) {
    contacts.push({
      id: uuid.v4(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.number.int({ min: 1000000000, max: 9999999999 }) + "",
      image: faker.string.alpha(10) + ".png",
    });
  }

  return contacts;
}

export default contactFactory;
