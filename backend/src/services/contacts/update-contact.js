import { dao } from "../../dao/contact.dao.js";
import deleteObject from "../../s3/delete-object.js";
import "../../types/index.js";

/** @param {Contact} newContact */
async function updateContact(newContact) {
  /** @type {ServiceReturn} */
  const result = {
    errors: [],
    data: {},
  };

  const contactFound = await dao.findById(newContact.id);

  if (!contactFound) {
    result.errors.push({ message: "Contact not found" });
    return result;
  }

  let imageName = "";
  if (newContact.image) {
    const ext = newContact.image.split(".").pop();
    imageName = `${contactFound.id}.${ext}`;
  }

  const updatedContact = buildUpdatedContact(contactFound, newContact);
  updatedContact.image = imageName;

  await dao.update(updatedContact);

  const canDeleteImage = imagesAreDifferentToDelete(contactFound, newContact);
  if (canDeleteImage) {
    await deleteObject(contactFound.image);
  }

  result.data["updatedContact"] = updatedContact;

  return result;
}

/**
 * @param {Contact} oldContact
 * @param {Contact} newContact
 */
function imagesAreDifferentToDelete(oldContact, newContact) {
  const imagesIsEqual = newContact.image === oldContact.image;
  if (imagesIsEqual) {
    return false;
  }

  const oldContactHasNoImage = oldContact.image === "";
  const newContactHaveImage = newContact.image !== "";
  const contactWillHaveImage = oldContactHasNoImage && newContactHaveImage;
  if (contactWillHaveImage) {
    return false;
  }

  return true;
}

/**
 * @param {Contact} oldContact
 * @param {Contact} newContact
 * @returns {Contact}
 */
function buildUpdatedContact(oldContact, newContact) {
  const updatedContact = {
    id: oldContact.id,
  };

  if (oldContact.email !== newContact.email) {
    updatedContact.email = newContact.email;
  }

  if (oldContact.name !== newContact.name) {
    updatedContact.name = newContact.name;
  }

  if (oldContact.phone !== newContact.phone) {
    updatedContact.phone = newContact.phone;
  }

  return updatedContact;
}

export default updateContact;
