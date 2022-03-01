import React, { useState } from 'react';
import './ContactForm.css'
import { Link, useHistory } from 'react-router-dom';
import { usePhoneBook } from '../hooks/usePhoneBook';
import { s3PutFile } from '../s3.js';
import defaultImage from './default_avatar.svg'

const ContactForm = () => {
   const { createContactInContext } = usePhoneBook()

   const history = useHistory()

   const [contact, setContact] = useState({
      name: '',
      email: '',
      phone: '',
      image: {}
   });

   const [imagePreview, setImagePreview] = useState(defaultImage);

   const change = ({ target: { name, value } }) => {
      setContact({
         ...contact,
         [name]: value,
      });
   };

   const create = async () => {
      const res = await sendRequest()

      if (!res.ok) {
         return;
      }

      const { contact: createdContact } = await res.json();

      await fileUpload(createdContact)

      createContactInContext(createdContact)
   };

   const sendRequest = async () => {
      const url = process.env.REACT_APP_BACKEND_URL;

      const res = await fetch(`${url}/contact`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            ...contact,
            image: contact.image.name
         }),
      });

      return res
   }

   const fileUpload = async createdContact => {
      const { image: filename } = createdContact

      if (!filename) {
         history.push('/contact')
         return;
      }

      await s3PutFile(contact.image, filename)

      history.push('/contact')
   }

   const changeFile = (event) => {
      const file = event.target.files[0]

      const preview = file ? URL.createObjectURL(file) : defaultImage

      setContact({
         ...contact,
         image: file || {}
      })

      setImagePreview(preview)
   }

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
                  <div className="form-group image-preview">
                     <img src={imagePreview} alt="Contact" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="image">Imagem</label>
                     <input type="file" name="image" id="image" onChange={changeFile} />
                  </div>
                  <div className="form-group">
                     <label htmlFor="name">Nome</label>
                     <input id="name" name="name" type="text" onChange={change} placeholder="Seu nome" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="phone">Número</label>
                     <input id="phone" name="phone" type="text" onChange={change} maxLength="10" placeholder="91234-5678" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="email">Email</label>
                     <input id="email" name="email" type="text" onChange={change} placeholder="Seu email" />
                  </div>
               </form>
            </section>
         </main>
      </>
   );
};

export default ContactForm;