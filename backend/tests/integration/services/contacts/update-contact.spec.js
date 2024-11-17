import { describe, test, jest, afterEach, expect } from "@jest/globals";
import "../../../../src/types/index.js";
import { dao } from "../../../../src/dao/contact.dao.js";
import updateContact from "../../../../src/services/contacts/update-contact.js";

describe("Requests", () => {
  afterEach(async () => {
    jest.restoreAllMocks();
  });

  test("Não deve encontrar contato", async () => {
    /** @type {Contact} */
    const contact = {
      id: "111",
      name: "Teste",
      image: "111.png",
      email: "teste@gmail.com",
      phone: "1234567890",
      createdAt: "12",
      updatedAt: "34",
    };

    jest.spyOn(dao, dao.findById.name).mockResolvedValue(undefined);

    const result = await updateContact(contact);

    const errors = result.errors;

    expect(errors).toHaveLength(1);
    expect(Object.keys(result.data)).toHaveLength(0);
  });

  test("Deve atualizar o campo phone e email", async () => {
    /** @type {Contact} */
    const contact = {
      id: "111",
      name: "Teste",
      image: "111.png",
      email: "teste@gmail.com",
      phone: "1234567890",
      createdAt: "12",
      updatedAt: "34",
    };

    /** @type {Contact} */
    const newContact = {
      id: contact.id,
      name: contact.name,
      image: contact.image,
      email: "Teste Atualizado",
      phone: "1134567899",
    };

    jest.spyOn(dao, dao.findById.name).mockResolvedValue(contact);
    jest.spyOn(dao, dao.update.name).mockResolvedValue();

    const result = await updateContact(newContact);

    const updatedContact = result.data.updatedContact;

    expect({
      email: contact.email,
      phone: contact.phone,
    }).not.toMatchObject({
      email: updatedContact.email,
      phone: updatedContact.phone,
    });

    expect(newContact).toEqual(
      expect.objectContaining({
        email: updatedContact.email,
        phone: updatedContact.phone,
      })
    );
  });

  test("Não deve deletar imagem, imagens iguais e existentes", async () => {
    /** @type {Contact} */
    const contact = {
      id: "111",
      name: "Teste",
      image: "111.png",
      email: "teste@gmail.com",
      phone: "1234567890",
      createdAt: "12",
      updatedAt: "34",
    };

    /** @type {Contact} */
    const newContact = {
      id: contact.id,
      name: contact.name,
      image: contact.image,
      email: "Teste Atualizado",
      phone: contact.phone,
    };

    jest.spyOn(dao, dao.findById.name).mockResolvedValue(contact);
    jest.spyOn(dao, dao.update.name).mockResolvedValue();

    const result = await updateContact(newContact);

    const updatedContact = result.data.updatedContact;

    expect(newContact.image).toEqual(updatedContact.image);
  });

  test("Não deve deletar imagem, imagens iguais e inexistentes", async () => {
    /** @type {Contact} */
    const contact = {
      id: "111",
      name: "Teste",
      image: "",
      email: "teste@gmail.com",
      phone: "1234567890",
      createdAt: "12",
      updatedAt: "34",
    };

    /** @type {Contact} */
    const newContact = {
      id: contact.id,
      name: contact.name,
      image: contact.image,
      email: "Teste Atualizado",
      phone: contact.phone,
    };

    jest.spyOn(dao, dao.findById.name).mockResolvedValue(contact);
    jest.spyOn(dao, dao.update.name).mockResolvedValue();

    const result = await updateContact(newContact);

    const updatedContact = result.data.updatedContact;

    expect(newContact.image).toEqual(updatedContact.image);
    expect(updatedContact.image).toEqual("");
  });

  test("Não deve deletar imagem, estado de contato sem imagem para com imagem", async () => {
    /** @type {Contact} */
    const contact = {
      id: "111",
      name: "Teste",
      image: "",
      email: "teste@gmail.com",
      phone: "1234567890",
      createdAt: "12",
      updatedAt: "34",
    };

    /** @type {Contact} */
    const newContact = {
      id: contact.id,
      name: contact.image,
      image: "teste.png",
      email: "Teste Atualizado",
      phone: contact.phone,
    };

    jest.spyOn(dao, dao.findById.name).mockResolvedValue(contact);
    jest.spyOn(dao, dao.update.name).mockResolvedValue();

    const result = await updateContact(newContact);

    const updatedContact = result.data.updatedContact;

    expect(updatedContact.image).toContain(updatedContact.id);
  });
});
