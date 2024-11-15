const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function preSignedUrl(req, res) {
  try {
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

    const imageName = req.body.imageName;

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

module.exports = {
  preSignedUrl,
};
