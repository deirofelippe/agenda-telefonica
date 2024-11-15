import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import "../types/index.js";

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function preSignedUrl(req, res) {
  try {
    /** @type {{ imageName: string }} */
    const body = req.body;

    /** @type {DeleteObjectCommandInput} */
    const clientParams = {
      region: "sa-east-1",
      forcePathStyle: true,
      credentials: {
        accessKeyId: "",
        secretAccessKey: "",
      },
      endpoint: "http://localhost:4566",
    };

    const client = new S3Client(clientParams);

    const imageName = body.imageName;

    /** @type {PutObjectCommandInput} */
    const putObjectParams = {
      Bucket: "agenda-images",
      Key: imageName,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(putObjectParams);

    const url = await getSignedUrl(client, command, { expiresIn: 120 });

    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export { preSignedUrl };
