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
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["http://localhost:3001", "http://agenda-frontend:3001", "http://localhost:3000", "http://agenda-backend:3000"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}