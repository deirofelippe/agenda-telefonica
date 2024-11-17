import React, { useEffect, useReducer } from "react"
import { ContactProps } from "~types/index"
import appReduce from "./AppReduce"
import ContactContext from "./ContactContext"
import { findAllContactsRequest } from "~src/services/contacts"

const initialState: { contacts: ContactProps[] } = {
   contacts: [],
}

interface ContactProviderProps {
   children: React.ReactNode
}

const ContactProvider = ({ children }: ContactProviderProps) => {
   const [state, dispatch] = useReducer(appReduce, initialState)

   useEffect(() => {
      ;(async () => {
         const { contacts: contactsFound } = await findAllContactsRequest()

         const contacts = contactsFound.map(
            (contact): ContactProps => ({
               id: contact.id,
               email: contact.email,
               name: contact.name,
               phone: contact.phone,
               createdAt: contact.createdAt,
               updatedAt: contact.updatedAt,
               imageName: contact.image,
               imageContent: undefined,
            })
         )

         dispatch({
            type: "CREATE_ALL",
            payload: { contacts },
         })
      })()
   }, [])

   function createContact(contact: ContactProps) {
      dispatch({
         type: "CREATE",
         payload: { contact },
      })
   }

   function editContact(contact: ContactProps) {
      dispatch({
         type: "EDIT",
         payload: { contact },
      })
   }

   function removeContact(id: string) {
      dispatch({
         type: "REMOVE",
         payload: { id },
      })
   }

   function findContact(id: string) {
      return state.contacts.find((contact) => contact.id === id)
   }

   const context = {
      createContact,
      findContact,
      editContact,
      removeContact,
      contacts: state.contacts,
   }

   return (
      <ContactContext.Provider value={context}>
         {children}
      </ContactContext.Provider>
   )
}

export default ContactProvider
