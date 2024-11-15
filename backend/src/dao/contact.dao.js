import model from "../models/contact.js";
import "../types/index.js";

/** @returns {Promise<Contact[]>} */
const cleanOutput = (list) => list.map((item) => item?.dataValues);

/**
 * @returns {Promise<Contact[]>}
 * */
async function findAll() {
  try {
    const result = await model.findAll({
      order: [["name", "ASC"]],
    });

    const cleanResult = cleanOutput(result);

    return cleanResult;
  } catch (error) {
    console.error("[BD ERROR] " + error);
    console.error(error);
    throw "error";
  }
}

/**
 * @param {Contact} contact
 * @returns {Promise<Contact>}
 * */
async function create(contact) {
  try {
    const result = await model.create(contact);

    return result.dataValues;
  } catch (error) {
    console.error("[BD ERROR] " + error);
    console.error(error);
    throw "error";
  }
}

/**
 * @param {string} id
 * @returns {Promise<Contact>}
 * */
async function findById(id) {
  try {
    const result = await model.findOne({ where: { id } });

    return result?.dataValues;
  } catch (error) {
    console.error("[BD ERROR] " + error);
    console.error(error);
    throw "error";
  }
}

/**
 * @param {Contact} contact
 * @returns {Promise<void>}
 * */
async function update(newContact) {
  try {
    const { id } = newContact;
    await model.update(newContact, { where: { id } });
  } catch (error) {
    console.error("[BD ERROR] " + error);
    console.error(error);
    throw "error";
  }
}

/**
 * @param {string} id
 * @returns {Promise<void>}
 * */
async function remove(id) {
  try {
    await model.destroy({ where: { id } });
  } catch (error) {
    console.error("[BD ERROR] " + error);
    console.error(error);
    throw "error";
  }
}

export { remove, update, findById, findAll, create };
