import React, { useEffect, useState } from 'react';
import './ContactList.css';
import ContactItem from './ContactItem.js';
import mockContacts from '../mockPhoneBook';
import { Link } from 'react-router-dom';
import { usePhoneBook } from '../hooks/usePhoneBook';

const ContactList = () => {
   const { removeContact, phoneBook } = usePhoneBook()

   const [contacts, setContacts] = useState([]);

   useEffect(() => {
      setContacts([...phoneBook])
   }, [phoneBook]);

   const remove = async (id) => {
      if (!window.confirm("Tem certeza que deseja deletar?")) {
         return;
      }

      const url = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${url}/contact/${id}`, { method: "DELETE" });

      if (!res.ok) {
         return
      }

      removeContact(id)
   };

   return (
      <>
         <header className="header">
            <nav className="navbar">
               <Link to="/contact">
                  <h1 className="navbar__title">Agenda Telefônica</h1>
               </Link>
               <Link to="/contact/form">
                  <i className="fas fa-plus fa-lg"></i>
               </Link>
            </nav>
         </header>

         <main>
            <section className='section-list'>
               <ul className="contacts">
                  {contacts.map((contact) => (
                     <ContactItem contact={contact} remove={remove} />
                  ))}
               </ul>
            </section>
         </main>
      </>
   );
};

export default ContactList;