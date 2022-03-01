import React, { memo, useEffect, useState } from 'react';
import './ContactList.css';
import ContactItem from './ContactItem.js';
import { Link } from 'react-router-dom';
import { usePhoneBook } from '../hooks/usePhoneBook';
import { s3DeleteFile } from '../s3';
import defaultImage from './default_avatar.svg'

const ContactList = () => {
   const { removeContactInContext, phoneBook } = usePhoneBook()

   const [contacts, setContacts] = useState([]);

   useEffect(() => {
      setContacts([...phoneBook])
   }, [phoneBook]);

   const remove = async (id, image) => {
      if (!window.confirm("Tem certeza que deseja deletar?")) {
         return;
      }

      const res = await sendRequest(id)

      if (!res.ok) {
         return
      }

      if (image) await s3DeleteFile(image)

      removeContactInContext(id)
   };

   const sendRequest = async id => {
      const url = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${url}/contact/${id}`, { method: "DELETE" });
      return res
   }

   const getImageURL = ({ image = undefined }) => {
      if (image) {
         const bucket = process.env.REACT_APP_AWS_BUCKET_NAME
         const region = process.env.REACT_APP_AWS_REGION
         return `https://${bucket}.s3.${region}.amazonaws.com/${image}`
      }

      return defaultImage
   }

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
                     <ContactItem contact={contact} remove={remove} getImageURL={getImageURL} />
                  ))}
               </ul>
            </section>
         </main>
      </>
   );
};

export default memo(ContactList);