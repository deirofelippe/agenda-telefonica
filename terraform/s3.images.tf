resource "aws_s3_bucket" "images" {
  bucket = var.bucket_images
  tags = {
    Name = "Agenda Images Bucket"
    Env  = "dev"
  }
}

resource "aws_s3_bucket_cors_configuration" "images" {
  bucket = aws_s3_bucket.images.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "DELETE"]
    allowed_origins = [
      "http://${aws_instance.this.public_dns}",
      "https://${aws_instance.this.public_dns}",
      "http://${aws_instance.this.public_ip}",
      "https://${aws_instance.this.public_ip}",
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}