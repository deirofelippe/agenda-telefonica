const region = "sa-east-1"
const bucket = "agenda-images"

type NodeEnv = "development" | "production"

let nodeEnv: NodeEnv = "development"

let s3Url
let backendUrl
//@ts-ignore
if (nodeEnv === "production") {
   s3Url = `https://${bucket}.s3.${region}.amazonaws.com`
   backendUrl = "http://54.207.212.151"
} else {
   s3Url = `http://localhost:4566/${bucket}`
   backendUrl = "http://localhost:3000"
}

const env = {
   region,
   bucket,
   backendUrl,
   s3Url,
}

export { env }
