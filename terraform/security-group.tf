data "http" "myip" {
  url = "http://ipv4.icanhazip.com"
}

resource "aws_security_group" "api" {
  name        = "api"
  description = "Habilita HTTP e HTTPS"
  vpc_id      = aws_vpc.this.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Habilita meu IP acessar a instancia via SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${trimspace(data.http.myip.response_body)}/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Agenda SG API"
  }
}

resource "aws_security_group" "mysql" {
  name        = "mysql"
  description = "Habilita MySQL"
  vpc_id      = aws_vpc.this.id

  ingress {
    description = "Habilita meu IP acessar a instancia via MySQL"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["${trimspace(data.http.myip.response_body)}/32"]
  }

  ingress {
    description     = "Habilita o SG da API acessar o MySQL (3306)"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.api.id]
  }

  ingress {
    description = "Habilita meu IP acessar a instancia via SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${trimspace(data.http.myip.response_body)}/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Agenda SG MySQL"
  }
}