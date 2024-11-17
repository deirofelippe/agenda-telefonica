import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import getS3Client from "./get-client.js";
import "../types/index.js";

/** @param {string} imageName */
export default async function deleteObject(imageName) {
  const client = getS3Client();

  /** @type {DeleteObjectCommandInput} */
  const deleteObjectParams = {
    Bucket: "agenda-images",
    Key: imageName,
  };

  const command = new DeleteObjectCommand(deleteObjectParams);

  await client.send(command);
}
