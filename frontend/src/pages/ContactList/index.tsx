import { memo } from "react"
import "./styles.css"
import { Link } from "react-router-dom"
import { useContacts } from "~hooks/useContacts"
import { env } from "~env"
import ContactItem from "./ContactItem/index"

const ContactList = () => {
   const { contacts, removeContact } = useContacts()

   const remove = async (id: string) => {
      if (!window.confirm("Tem certeza que deseja deletar?")) {
         return
      }

      const res = await sendRequest(id)

      if (!res.ok) {
         return
      }

      removeContact(id)
   }

   const sendRequest = async (id: string) => {
      const url = env.backendUrl
      const res = await fetch(`${url}/contacts/${id}`, { method: "DELETE" })

      return res
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
