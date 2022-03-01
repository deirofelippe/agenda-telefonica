import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePhoneBook } from '../hooks/usePhoneBook';
import { s3DeleteFile, s3PutFile } from '../s3';
import './ContactEdit.css'
import defaultImage from './default_avatar.svg'

const ContactEdit = () => {
   const { id } = useParams()

   const { findContactInContext, editContactInContext } = usePhoneBook()

   const [imageStatus, setImageStatus] = useState({
      oldFileName: '',
      imagePreview: '',
      removeImageFromS3: false,
      file: {}
   });

   const [contactToEdit, setContactToEdit] = useState({
      id: id,
      name: '',
      email: '',
      phone: '',
      image: ''
   });

   useEffect(() => {
      const contactFound = findContactInContext(id)

      setContactToEdit({
         ...contactFound,
      })

      const imageExist = !!contactFound.image
      const preview = imageExist ? getImageURL(contactFound.image) : defaultImage

      setImageStatus({
         ...imageStatus,
         oldFileName: contactFound.image,
         imagePreview: preview
      })
   }, []);

   const getImageURL = (image) => {
      if (image) {
         const bucket = process.env.REACT_APP_AWS_BUCKET_NAME
         const region = process.env.REACT_APP_AWS_REGION
         return `https://${bucket}.s3.${region}.amazonaws.com/${image}`
      }

      return defaultImage
   }

   const inputChange = (event) => {
      const { name, value } = event.target;

      setContactToEdit({
         ...contactToEdit,
         [name]: value,
      });
   };

   const fileChange = (event) => {
      const file = event.target.files[0]

      let preview = defaultImage
      let imageName = ''
      let removeImageFromS3 = true

      if (file) {
         preview = URL.createObjectURL(file)
         imageName = getImageName(file.name)
         removeImageFromS3 = false
      }

      console.log(file, preview);

      setImageStatus({
         ...imageStatus,
         imagePreview: preview,
         removeImageFromS3,
         file: file || {}
      })

      setContactToEdit({
         ...contactToEdit,
         image: imageName
      })
   }

   const removeImage = (event) => {
      event.preventDefault()

      setImageStatus({
         ...imageStatus,
         removeImageFromS3: true,
         imagePreview: defaultImage,
         file: {}
      })

      setContactToEdit({
         ...contactToEdit,
         image: ''
      })
   }

   const getImageName = (filename) => {
      const { id } = contactToEdit

      const imageNameArray = filename.split('.')
      const lastIndex = imageNameArray.length - 1
      const ext = imageNameArray[lastIndex]
      const imageName = `${id}.${ext}`

      return imageName
   }

   const edit = async (event) => {
      event.preventDefault();

      const res = await sendRequest()

      if (!res.ok) {
         return;
      }

      await fileUpload()

      editContactInContext(contactToEdit)

      initialState()
   };

   const sendRequest = async () => {
      const url = process.env.REACT_APP_BACKEND_URL;

      const res = await fetch(`${url}/contact/${id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            ...contactToEdit
         }),
      });

      console.log('res');

      return res
   }

   const fileUpload = async () => {
      const { file, oldFileName, removeImageFromS3 } = imageStatus
      const { image: newFileName } = contactToEdit

      if (oldFileName && file?.name) {
         await s3DeleteFile(oldFileName)
         await s3PutFile(file, newFileName)
      } else if (removeImageFromS3 && oldFileName) {
         await s3DeleteFile(oldFileName)
      } else if (!oldFileName && file?.name) {
         await s3PutFile(file, newFileName)
      }
   }

   const initialState = () => {
      const { image } = contactToEdit
      const preview = image ? getImageURL(image) : defaultImage

      setImageStatus({
         removeImageFromS3: false,
         imagePreview: preview,
         oldFileName: image,
         file: {},
      })
   }

   return (
      <>
         <header className="header">
            <nav className="navbar">
               <Link to="/contact">
                  <i className="fas fa-times fa-lg"></i>
               </Link>
               <Link to="#" onClick={edit}>
                  <i className="fas fa-save fa-lg"></i>
               </Link>
            </nav>
         </header>

         <main>
            <section className='section'>
               <form action="#">
                  <div className="form-group remove-image">
                     <button onClick={removeImage}>Remover imagem</button>
                  </div>
                  <div className="form-group edit-image">
                     <img className='img-preview' src={imageStatus.imagePreview} alt="" />
                     <div>
                        <label htmlFor="image">Imagem</label>
                        <input type="file"
                           id="image"
                           onChange={fileChange} />
                     </div>
                  </div>
                  <div className="form-group">
                     <label htmlFor="name">Nome</label>
                     <input id="name"
                        name="name"
                        type="text"
                        onChange={inputChange}
                        value={contactToEdit?.name}
                        placeholder="Seu nome" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="phone">Número</label>
                     <input id="phone"
                        name="phone"
                        type="text"
                        onChange={inputChange}
                        value={contactToEdit?.phone}
                        placeholder="91234-5678" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="email">Email</label>
                     <input id="email"
                        name="email"
                        type="text"
                        onChange={inputChange}
                        value={contactToEdit?.email}
                        placeholder="Seu email" />
                  </div>
               </form>
            </section>
         </main>
      </>
   );
};

export default ContactEdit;