const region = "sa-east-1"
const bucket = "agenda-images"

const s3Url = `http://localhost:4566/${bucket}`
const backendUrl = "http://localhost:3000"
// const s3Url = `https://${bucket}.s3.${region}.amazonaws.com`
// const backendUrl = "http://localhost:3000"

const env = {
   region,
   bucket,
   backendUrl,
   s3Url,
}

export { env }
