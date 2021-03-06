import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css'
import { useParams } from "react-router-dom";
import { usePhoneBook } from '../hooks/usePhoneBook';
import defaultImage from './default_avatar.svg'
import { useHistory } from 'react-router-dom';

const Contact = () => {
   const { id } = useParams()

   const history = useHistory()

   const { removeContactInContext, findContactInContext } = usePhoneBook()

   const [contact, setContact] = useState({
      name: '',
      email: '',
      phone: '',
      image: '',
   });

   useEffect(() => {
      const contactFound = findContactInContext(id)
      setContact({
         ...contact,
         ...contactFound
      })
   }, [findContactInContext, id]);

   const remove = async (id) => {
      if (!window.confirm("Tem certeza que deseja deletar?")) {
         return;
      }

      const url = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${url}/contact/${id}`, { method: "DELETE" });

      if (!res.ok) {
         return
      }

      removeContactInContext(id)

      history.push('/')
   };

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
         <header className="header-contact">
            <nav className="navbar">
               <Link to="/contact">
                  <i className="fas fa-arrow-left fa-lg"></i>
               </Link>
               <div className="navbar__btn">
                  <Link to={`/contact/edit/${contact?.id}`}>
                     <i className="fas fa-edit fa-lg"></i>
                  </Link>
                  <Link to="#" onClick={() => remove(contact?.id)}>
                     <i className="fas fa-trash fa-lg"></i>
                  </Link>
               </div>
            </nav>
         </header>

         <main>
            <section className="section-contact">
               <div className="contact-header">
                  <img src={getImageURL(contact)} className="contact-img" alt="Contact" />
                  <h2 className="contact-name">{contact?.name}</h2>
               </div>
               <div className="contact-body">
                  <div className="contact-phone">
                     <p>N??mero</p>
                     <h3>{contact?.phone}</h3>
                  </div>
                  <div className="contact-email">
                     <p>Email</p>
                     <h3>{contact?.email}</h3>
                  </div>
               </div>
            </section>
         </main>
      </>
   );
};

// react - dom.development.js: 67 Warning: Maximum update depth exceeded.This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
//     at Contact(http://localhost:3001/static/js/bundle.js:126:66)
//    at Route(http://localhost:3001/static/js/bundle.js:39292:29)
//       at Switch(http://localhost:3001/static/js/bundle.js:39494:29)
//          at Rotas
//     at PhoneBookProvider(http://localhost:3001/static/js/bundle.js:1382:5)
//             at Router(http://localhost:3001/static/js/bundle.js:38927:30)
//                at BrowserRouter(http://localhost:3001/static/js/bundle.js:38548:35)
//                   at App

export default Contact;