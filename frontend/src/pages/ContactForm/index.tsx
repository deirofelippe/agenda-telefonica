import React, { useState } from "react"
import "./styles.css"
import { Link, useNavigate } from "react-router-dom"
import defaultImage from "~assets/default_avatar.svg"
import { ContactProps } from "~types/index"
import { useContacts } from "~hooks/useContacts"
import { createContactsRequest } from "~src/services/contacts"
import { generatePresignedUrl, uploadFile } from "~src/services/images"

const ContactForm = () => {
   const { createContact } = useContacts()

   const navigate = useNavigate()

   const [contact, setContact] = useState<ContactProps>({
      name: "",
      email: "",
      phone: "",
      imageName: "",
      imageContent: undefined,
   })

   const [imagePreview, setImagePreview] = useState(defaultImage)

   const change = ({
      target: { name, value },
   }: React.ChangeEvent<HTMLInputElement>) => {
      setContact({
         ...contact,
         [name]: value,
      })
   }

   const create = async () => {
      const { createdContact, responseIsOk } =
         await createContactsRequest(contact)

      if (!responseIsOk) {
         return
      }

      if (contact?.imageName) {
         const { signedUrl } = await generatePresignedUrl(
            createdContact.image as string
         )

         await uploadFile({
            signedUrl,
            imageContent: contact.imageContent!,
            imageName: createdContact.image!,
         })
      }

      const contactToCreateInContext: ContactProps = {
         ...createdContact,
         imageName: createdContact.image,
      }

      createContact(contactToCreateInContext)

      navigate("/")
   }

   const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0]

      const preview = file ? URL.createObjectURL(file) : defaultImage

      setContact({
         ...contact,
         imageContent: file,
         imageName: file.name,
      })

      setImagePreview(preview)
   }

   return (
      <>
         <header className="header">
            <nav className="navbar">
               <Link to="/">
                  <i className="fas fa-times fa-lg"></i>
               </Link>
               <Link to="#" onClick={create}>
                  <i className="fas fa-save fa-lg"></i>
               </Link>
            </nav>
         </header>

         <main>
            <section className="section">
               <form action="#">
                  <div className="form-group image-preview">
                     <img src={imagePreview} alt="Contact" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="image">Imagem</label>
                     <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={changeFile}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="name">Nome</label>
                     <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={change}
                        placeholder="Seu nome"
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="phone">Número</label>
                     <input
                        id="phone"
                        name="phone"
                        type="text"
                        onChange={change}
                        maxLength={10}
                        placeholder="91234-5678"
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="email">Email</label>
                     <input
                        id="email"
                        name="email"
                        type="text"
                        onChange={change}
                        placeholder="Seu email"
                     />
                  </div>
               </form>
            </section>
         </main>
      </>
   )
}

export default ContactForm
