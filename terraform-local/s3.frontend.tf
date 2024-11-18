resource "aws_s3_bucket" "frontend" {
  bucket = var.bucket_frontend
  tags = {
    Name = "Agenda Frontend Bucket"
    Env  = "dev"
  }
}

data "aws_iam_policy_document" "allow_public_access" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
      "s3:PutBucketPolicy",
    ]

    effect = "Allow"

    resources = [
      "${aws_s3_bucket.frontend.arn}/*",
      "${aws_s3_bucket.frontend.arn}",
    ]
  }
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.frontend.id
  policy = data.aws_iam_policy_document.allow_public_access.json
}

resource "aws_s3_bucket_ownership_controls" "this" {
  bucket = aws_s3_bucket.frontend.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "this" {
  depends_on = [
    aws_s3_bucket_ownership_controls.this,
    aws_s3_bucket_public_access_block.this,
  ]

  bucket = aws_s3_bucket.frontend.id
  acl    = "public-read"
}

resource "aws_s3_bucket_versioning" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "this" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_cors_configuration" "this" {
  bucket = aws_s3_bucket.frontend.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = [
      "*",
      # "http://localhost:3000",
      # "https://agenda-backend:3000",
      # "http://${aws_instance.this.public_dns}",
      # "https://${aws_instance.this.public_dns}",
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}


resource "aws_s3_object" "this" {
  for_each = fileset("${path.root}/../frontend/dist", "**")

  content_type = [for key, value in var.content_types : value if key == regex("\\.[a-zA-Z]+$", each.value)][0]

  bucket = aws_s3_bucket.frontend.id
  key    = each.value
  source = "${path.root}/../frontend/dist/${each.value}"
  etag   = filemd5("${path.root}/../frontend//dist/${each.value}")
}