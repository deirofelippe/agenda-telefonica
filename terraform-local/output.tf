output "s3_frontend_endpoint" {
  value = aws_s3_bucket_website_configuration.frontend.website_endpoint
}
