import { RouterProvider } from "react-router-dom"
import ContactProvider from "context/ContactProvider.tsx"
import router from "./routes"
import "./App.css"

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
