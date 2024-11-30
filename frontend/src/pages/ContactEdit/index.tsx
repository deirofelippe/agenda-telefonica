import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import "./styles.css"
import defaultImage from "~assets/default_avatar.svg"
import { ContactApi, ContactProps } from "~types/index"
import { env } from "~env"
import { useContacts } from "~hooks/useContacts"
import { getImageURL } from "~utils/index"
import { updateContactRequest } from "~src/services/contacts"
import { generatePresignedUrl, uploadFile } from "~src/services/images"

const ContactEdit = () => {
   const { id } = useParams()

   const navigate = useNavigate()

   const redirectToHome = () => {
      navigate("/")
   }

   if (!id) {
      redirectToHome()
   }

   const { findContact, editContact } = useContacts()

   const [imageStatus, setImageStatus] = useState<{
      imagePreview: string
      updateImage: boolean
   }>({
      imagePreview: "",
      updateImage: false,
   })

   const [contactToEdit, setContactToEdit] = useState<ContactProps>({
      id: id,
      name: "",
      email: "",
      phone: "",
      imageName: "",
   })

   useEffect(() => {
      const contactFound = findContact(id!)

      if (!contactFound) {
         redirectToHome()
      }

      setContactToEdit({
         ...contactFound!,
      })

      const imageExist = !!contactFound!.imageName
      const preview = imageExist
         ? getImageURL(contactFound!.imageName!)
         : defaultImage

      setImageStatus({
         ...imageStatus,
         imagePreview: preview,
      })
   }, [])

   const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target

      setContactToEdit({
         ...contactToEdit,
         [name]: value,
      })
   }

   const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0]

      if (!file) {
         return
      }

      const preview = URL.createObjectURL(file)
      const updateImage = true
      const imageName = file.name

      setImageStatus({
         ...imageStatus,
         imagePreview: preview,
         updateImage,
      })

      setContactToEdit({
         ...contactToEdit,
         imageName,
         imageContent: file,
      })
   }

   const removeImage = (event: React.MouseEvent) => {
      event.preventDefault()

      setImageStatus({
         ...imageStatus,
         imagePreview: defaultImage,
      })

      setContactToEdit({
         ...contactToEdit,
         imageName: "",
         imageContent: undefined,
      })
   }

   const edit = async (event: React.MouseEvent) => {
      event.preventDefault()

      const { responseIsOk, updatedContact } =
         await updateContactRequest(contactToEdit)

      if (!responseIsOk) {
         return
      }

      const hasImage =
         imageStatus.updateImage === true &&
         contactToEdit.imageContent !== undefined

      let imageName = contactToEdit.imageName ?? ""
      if (hasImage) {
         const { signedUrl } = await generatePresignedUrl(
            updatedContact.image as string
         )

         await uploadFile({
            imageContent: contactToEdit.imageContent!,
            imageName: updatedContact.image!,
            signedUrl,
         })

         const timestamp = Date.now()
         const removeCacheImage = `?${timestamp}`

         imageName = updatedContact.image + removeCacheImage
      }

      const contactToEditInContext: ContactProps = {
         ...contactToEdit,
         ...updatedContact,
         imageName,
      }

      editContact(contactToEditInContext)

      navigate(`/`)
   }

   return (
      <>
         <header className="header">
            <nav className="navbar">
               <Link to="/">
                  <i className="fas fa-times fa-lg"></i>
               </Link>
               <Link to="#" onClick={edit}>
                  <i className="fas fa-save fa-lg"></i>
               </Link>
            </nav>
         </header>

         <main>
            <section className="section">
               <form action="#">
                  <div className="form-group remove-image">
                     <button onClick={removeImage}>Remover imagem</button>
                  </div>
                  <div className="form-group edit-image">
                     <img
                        className="img-preview"
                        src={imageStatus.imagePreview}
                        alt=""
                     />
                     <div>
                        <label htmlFor="image">Imagem</label>
                        <input type="file" id="image" onChange={fileChange} />
                     </div>
                  </div>
                  <div className="form-group">
                     <label htmlFor="name">Nome</label>
                     <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={inputChange}
                        value={contactToEdit?.name}
                        placeholder="Seu nome"
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="phone">Número</label>
                     <input
                        id="phone"
                        name="phone"
                        type="text"
                        maxLength={10}
                        onChange={inputChange}
                        value={contactToEdit?.phone}
                        placeholder="91234-5678"
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="email">Email</label>
                     <input
                        id="email"
                        name="email"
                        type="text"
                        onChange={inputChange}
                        value={contactToEdit?.email}
                        placeholder="Seu email"
                     />
                  </div>
               </form>
            </section>
         </main>
      </>
   )
}

export default ContactEdit
