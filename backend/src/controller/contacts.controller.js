import * as dao from "../dao/contact.dao.js";
import * as uuid from "uuid";
import path from "path";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

import "../types/index.js";

function getS3Client() {
  const clientParams = {
    region: "sa-east-1",
    forcePathStyle: true,
    credentials: {
      accessKeyId: "",
      secretAccessKey: "",
    },
    endpoint: "http://localstack:4566",
  };

  const client = new S3Client(clientParams);

  return client;
}

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function findAll(req, res) {
  try {
    const contacts = await dao.findAll();

    return res.status(200).json({ contacts });
  } catch (error) {
    return res.status(500).json({ error });
  }
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

  const image = contact.image;
  const id = uuid.v4();
  contact.id = id;

  if (image) {
    const ext = path.extname(image);
    const newFilename = `${id}${ext}`;
    contact.image = newFilename;
  }

  try {
    const createdContact = await dao.create(contact);

    return res.status(201).json({ contact: createdContact });
  } catch (error) {
    return res.status(500).json({ error });
  }
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

/**
 * @param {Contact} oldContact
 * @param {Contact} newContact
 */
async function removeImageFromS3(oldContact, newContact) {
  const imagesIsEqual = newContact.image === oldContact.image;
  if (imagesIsEqual) {
    return;
  }

  const oldContactHasNoImage = oldContact.image === "";
  const newContactHaveImage = newContact.image !== "";
  const contactWillHaveImage = oldContactHasNoImage && newContactHaveImage;
  if (contactWillHaveImage) {
    return;
  }

  const client = getS3Client();

  /** @type {DeleteObjectCommandInput} */
  const putObjectParams = {
    Bucket: "agenda-images",
    Key: oldContact.image,
  };

  const command = new DeleteObjectCommand(putObjectParams);

  await client.send(command);
}

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function update(req, res) {
  try {
    /** @type {Contact} */
    const contact = req.body;
    const contactId = contact.id;

    const contactFound = await dao.findById(contactId);

    if (!contactFound) {
      return res.status(422).json({ message: "Contact not found" });
    }

    let imageName = "";
    if (!!contact.image) {
      const ext = path.extname(contact.image);
      imageName = `${contactFound.id}${ext}`;
    }

    const updatedContact = buildUpdatedContact(contactFound, contact);
    updatedContact.image = imageName;

    await dao.update(updatedContact);
    await removeImageFromS3(contactFound, contact);

    return res.status(200).json({ updatedContact });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error });
  }
}

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function remove(req, res) {
  try {
    /** @type {string} */
    const contactId = req.params.id;

    const contact = await dao.findById(contactId);

    await dao.remove(contactId);

    const imageName = contact.image;
    if (imageName === "") {
      return res.status(204).json();
    }

    const client = getS3Client();

    /** @type {DeleteObjectCommandInput} */
    const deleteObjectParams = {
      Bucket: "agenda-images",
      Key: imageName,
    };

    const command = new DeleteObjectCommand(deleteObjectParams);

    await client.send(command);

    return res.status(204).json();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error });
  }
}

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function findById(req, res) {
  try {
    const contact = await dao.findById(req.params.id);

    return res.status(200).json({ contact });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export { findAll, create, update, remove, findById };
