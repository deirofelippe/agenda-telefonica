import defaultImage from "../assets/default_avatar.svg"
import { env } from "../env"

export const getImageURL = (imageName: string) => {
   if (!imageName) {
      return defaultImage
   }

   const timestamp = Date.now()
   const url = `${env.s3Url}/${imageName}?${timestamp}`
   return url
}
