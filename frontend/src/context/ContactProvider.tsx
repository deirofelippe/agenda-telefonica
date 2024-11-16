import React, { useEffect, useReducer } from "react"
import { ContactApi, ContactProps } from "~types/index"
import appReduce from "./AppReduce"
import { env } from "~env"
import ContactContext from "./ContactContext"

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
         const findAll = async (): Promise<ContactApi[]> => {
            const url = env.backendUrl

            const res = await fetch(`${url}/contacts`, { method: "GET" })

            const response = await res.json()

            return response.contacts
         }

         const contactsFound = await findAll()

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
