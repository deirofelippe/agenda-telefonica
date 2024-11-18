variable "bucket_remote_state" {
  default = "agenda-remote-state"
  type    = string
}

variable "bucket_frontend" {
  default = "agenda-frontend"
  type    = string
}

variable "bucket_images" {
  default = "agenda-images"
  type    = string
}

variable "aws_credentials_file_path" {
  default = "/home/boibandidoorigins/.aws/credentials"
  type    = string
}

variable "aws_region" {
  default = "sa-east-1"
  type    = string
}

variable "db_username" {
  default = "agenda_username"
  type    = string
}
variable "db_password" {
  default = "agenda_password"
  type    = string
}

variable "content_types" {
  type = map(string)

  default = {
    ".html" = "text/html; charset=utf-8",
    ".css"  = "text/css; charset=utf-8",
    ".js"   = "text/javascript; charset=utf-8",
    ".png"  = "image/png",
    ".jpeg" = "image/jpeg",
    ".jfif" = "image/jpeg",
    ".jpg"  = "image/jpeg",
    ".svg"  = "image/svg+xml",
    ".webp" = "image/webp",
    ".avif" = "image/avif",
  }
}
