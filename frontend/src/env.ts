const region = "sa-east-1"
const bucket = "agenda-images"

type NodeEnv = "development" | "production"

let nodeEnv: NodeEnv = "production"

const prodS3Url = `https://${bucket}.s3.${region}.amazonaws.com`
const prodBackendUrl = "http://15.229.170.59"

const devS3Url = `http://localhost:4566/${bucket}`
const devBackendUrl = "http://localhost:3000"

let s3Url
let backendUrl
//@ts-ignore
if (nodeEnv === "production") {
   s3Url = prodS3Url
   backendUrl = prodBackendUrl
} else {
   s3Url = devS3Url
   backendUrl = devBackendUrl
}

const env = {
   region,
   bucket,
   backendUrl,
   s3Url,
}

export { env }
