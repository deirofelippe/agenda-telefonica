import { dao } from "../dao/contact.dao.js";
import "../types/index.js";
import removeContact from "../services/contacts/remove-contact.js";
import updateContact from "../services/contacts/update-contact.js";
import createContact from "../services/contacts/create-contact.js";

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function findAll(req, res) {
  const contacts = await dao.findAll();

  return res.status(200).json({ contacts });
}

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function findById(req, res) {
  const contact = await dao.findById(req.params.id);

  if (!contact) {
    return res.status(422).json({ message: "Contact not found" });
  }

  return res.status(200).json({ contact });
}

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function create(req, res) {
  /** @type {Contact} */
  const contact = {
    ...req.body,
  };

  const { data, errors } = await createContact(contact);

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  return res.status(201).json({ createdContact: data.createdContact });
}

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function update(req, res) {
  /** @type {Contact} */
  const contact = req.body;

  const { data, errors } = await updateContact(contact);

  if (errors.length > 0) {
    return res.status(422).json(errors);
  }

  return res.status(200).json({ updatedContact: data.updatedContact });
}

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function remove(req, res) {
  /** @type {string} */
  const contactId = req.params.id;

  const { errors } = await removeContact(contactId);

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  return res.status(204).json({});
}

export { findAll, create, update, remove, findById };
