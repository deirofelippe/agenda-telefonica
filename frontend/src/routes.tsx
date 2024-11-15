import ContactList from "pages/ContactList"
import ContactEdit from "pages/ContactEdit"
import ContactForm from "pages/ContactForm"
import Contact from "pages/Contact"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter(
   [
      { path: "/contact/edit/:id", element: <ContactEdit /> },
      { path: "/contact/form", element: <ContactForm /> },
      { path: "/contact/:id", element: <Contact /> },
      {
         path: "/",
         element: <ContactList />,
      },
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
