resource "aws_db_subnet_group" "this" {
  name = "db_subnet_group"
  subnet_ids = [
    aws_subnet.private_1.id,
    aws_subnet.private_2.id,
  ]
}

resource "aws_db_instance" "this" {
  allocated_storage      = 20
  db_name                = "agenda"
  engine                 = "mysql"
  engine_version         = "8.0.33"
  instance_class         = "db.t4g.micro"
  username               = var.db_username
  password               = var.db_password
  parameter_group_name   = "default.mysql8.0"
  publicly_accessible    = true
  multi_az               = false
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.mysql.id]
  db_subnet_group_name   = aws_db_subnet_group.this.name

  tags = {
    Name = "Agenda RDS"
  }
}