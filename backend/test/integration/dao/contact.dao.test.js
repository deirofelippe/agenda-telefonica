const {
   describe,
   test,
   expect,
   afterAll,
   beforeAll,
   afterEach,
} = require("@jest/globals");
const connection = require("../../../src/database");
const dao = require("../../../src/dao/contact.dao.js");
const contactFactory = require("../../contactFactory.js");
const model = require("../../../src/models/contact.js");
const truncate = require("../../truncate.js");

describe("contacts.dao", () => {
   afterEach(async () => {
      jest.restoreAllMocks();
      await truncate(connection.models);
   });

   beforeAll(async () => await connection.sync());
   afterAll(async () => await connection.close());

   describe("#create", () => {
      test("Deve criar o contato e retornar", async () => {
         const contact = contactFactory()[0];

         await dao.create(contact);

         const { dataValues } = await model.findOne({ where: { id: contact.id } })
         const { createdAt, updatedAt, ...createdContact } = dataValues

         expect(createdContact).toEqual(contact);
         expect(createdAt).toBeDefined();
         expect(updatedAt).toBeDefined();
      });
   });

   describe("#findAll", () => {
      test("Deve retornar contatos", async () => {
         const contacts = contactFactory(3);

         const emptyResult = await dao.findAll();

         expect(emptyResult).toHaveLength(0);

         await model.bulkCreate(contacts)

         const notEmptyResult = await dao.findAll();
         console.log(notEmptyResult);

         expect(notEmptyResult).toHaveLength(3);
      });

      test("Não deve retornar contatos", async () => {
         const result = await dao.findAll();
         expect(result).toHaveLength(0);
      });
   });

   describe("#findById", () => {
      test("Deve encontrar o contato com o id procurado", async () => {
         const contact = contactFactory()[0];
         await model.create(contact);

         const { createdAt, updatedAt, ...contactFound } = await dao.findById(
            contact.id
         );

         expect(contactFound).toEqual(contact);
      });

      test("Não deve encontrar o contato com o id procurado", async () => {
         const contact = contactFactory()[0];
         const contactFound = await dao.findById(contact.id);
         expect(contactFound).toBeUndefined();
      });
   });

   describe("#update", () => {
      test("Deve atualizar o contato", async () => {
         const contact = contactFactory()[0];

         await model.create(contact);

         const contactToUpdate = { ...contact };

         const { faker } = require("@faker-js/faker");
         const newName = faker.name.findName();
         const newEmail = faker.internet.email();
         contactToUpdate.name = newName;
         contactToUpdate.email = newEmail;

         await dao.update(contactToUpdate);

         const { dataValues: updatedContact } = await model.findOne({ where: { id: contact.id } });

         delete updatedContact.createdAt;
         delete updatedContact.updatedAt;

         expect(updatedContact).toEqual(contactToUpdate);
         expect(updatedContact).not.toEqual(contact);
      });
   });

   describe("#remove", () => {
      test("Deve remover o contato", async () => {
         const contacts = contactFactory(2);
         await model.bulkCreate(contacts);

         const contactsBeforeRemove = await model.findAll()
         expect(contactsBeforeRemove).toHaveLength(2);

         await dao.remove(contacts[0].id);

         const contactsAfterRemove = await model.findAll()
         expect(contactsAfterRemove).toHaveLength(1);
      });
   });
});
