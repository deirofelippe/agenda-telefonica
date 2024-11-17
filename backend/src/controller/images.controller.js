import "../types/index.js";
import generatePresignedUrl from "../services/images/generate-presigned-url.js";

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @returns {ResponseExpress}
 */
async function preSignedUrl(req, res) {
  /** @type {{ imageName: string }} */
  const imageName = req.query.imageName;

  const { data, errors } = await generatePresignedUrl(imageName);

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  return res.status(200).json({ url: data.url });
}

export { preSignedUrl };
