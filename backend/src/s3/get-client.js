import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../env.js";

/** @param {string} endpoint  */
export default function getS3Client(endpoint = "http://localstack:4566") {
  const clientParams = {
    region: env.region,
    forcePathStyle: true,
    endpoint: endpoint,
    credentials: { accessKeyId: "", secretAccessKey: "" },
  };

  if (env.isProduction) {
    delete clientParams.endpoint;
    delete clientParams.forcePathStyle;
    delete clientParams.credentials;
  }

  const client = new S3Client(clientParams);

  return client;
}
