import { dao } from "../../dao/contact.dao.js";
import deleteObject from "../../s3/delete-object.js";
import "../../types/index.js";

/** @param {string} id */
async function removeContact(id) {
  /** @type {ServiceReturn} */
  const result = {
    errors: [],
    data: {},
  };

  const contact = await dao.findById(id);

  if (!contact) {
    result.errors.push({ message: "Contact not found" });
    return result;
  }

  await dao.remove(contact.id);

  const imageName = contact.image;
  if (imageName === "") {
    return result;
  }

  await deleteObject(imageName);

  return result;
}

export default removeContact;
