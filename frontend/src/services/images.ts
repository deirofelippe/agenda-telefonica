import { env } from "~src/env"

async function generatePresignedUrl(imageName: string): Promise<{
   responseIsOk: boolean
   signedUrl: string
}> {
   const url = `${env.backendUrl}/images/presigned-url?imageName=${imageName}`

   const response = await fetch(url, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })

   const { url: signedUrl } = await response.json()

   return {
      signedUrl,
      responseIsOk: response.ok,
   }
}

async function uploadFile(options: {
   signedUrl: string
   imageName: string
   imageContent: File
}): Promise<{
   responseIsOk: boolean
}> {
   const { imageContent, imageName, signedUrl } = options

   if (!imageContent) {
      return { responseIsOk: false }
   }

   const mime = getMime(imageName as string)

   const fileBlob = new Blob([imageContent!], {
      type: mime,
   })

   const response = await fetch(`${signedUrl}`, {
      method: "PUT",
      headers: {
         "Content-Type": mime,
      },
      body: fileBlob,
   })

   return {
      responseIsOk: response.ok,
   }
}

function getMime(imageName: string) {
   const extension = imageName.split(".").pop()!

   const imageTypes = {
      png: "image/png",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      avif: "image/avif",
      webp: "image/webp",
   }

   const mime = imageTypes[extension as keyof typeof imageTypes]

   return mime
}

export { uploadFile, generatePresignedUrl }
