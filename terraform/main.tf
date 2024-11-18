terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.75.0"
    }
  }

  backend "s3" {
    bucket         = "agenda-remote-state"
    key            = "dev/terraform.tfstate"
    region         = "sa-east-1"
    use_path_style = true

    endpoints = {
      s3  = "http://localhost:4566"
      sts = "http://localhost:4566"
    }
  }
}

provider "aws" {
  shared_credentials_files = [var.aws_credentials_file_path]
  region                   = var.aws_region

}