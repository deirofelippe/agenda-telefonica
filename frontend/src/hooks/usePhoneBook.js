import { useContext } from 'react';
import { PhoneBookContext } from './PhoneBookContext';

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