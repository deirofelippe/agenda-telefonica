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
      })()
   }, []);

   function editContact(editedContact) {
      const newPhoneBook = phoneBook.filter(contact => contact.id !== editedContact.id)
      setPhoneBook([
         editedContact,
         ...newPhoneBook,
      ])
   }

   function createContact(contact) {
      setPhoneBook([
         contact,
         ...phoneBook
      ])
   }

   function removeContact(id) {
      const newPhoneBook = phoneBook.filter(contact => contact.id !== id)
      setPhoneBook([...newPhoneBook])
   }

   function findContact(id) {
      return phoneBook.find(contact => contact.id === id)
   }

   return <PhoneBookContext.Provider value={{
      editContact,
      removeContact,
      findContact,
      createContact,
      phoneBook,
      setPhoneBook
   }} >{children}</PhoneBookContext.Provider>
}

export function usePhoneBook() {
   const context = useContext(PhoneBookContext)
   const { editContact, createContact, removeContact, findContact, phoneBook, setPhoneBook } = context
   return { editContact, createContact, removeContact, findContact, phoneBook, setPhoneBook }
}