import ContactList from "~pages/ContactList/index"
import ContactEdit from "~pages/ContactEdit/index"
import ContactForm from "~pages/ContactForm/index"
import Contact from "~pages/Contact/index"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter(
   [
      { path: "/", element: <ContactList />, errorElement: <ContactList /> },
      { path: "/contact/edit/:id", element: <ContactEdit /> },
      { path: "/contact/form", element: <ContactForm /> },
      { path: "/contact/:id", element: <Contact /> },
   ],
   {
      future: {
         v7_fetcherPersist: true,
         v7_relativeSplatPath: true,
         v7_normalizeFormMethod: true,
         v7_partialHydration: true,
         v7_skipActionErrorRevalidation: true,
      },
   }
)

export default router
