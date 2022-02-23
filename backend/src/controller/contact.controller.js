const dao = require("../dao/contact.dao.js");
const uuid = require("uuid");

async function findAll(req, res) {
   try {
      const contacts = await dao.findAll();

      res.status(200).json({ contacts });
   } catch (error) {
      res.json({ error });
   }
}

async function create(req, res) {
   const contact = {
      ...req.body
   }

   try {
      contact.id = uuid.v4();
      const createdContact = await dao.create(contact);

      res.status(201).json({ contact: createdContact });
   } catch (error) {
      res.json({ error });
   }
}

async function update(req, res) {
   const newContact = {
      id: req.params.id,
      ...req.body,
   };

   try {
      await dao.update(newContact);

      res.status(204).end();
   } catch (error) {
      res.json({ error });
   }
}

async function remove(req, res) {
   try {
      await dao.remove(req.params.id);

      res.status(204).end();
   } catch (error) {
      res.json({ error });
   }
}

async function findById(req, res) {
   try {
      const contact = await dao.findById(req.params.id);

      res.status(200).json({ contact });
   } catch (error) {
      res.json({ error });
   }
}

module.exports = {
   findAll,
   create,
   update,
   remove,
   findById,
};
