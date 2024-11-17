import { dao } from "../../dao/contact.dao.js";
import "../../types/index.js";
import * as uuid from "uuid";

/** @param {Contact} contact */
async function createContact(contact) {
  /** @type {ServiceReturn} */
  const result = {
    errors: [],
    data: {},
  };

  const contactFound = await dao.findByPhone(contact.phone);

  if (contactFound) {
    result.errors.push({ message: "Contact already exist" });
    return result;
  }

  /** @type {Contact} */
  const newContact = {
    id: uuid.v4(),
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    image: "",
  };

  const image = contact.image;
  if (image) {
    const ext = image.split(".").pop();
    newContact.image = `${newContact.id}.${ext}`;
  }

  const createdContact = await dao.create(newContact);

  result.data["createdContact"] = createdContact;

  return result;
}

export default createContact;
