import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const bucket = process.env.REACT_APP_AWS_BUCKET_NAME

const getInstance = async () => {
   const region = process.env.REACT_APP_AWS_REGION
   const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID
   const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY


   const s3ConfigBase = {
      region,
      forcePathStyle: true,
      credentials: {
         accessKeyId,
         secretAccessKey
      }
   }

   const s3Config = {
      endpoint: 'http://localhost:4566',
      ...s3ConfigBase
   }

   return new S3Client(s3ConfigBase)
}

export const s3PutFile = async (image, filename) => {
   const s3 = await getInstance()
   console.log('s3Put');

   const putResponse = await s3.send(
      new PutObjectCommand({
         Bucket: bucket,
         Key: filename,
         ACL: 'public-read',
         Body: image
      })
   )

   console.log('putRes: ', putResponse);
}

export const s3DeleteFile = async (filename) => {
   const s3 = await getInstance()
   console.log('s3Del');

   const deleteResponse = await s3.send(
      new DeleteObjectCommand({
         Bucket: bucket,
         Key: filename,
      })
   )
   console.log('delRes: ', deleteResponse);
}