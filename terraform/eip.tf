resource "aws_eip" "ec2" {
  depends_on = [aws_internet_gateway.this]

  instance                  = aws_instance.this.id
  associate_with_private_ip = aws_instance.this.private_ip

  tags = {
    Name = "Agenda EIP EC2"
  }
}

resource "aws_eip" "nat" {
  depends_on = [aws_internet_gateway.this]

  tags = {
    Name = "Agenda EIP NAT"
  }
}