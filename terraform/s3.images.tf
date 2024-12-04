resource "aws_s3_bucket" "images" {
  bucket = var.bucket_images

  tags = {
    Name = "Agenda Images Bucket"
    Env  = "dev"
  }
}

resource "aws_s3_bucket_public_access_block" "images" {
  bucket = aws_s3_bucket.images.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_ownership_controls" "images" {
  depends_on = [aws_s3_bucket_public_access_block.frontend]

  bucket = aws_s3_bucket.images.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_cors_configuration" "images" {
  depends_on = [aws_s3_bucket_ownership_controls.frontend]

  bucket = aws_s3_bucket.images.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "DELETE"]
    allowed_origins = [
      "http://${aws_instance.this.public_dns}",
      "https://${aws_instance.this.public_dns}",
      "http://${aws_instance.this.public_ip}",
      "https://${aws_instance.this.public_ip}",
      "http://${aws_s3_bucket_website_configuration.frontend.website_endpoint}",
      "https://${aws_s3_bucket_website_configuration.frontend.website_endpoint}",
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}