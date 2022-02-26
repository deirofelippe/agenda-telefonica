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

      console.log(createdContact);
      createContact(createdContact)

      // history.push('/contact')
   };

   return (
      <>
         <header class="header">
            <nav class="navbar">
               <Link to="/contact">
                  <i class="fas fa-times fa-lg"></i>
               </Link>
               <Link to="#" onClick={create}>
                  <i class="fas fa-save fa-lg"></i>
               </Link>
            </nav>
         </header>

         <main>
            <section>
               <form action="#">
                  <div class="form-group">
                     <label for="image">Imagem</label>
                     <input type="file" name="image" id="image" />
                  </div>
                  <div class="form-group">
                     <label for="name">Nome</label>
                     <input id="name" name="name" type="text" onChange={change} placeholder="Seu nome" />
                  </div>
                  <div class="form-group">
                     <label for="phone">Número</label>
                     <input id="phone" name="phone" type="text" onChange={change} maxLength="10" placeholder="91234-5678" />
                  </div>
                  <div class="form-group">
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