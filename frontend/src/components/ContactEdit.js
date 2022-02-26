import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { usePhoneBook } from '../hooks/usePhoneBook';
import './ContactFormEdit.css'

const ContactEdit = () => {
   const { id } = useParams()

   const history = useHistory()

   const { findContact, editContact } = usePhoneBook()

   const [editedContact, setEditedContact] = useState({
      name: '',
      email: '',
      phone: '',
   });

   useEffect(() => {
      const contactFound = findContact(id)
      setEditedContact(contactFound)
   }, [findContact, id]);

   const change = (event) => {
      const { name, value } = event.target;
      console.log(editedContact);

      setEditedContact({
         ...editedContact,
         [name]: value,
      });
   };

   const edit = async (event) => {
      event.preventDefault();

      // const url = process.env.REACT_APP_BACKEND_URL;

      // const res = await fetch(`${url}/contact/${id}`, {
      //    method: "PUT",
      //    headers: {
      //       "Content-Type": "application/json",
      //    },
      //    body: JSON.stringify({ ...contact }),
      // });

      // const body = await res.json();

      // if (!res.ok) {
      //    return
      // }

      editContact(editedContact)

      history.push('/contact')
   };

   return (
      <>
         <header class="header">
            <nav class="navbar">
               <Link to="/contact">
                  <i class="fas fa-times fa-lg"></i>
               </Link>
               <Link to="#" onClick={edit}>
                  <i class="fas fa-save fa-lg"></i>
               </Link>
            </nav>
         </header>

         <main>
            <section>
               <form action="#">
                  <div class="form-group">
                     <label htmlFor="image">Imagem</label>
                     <input type="file"
                        name="image"
                        id="image" />
                  </div>
                  <div class="form-group">
                     <label htmlFor="name">Nome</label>
                     <input id="name"
                        name="name"
                        type="text"
                        onChange={change}
                        value={editedContact?.name}
                        placeholder="Seu nome" />
                  </div>
                  <div class="form-group">
                     <label htmlFor="phone">Número</label>
                     <input id="phone"
                        name="phone"
                        type="text"
                        onChange={change}
                        value={editedContact?.phone}
                        placeholder="91234-5678" />
                  </div>
                  <div class="form-group">
                     <label htmlFor="email">Email</label>
                     <input id="email"
                        name="email"
                        type="text"
                        onChange={change}
                        value={editedContact?.email}
                        placeholder="Seu email" />
                  </div>
               </form>
            </section>
         </main>
      </>
   );
};

export default ContactEdit;