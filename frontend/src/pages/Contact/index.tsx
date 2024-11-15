import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./Contact.css"
import { useContacts } from "hooks/useContacts"
import { ContactProps } from "types/index"
import { env } from "env.ts"
import { getImageURL } from "utils/index"

const Contact = () => {
   const params = useParams()
   const id = params.id!

   const navigate = useNavigate()

   const { findContact, removeContact } = useContacts()

   const [contact, setContact] = useState<ContactProps>({
      name: "",
      email: "",
      phone: "",
      imageName: "",
   })

   useEffect(() => {
      const contactFound = findContact(id)

      if (!contactFound) {
         navigate("/")
      }

      setContact({
         ...contact,
         ...contactFound,
      })
   }, [])

   const remove = async (id: string) => {
      if (!window.confirm("Tem certeza que deseja deletar?")) {
         return
      }

      const url = env.backendUrl
      const res = await fetch(`${url}/contacts/${id}`, { method: "DELETE" })

      if (!res.ok) {
         return
      }

      removeContact(id)

      navigate("/")
   }

   return (
      <>
         <header className="header-contact">
            <nav className="navbar">
               <Link to="/">
                  <i className="fas fa-arrow-left fa-lg"></i>
               </Link>
               <div className="navbar__btn">
                  <Link to={`/contact/edit/${contact.id!}`}>
                     <i className="fas fa-edit fa-lg"></i>
                  </Link>
                  <Link to="#" onClick={() => remove(contact.id!)}>
                     <i className="fas fa-trash fa-lg"></i>
                  </Link>
               </div>
            </nav>
         </header>

         <main>
            <section className="section-contact">
               <div className="contact-header">
                  <img
                     src={getImageURL(contact.imageName!)}
                     className="contact-img"
                     alt="Contact"
                  />
                  <h2 className="contact-name">{contact?.name}</h2>
               </div>
               <div className="contact-body">
                  <div className="contact-phone">
                     <p>Número</p>
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
   )
}

export default Contact
