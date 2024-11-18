resource "aws_key_pair" "this" {
  key_name   = "agenda_ec2_key"
  public_key = file("./agenda_ec2_key.pub")

  tags = {
    Name = "Agenda Key Pair"
  }
}

resource "aws_instance" "this" {
  ami                    = "ami-0f16d0d3ac759edfa"
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.this.key_name
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.api.id]
  depends_on             = [aws_internet_gateway.this]

  tags = {
    Name = "Agenda EC2"
  }
}

