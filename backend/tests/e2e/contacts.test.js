import {
  describe,
  test,
  expect,
  jest,
  afterEach,
  afterAll,
  beforeAll,
} from "@jest/globals";
import app from "../../src/app.js";
import request from "supertest";
import contactFactory from "../contactFactory.js";
import db from "../../src/database/index.js";
import "../../src/types/index.js";
import nock from "nock";
import { dao } from "../../src/dao/contact.dao.js";

describe("Requests", () => {
  beforeAll(async () => {
    await db.sync();
  });

  afterEach(async () => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });
  afterEach(async () => {
    await db.drop();
    await db.sync();
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await db.close();
  });

  test("GET /contacts", async () => {
    await dao.create({
      id: "111",
      name: "Teste 1",
      email: "teste1@email.com",
      phone: "1111111111",
      image: "teste1.png",
    });
    await dao.create({
      id: "222",
      name: "Teste 2",
      email: "teste2@email.com",
      phone: "2222222222",
      image: "teste2.png",
    });

    const res = await request(app).get("/contacts");

    const contactsFound = res.body.contacts;

    expect(contactsFound).toHaveLength(2);
    expect(res.status).toEqual(200);
  });

  test("GET /contacts/:id", async () => {
    const contact = {
      id: "111",
      name: "Teste 1",
      email: "teste1@email.com",
      phone: "1111111111",
      image: "teste1.png",
    };

    await dao.create(contact);

    const res = await request(app).get(`/contacts/${contact.id}`);

    const contactFound = res.body.contact;

    expect(contactFound).toEqual(expect.objectContaining(contact));
    expect(res.status).toEqual(200);
  });

  test("POST /contacts", async () => {
    const { id, ...contact } = contactFactory()[0];

    const res = await request(app).post("/contacts").send(contact);

    /** @type {Contact} */
    const createdContact = res.body.createdContact;

    expect(createdContact.id).toHaveLength(36);
    expect(createdContact.image).toMatch(/.png$/);
    expect(createdContact.name).toEqual(contact.name);
    expect(createdContact.phone).toEqual(contact.phone);
    expect(createdContact.email).toEqual(contact.email);

    expect(res.status).toEqual(201);
  });

  test("DELETE /contacts/:id", async () => {
    const scope = nock("http://localstack:4566")
      .delete((uri) => uri.includes("/agenda-images"))
      .reply(200, {});

    const contact = contactFactory()[0];

    await dao.create(contact);
    const contactsFoundBeforeDelete = await dao.findAll();

    const res = await request(app).delete(`/contacts/${contact.id}`);

    const contactsFoundAfterDelete = await dao.findAll();

    expect(res.status).toEqual(204);
    expect(contactsFoundBeforeDelete).toHaveLength(1);
    expect(contactsFoundAfterDelete).toHaveLength(0);
  });

  test("PUT /contacts/:id", async () => {
    const scope = nock("http://localstack:4566")
      .delete((uri) => uri.includes("/agenda-images"))
      .reply(200, {});

    const contact = contactFactory()[0];

    /** @type {Contact} */
    const newContact = {
      ...contact,
      image: "teste.jpg",
      name: "Teste",
    };

    await dao.create(contact);

    const res = await request(app)
      .put(`/contacts/${newContact.id}`)
      .send(newContact);

    const contactUpdated = await dao.findById(newContact.id);

    expect(contactUpdated.id).toEqual(newContact.id);
    expect(contactUpdated.name).toEqual(newContact.name);
    expect(contactUpdated.image).not.toEqual(newContact.image);
    expect(contactUpdated.phone).toEqual(newContact.phone);
    expect(contactUpdated.email).toEqual(newContact.email);

    expect(res.status).toEqual(200);
  });
});
