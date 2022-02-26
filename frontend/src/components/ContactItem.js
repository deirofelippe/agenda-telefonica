import React, { useState } from 'react';
import './ContactItem.css'
import { Link } from 'react-router-dom';

const ContactItem = ({ contact, remove }) => {

   return (
      <li class="contacts__item" key={contact.id}>
         <div class="contacts__item-info">
            <img src={contact.image} class="contacts__item-img" alt="" />
            <Link to={`/contact/${contact.id}`}>
               <h2 class="contacts__item-name">{contact.name}</h2>
            </Link>
         </div>
         <div class="contacts__item-btn">
            <Link to={`/contact/edit/${contact.id}`}>
               <i class="fas fa-edit fa-2x"></i>
            </Link>
            <Link to="#" onClick={() => remove(contact.id)}>
               <i class="fas fa-trash fa-2x"></i>
            </Link>
         </div>
      </li>
   );
};

export default ContactItem;