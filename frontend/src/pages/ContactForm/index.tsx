import React, { useState } from "react"
import "./styles.css"
import { Link, useNavigate } from "react-router-dom"
import defaultImage from "~assets/default_avatar.svg"
import { ContactApi, ContactProps } from "~types/index"
import { env } from "~env"
import { useContacts } from "~hooks/useContacts"

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
      const { createdContact, responseIsOk } = await sendRequest()

      if (!responseIsOk) {
         return
      }

      if (contact?.imageName) {
         const signedUrl = await generatePreSignedUrl(
            createdContact.image as string
         )

         await fileUpload(signedUrl, createdContact)
      }

      const contactToCreateInContext: ContactProps = {
         ...createdContact,
         imageName: createdContact.image,
      }

      createContact(contactToCreateInContext)

      navigate("/")
   }
   const sendRequest = async (): Promise<{
      responseIsOk: boolean
      createdContact: ContactApi
   }> => {
      const url = env.backendUrl

      const body: ContactApi = {
         ...contact,
         image: contact?.imageName ?? "",
      }

      const response = await fetch(`${url}/contacts`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      })

      const { contact: createdContact } = await response.json()

      createdContact.imageName = createdContact.image

      return {
         createdContact,
         responseIsOk: response.ok,
      }
   }

   const generatePreSignedUrl = async (imageName: string): Promise<string> => {
      const url = env.backendUrl

      const body = {
         imageName: imageName,
      }

      const response = await fetch(`${url}/images/presigned-url`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      })

      const { url: signedUrl } = await response.json()

      return signedUrl
   }

   const fileUpload = async (signedUrl: string, createdContact: ContactApi) => {
      const { image } = createdContact

      if (!image) {
         return
      }

      const mime = getMime(createdContact.image as string)

      const fileBlob = new Blob([contact.imageContent!], {
         type: mime,
      })

      const response = await fetch(`${signedUrl}`, {
         method: "PUT",
         headers: {
            "Content-Type": mime,
         },
         body: fileBlob,
      })
   }

   function getMime(imageName: string) {
      const extension = imageName.split(".").pop()!

      const imageTypes = {
         png: "image/png",
         jpeg: "image/jpeg",
         jpg: "image/jpeg",
         avif: "image/avif",
         webp: "image/webp",
      }

      const mime = imageTypes[extension as keyof typeof imageTypes]

      return mime
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
