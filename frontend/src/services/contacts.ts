import { env } from "~src/env"
import { ContactApi, ContactProps } from "~src/types"

async function findAllContactsRequest(): Promise<{
   responseIsOk: boolean
   contacts: ContactApi[]
}> {
   const response = await fetch(`${env.backendUrl}/contacts`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })

   const body = await response.json()

   return {
      contacts: body.contacts ?? [],
      responseIsOk: response.ok,
   }
}

async function deleteContactRequest(id: string): Promise<{
   responseIsOk: boolean
}> {
   const url = `${env.backendUrl}/contacts/${id}`
   const response = await fetch(url, { method: "DELETE" })

   return {
      responseIsOk: response.ok,
   }
}

async function createContactsRequest(newContact: ContactProps): Promise<{
   responseIsOk: boolean
   createdContact: ContactApi
}> {
   const url = `${env.backendUrl}/contacts`

   const body: ContactApi = {
      ...newContact,
      image: newContact?.imageName ?? "",
   }

   const response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
   })

   const { createdContact } = await response.json()

   createdContact.imageName = createdContact.image

   return {
      createdContact,
      responseIsOk: response.ok,
   }
}

async function updateContactRequest(contactToUpdate: ContactProps): Promise<{
   responseIsOk: boolean
   updatedContact: ContactApi
}> {
   const body: ContactApi = {
      ...contactToUpdate,
      image: contactToUpdate.imageName ?? "",
   }

   const url = env.backendUrl

   const response = await fetch(`${url}/contacts/${contactToUpdate.id}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
   })

   const { updatedContact } = await response.json()

   updatedContact.imageName = updatedContact?.image ?? ""

   return {
      updatedContact,
      responseIsOk: response.ok,
   }
}

export {
   createContactsRequest,
   deleteContactRequest,
   findAllContactsRequest,
   updateContactRequest,
}
