import { ContactProps } from "../App.tsx"

type ActionCreate = {
   type: "CREATE"
   payload: { contact: ContactProps }
}

type ActionRemove = {
   type: "REMOVE"
   payload: { id: string }
}

type ActionEdit = {
   type: "EDIT"
   payload: { contact: ContactProps }
}

type ActionCreateAll = {
   type: "CREATE_ALL"
   payload: { contacts: ContactProps[] }
}

export type AppAction =
   | ActionCreate
   | ActionRemove
   | ActionEdit
   | ActionCreateAll

export type AppState = { contacts: ContactProps[] }

function editContact(
   state: AppState["contacts"],
   payload: ActionEdit["payload"]
): ContactProps[] {
   const contactFound = state.find(
      (contact) => contact.id !== payload.contact.id
   )

   const editedContact: ContactProps = {
      ...contactFound,
      ...payload.contact,
   }

   const newState = state.filter((contact) => contact.id !== editedContact.id)

   return [...newState, editedContact]
}

function createContact(
   state: AppState["contacts"],
   payload: ActionCreate["payload"]
): ContactProps[] {
   return [...state, payload.contact]
}

function createAllContacts(
   payload: ActionCreateAll["payload"]
): ContactProps[] {
   return [...payload.contacts]
}

function removeContact(
   state: AppState["contacts"],
   payload: ActionRemove["payload"]
): ContactProps[] {
   const newState = state.filter((contact) => contact.id !== payload.id)
   return newState
}

export default function appReduce(state: AppState, action: AppAction) {
   let newState: ContactProps[]

   switch (action.type) {
      case "CREATE":
         newState = createContact(state.contacts, action.payload)

         return {
            contacts: newState,
         }
      case "CREATE_ALL":
         newState = createAllContacts(action.payload)

         return {
            contacts: newState,
         }
      case "EDIT":
         newState = editContact(state.contacts, action.payload)

         return {
            contacts: newState,
         }
      case "REMOVE":
         newState = removeContact(state.contacts, action.payload)

         return {
            contacts: newState,
         }
      default:
         return state
   }
}
