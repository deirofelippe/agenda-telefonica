output "s3_frontend_endpoint" {
  value = "http://${aws_s3_bucket_website_configuration.frontend.website_endpoint}"
}

output "ec2_public_ip" {
  depends_on = [aws_eip.ec2]

  value      = "http://${aws_instance.this.public_ip}"
}

output "ec2_public_dns" {
  depends_on = [aws_eip.ec2]
  
  value      = "http://${aws_instance.this.public_dns}"
}

output "rds_address" {
  value = aws_db_instance.this.address
}
