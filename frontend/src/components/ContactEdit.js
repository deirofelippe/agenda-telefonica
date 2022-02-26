import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { usePhoneBook } from '../hooks/usePhoneBook';
import './ContactFormEdit.css'

const ContactEdit = () => {
   const { id } = useParams()

   const history = useHistory()

   const { findContact, editContact } = usePhoneBook()

   const [contactToEdit, setContactToEdit] = useState({
      name: '',
      email: '',
      phone: '',
   });

   useEffect(() => {
      const contactFound = findContact(id)
      setContactToEdit(contactFound)
   }, [findContact, id]);

   const change = (event) => {
      const { name, value } = event.target;

      setContactToEdit({
         ...contactToEdit,
         [name]: value,
      });
   };

   const edit = async (event) => {
      event.preventDefault();

      const url = process.env.REACT_APP_BACKEND_URL;

      const res = await fetch(`${url}/contact/${id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ ...contactToEdit }),
      });

      await res.json();

      if (!res.ok) {
         return
      }

      editContact(contactToEdit)

      history.push('/contact')
   };

   return (
      <>
         <header className="header">
            <nav className="navbar">
               <Link to="/contact">
                  <i className="fas fa-times fa-lg"></i>
               </Link>
               <Link to="#" onClick={edit}>
                  <i className="fas fa-save fa-lg"></i>
               </Link>
            </nav>
         </header>

         <main>
            <section className='section'>
               <form action="#">
                  <div className="form-group">
                     <label htmlFor="name">Nome</label>
                     <input id="name"
                        name="name"
                        type="text"
                        onChange={change}
                        value={contactToEdit?.name}
                        placeholder="Seu nome" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="phone">Número</label>
                     <input id="phone"
                        name="phone"
                        type="text"
                        onChange={change}
                        value={contactToEdit?.phone}
                        placeholder="91234-5678" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="email">Email</label>
                     <input id="email"
                        name="email"
                        type="text"
                        onChange={change}
                        value={contactToEdit?.email}
                        placeholder="Seu email" />
                  </div>
               </form>
            </section>
         </main>
      </>
   );
};

export default ContactEdit;