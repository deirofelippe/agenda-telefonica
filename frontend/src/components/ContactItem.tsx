import { ContactProps } from "../App"
import { getImageURL } from "../utils/utils"
import "./ContactItem.css"
import { Link } from "react-router-dom"

interface ContactItemProps {
   contact: ContactProps
   remove: (id: string) => void
}

const ContactItem = ({ contact, remove }: ContactItemProps) => {
   return (
      <li className="contacts__item" key={contact.id}>
         <div className="contacts__item-info">
            <img
               src={getImageURL(contact.imageName!)}
               className="contacts__item-img"
               alt=""
            />
            <Link to={`/contact/${contact.id}`}>
               <h2 className="contacts__item-name">{contact.name}</h2>
            </Link>
         </div>
         <div className="contacts__item-btn">
            <Link to={`/contact/edit/${contact.id}`}>
               <i className="fas fa-edit fa-2x"></i>
            </Link>
            <Link to="#" onClick={() => remove(contact.id!)}>
               <i className="fas fa-trash fa-2x"></i>
            </Link>
         </div>
      </li>
   )
}

export default ContactItem
