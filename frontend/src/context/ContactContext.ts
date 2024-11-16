import { createContext } from "react"
import { ContactProps } from "~types/index"

export type ContactContextType = {
   createContact: (contact: ContactProps) => void
   editContact: (contact: ContactProps) => void
   removeContact: (id: string) => void
   findContact: (id: string) => ContactProps | undefined
   contacts: ContactProps[]
}

const ContactContext = createContext<Partial<ContactContextType>>({
   contacts: [],
})

export default ContactContext
