import { useContext } from "react"
import ContactContext, { ContactContextType } from "../context/ContactContext"

export function useContacts(): Required<ContactContextType> {
   const { contacts, createContact, editContact, removeContact, findContact } =
      useContext(ContactContext)

   return {
      contacts: contacts!,
      createContact: createContact!,
      editContact: editContact!,
      removeContact: removeContact!,
      findContact: findContact!,
   }
}
