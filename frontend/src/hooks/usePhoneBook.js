import { createContext, useContext, useEffect, useState } from 'react';
import mockPhoneBook from '../mockPhoneBook.js';

export const PhoneBookContext = createContext()

export default function PhoneBookProvider({ children }) {
   const [phoneBook, setPhoneBook] = useState([]);

   useEffect(() => {
      (async () => {
         const findAll = async () => {
            const url = process.env.REACT_APP_BACKEND_URL;
            const res = await fetch(`${url}/contact`, { method: "GET" });
            return await res.json()
         }

         const { contacts } = await findAll()

         setPhoneBook([...contacts])
         // setPhoneBook([...mockPhoneBook])
      })()
   }, []);

   function editContactInContext(contactToEditState) {
      const editedContact = {
         ...contactToEditState
      }

      const newPhoneBook = phoneBook.filter(contact => contact.id !== editedContact.id)

      setPhoneBook([
         editedContact,
         ...newPhoneBook,
      ])
   }

   function createContactInContext(contact) {
      delete contact.createdAt
      delete contact.updatedAt

      setPhoneBook([
         contact,
         ...phoneBook
      ])
   }

   function removeContactInContext(id) {
      const newPhoneBook = phoneBook.filter(contact => contact.id !== id)
      setPhoneBook([...newPhoneBook])
   }

   function findContactInContext(id) {
      return phoneBook.find(contact => contact.id === id)
   }

   return <PhoneBookContext.Provider value={{
      editContactInContext,
      removeContactInContext,
      findContactInContext,
      createContactInContext,
      phoneBook,
      setPhoneBook
   }} >{children}</PhoneBookContext.Provider>
}

export function usePhoneBook() {
   const context = useContext(PhoneBookContext)
   const {
      editContactInContext,
      createContactInContext,
      removeContactInContext,
      findContactInContext,
      phoneBook,
      setPhoneBook
   } = context

   return {
      editContactInContext,
      createContactInContext,
      removeContactInContext,
      findContactInContext,
      phoneBook,
      setPhoneBook
   }
}