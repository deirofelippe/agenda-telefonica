resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.remote_state.bucket

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket" "remote_state" {
  bucket = var.bucket_remote_state
  tags = {
    Name = "Agenda Remote State Bucket"
    Env  = "dev"
  }
}