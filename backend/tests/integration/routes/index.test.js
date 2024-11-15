import { describe, test, expect, jest } from "@jest/globals";
import app from "../../../src/app.js";
import { dao } from "../../../src/dao/contact.dao.js";
import request from "supertest";
import contactFactory from "../../contactFactory.js";

describe("Requests", () => {
  afterEach(async () => {
    jest.restoreAllMocks();
  });

  test("GET /contacts", async () => {
    const contacts = contactFactory(5);

    jest.spyOn(dao, dao.findAll.name).mockResolvedValue(contacts);

    const res = await request(app).get("/contacts");

    expect(dao.findAll).toBeCalledTimes(1);
    expect(res.body.contacts).toHaveLength(5);
    expect(res.status).toEqual(200);
  });

  test("POST /contacts", async () => {
    const { id, ...contact } = contactFactory()[0];

    const mockCreateDao = jest.spyOn(dao, dao.create.name).mockResolvedValue();

    const res = await request(app).post("/contacts").send(contact);

    const finalContact = mockCreateDao.mock.calls[0][0];

    expect(finalContact.id).toHaveLength(36);
    expect(finalContact.image).toMatch(/.png$/);
    expect(finalContact.name).toEqual(contact.name);
    expect(finalContact.phone).toEqual(contact.phone);
    expect(finalContact.email).toEqual(contact.email);

    expect(dao.create).toBeCalledTimes(1);
    expect(res.status).toEqual(201);
  });

  test("GET /contacts/:id", async () => {
    const contact = contactFactory()[0];
    const { id } = contact;

    jest.spyOn(dao, dao.findById.name).mockResolvedValue(contact);

    const res = await request(app).get(`/contacts/${id}`);

    expect(dao.findById).toBeCalledWith(id);
    expect(res.body.contact).toEqual(contact);
    expect(res.status).toEqual(200);
  });

  test("DELETE /contacts/:id", async () => {
    const contact = contactFactory()[0];

    contact.image = "";

    jest.spyOn(dao, dao.remove.name).mockImplementation();
    jest.spyOn(dao, dao.findById.name).mockResolvedValue(contact);

    const res = await request(app).delete(`/contacts/${contact.id}`);

    expect(dao.remove).toBeCalledWith(contact.id);
    expect(res.status).toEqual(204);
  });

  test("PUT /contacts/:id", async () => {
    const contact = contactFactory()[0];

    contact.image = "";

    const newContact = {
      ...contact,
      name: "teste",
    };

    jest.spyOn(dao, dao.findById.name).mockResolvedValue(contact);
    const mockUpdateDao = jest.spyOn(dao, dao.update.name).mockImplementation();

    const res = await request(app)
      .put(`/contacts/${contact.id}`)
      .send(newContact);

    const finalContact = mockUpdateDao.mock.calls[0][0];

    expect(finalContact.id).toEqual(newContact.id);
    expect(finalContact.name).toEqual("teste");
    expect(finalContact.image).toEqual(newContact.image);

    expect(res.status).toEqual(200);
  });
});
