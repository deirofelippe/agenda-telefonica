import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "../../types/index.js";
import getS3Client from "../../s3/get-client.js";

/** @param {string} imageName */
async function generatePresignedUrl(imageName) {
  /** @type {ServiceReturn} */
  const result = {
    errors: [],
    data: {},
  };

  if (!imageName || imageName === "") {
    result.errors.push({ message: "Image is empty" });
    return result;
  }

  /** @type {PutObjectCommandInput} */
  const putObjectParams = {
    Bucket: "agenda-images",
    Key: imageName,
    ACL: "public-read",
  };

  const command = new PutObjectCommand(putObjectParams);

  const client = getS3Client("http://localhost:4566");

  const url = await getSignedUrl(client, command, { expiresIn: 120 });

  result.data["url"] = url;

  return result;
}

export default generatePresignedUrl;
