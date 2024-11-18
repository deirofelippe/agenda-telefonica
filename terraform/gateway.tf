resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id

  tags = {
    Name = "Agenda Internet Gateway"
  }
}

resource "aws_nat_gateway" "this" {
  depends_on = [aws_internet_gateway.this]

  subnet_id     = aws_subnet.public.id
  allocation_id = aws_eip.nat.id

  tags = {
    Name = "Agenda NAT Gateway"
  }
}
