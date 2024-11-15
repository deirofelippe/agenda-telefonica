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