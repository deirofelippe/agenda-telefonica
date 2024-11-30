terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.75.0"
    }
  }

  # backend "s3" {
  #   bucket = "agenda-remote-state"
  #   key    = "production/terraform.tfstate"
  #   region = "sa-east-1"
  # }
}

provider "aws" {
  shared_credentials_files = [var.aws_credentials_file_path]
  region                   = var.aws_region
}