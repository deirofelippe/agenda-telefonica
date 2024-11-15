import model from "../models/contact.js";

const cleanOutput = (list) => list.map((item) => item?.dataValues);

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
