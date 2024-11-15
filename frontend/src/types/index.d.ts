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
