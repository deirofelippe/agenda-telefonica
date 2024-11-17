import { memo } from "react"
import "./styles.css"
import { Link } from "react-router-dom"
import { useContacts } from "~hooks/useContacts"
import ContactItem from "./ContactItem/index"
import { deleteContactRequest } from "~src/services/contacts"

const ContactList = () => {
   const { contacts, removeContact } = useContacts()

   const remove = async (id: string) => {
      if (!window.confirm("Tem certeza que deseja deletar?")) {
         return
      }

      const response = await deleteContactRequest(id)

      if (!response.responseIsOk) {
         return
      }

      removeContact(id)
   }

   return (
      <>
         <header className="header">
            <nav className="navbar">
               <Link to="/">
                  <h1 className="navbar__title">Agenda Telefônica</h1>
               </Link>
               <Link to="/contact/form">
                  <i className="fas fa-plus fa-lg"></i>
               </Link>
            </nav>
         </header>

         <main>
            <section className="section-list">
               <ul className="contacts">
                  {contacts.map((contact) => (
                     <ContactItem contact={contact} remove={remove} />
                  ))}
               </ul>
            </section>
         </main>
      </>
   )
}

export default memo(ContactList)
