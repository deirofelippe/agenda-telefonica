data "aws_iam_policy_document" "s3_to_ec2_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "s3_to_ec2_policy" {
  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject*",
      "s3:PutObject*",
      "s3:DeleteObject*",
      "s3:List*",
      "s3:Describe*",
    ]

    resources = [
      "${aws_s3_bucket.images.arn}",
      "${aws_s3_bucket.images.arn}/*",
    ]
  }
}

resource "aws_iam_role" "s3_to_ec2" {
  name = "s3_to_ec2_assume_role"

  assume_role_policy = data.aws_iam_policy_document.s3_to_ec2_assume_role.json

  tags = {
    Name = "AWS Role S3 to EC2"
  }
}

resource "aws_iam_role_policy" "s3_to_ec2" {
  name = "s3_to_ec2_policy"
  role = aws_iam_role.s3_to_ec2.id

  policy = data.aws_iam_policy_document.s3_to_ec2_policy.json
}

resource "aws_iam_instance_profile" "s3_to_ec2" {
  name = "s3_to_ec2_profile"
  role = aws_iam_role.s3_to_ec2.name
}


