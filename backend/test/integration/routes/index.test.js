const {
   describe,
   test,
   expect,
} = require("@jest/globals");
const app = require("../../../src/app.js");
const dao = require("../../../src/dao/contact.dao.js");
const request = require("supertest");
const contactFactory = require("../../contactFactory.js");
const uuid = require('uuid');

jest.mock('uuid', () => ({
   v4: () => '001'
}))

describe("Integração desde o request, até antes da escrita no BD", () => {
   afterEach(async () => {
      jest.restoreAllMocks();
   });

   test("Rota do findAll", async () => {
      const contacts = contactFactory(5);

      jest.spyOn(dao, dao.findAll.name).mockResolvedValue(contacts)

      const res = await request(app).get("/contact");

      expect(dao.findAll).toBeCalledTimes(1);
      expect(res.body.contacts).toHaveLength(5);
      expect(res.status).toEqual(200);
   });

   test("Rota do create", async () => {
      const { id, ...contact } = contactFactory()[0];

      jest.spyOn(dao, dao.create.name).mockResolvedValue('return test')

      const res = await request(app).post("/contact").send(contact);

      contact.id = '001'

      expect(dao.create).toBeCalledWith(contact);
      expect(res.body.contact).toEqual('return test');
      expect(res.status).toEqual(201);
   });

   test("Rota do findById", async () => {
      const contact = contactFactory()[0];
      const { id } = contact;

      jest.spyOn(dao, dao.findById.name).mockResolvedValue(contact)

      const res = await request(app).get(`/contact/${id}`);

      expect(dao.findById).toBeCalledWith(id);
      expect(res.body.contact).toEqual(contact);
      expect(res.status).toEqual(200);
   });

   test("Rota do remove", async () => {
      const contact = contactFactory()[0];
      const { id } = contact;

      jest.spyOn(dao, dao.remove.name).mockImplementation()

      const res = await request(app).delete(`/contact/${id}`);

      expect(dao.remove).toBeCalledWith(id);
      expect(res.status).toEqual(204);
   });

   test("Rota do update", async () => {
      const { id, ...contact } = contactFactory()[0];

      jest.spyOn(dao, dao.update.name).mockImplementation()

      const res = await request(app).put(`/contact/${id}`).send(contact);

      contact.id = id

      expect(dao.update).toBeCalledWith(contact);
      expect(res.status).toEqual(204);
   });
});
