import React, { useState } from 'react';
import './ContactFormEdit.css'
import { Link, useHistory } from 'react-router-dom';
import { usePhoneBook } from '../hooks/usePhoneBook';

const ContactForm = () => {
   const { createContact } = usePhoneBook()

   const history = useHistory()

   const [contact, setContact] = useState({
      name: '',
      email: '',
      phone: '',
   });

   const change = ({ target: { name, value } }) => {
      setContact({
         ...contact,
         [name]: value,
      });
   };

   const create = async (event) => {
      event.preventDefault();

      const url = process.env.REACT_APP_BACKEND_URL;

      const res = await fetch(`${url}/contact`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ ...contact }),
      });

      if (!res.ok) {
         return;
      }

      const { contact: createdContact } = await res.json();

      createContact(createdContact)

      history.push('/contact')
   };

   return (
      <>
         <header className="header">
            <nav className="navbar">
               <Link to="/contact">
                  <i className="fas fa-times fa-lg"></i>
               </Link>
               <Link to="#" onClick={create}>
                  <i className="fas fa-save fa-lg"></i>
               </Link>
            </nav>
         </header>

         <main>
            <section className='section'>
               <form action="#">
                  <div className="form-group">
                     <label for="name">Nome</label>
                     <input id="name" name="name" type="text" onChange={change} placeholder="Seu nome" />
                  </div>
                  <div className="form-group">
                     <label for="phone">Número</label>
                     <input id="phone" name="phone" type="text" onChange={change} maxLength="10" placeholder="91234-5678" />
                  </div>
                  <div className="form-group">
                     <label for="email">Email</label>
                     <input id="email" name="email" type="text" onChange={change} placeholder="Seu email" />
                  </div>
               </form>
            </section>
         </main>
      </>
   );
};

export default ContactForm;