import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import ContactList from "./pages/ContactList.tsx"
import ContactEdit from "./pages/ContactEdit.tsx"
import ContactForm from "./pages/ContactForm.tsx"
import Contact from "./pages/Contact.tsx"
import ContactProvider from "./context/ContactProvider.tsx"

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

export type ContactProps = {
   id?: string
   name: string
   email: string
   phone: string
   imageContent?: File
   imageName?: string
   createdAt?: string
   updatedAt?: string
}

export type ContactApi = {
   id?: string
   name: string
   email: string
   phone: string
   image?: string
   createdAt?: string
   updatedAt?: string
}

function App() {
   return (
      <ContactProvider>
         <RouterProvider
            router={router}
            future={{ v7_startTransition: true }}
         />
      </ContactProvider>
   )
}

export default App
