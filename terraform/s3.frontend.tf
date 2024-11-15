resource "aws_s3_bucket" "frontend" {
  bucket = var.bucket_frontend
  tags = {
    Name = "Agenda Frontend Bucket"
    Env  = "dev"
  }
}