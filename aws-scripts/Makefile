sys-status:
	@sudo systemctl status agenda-backend
sys-start:
	@sudo systemctl start agenda-backend
sys-reload:
	@sudo systemctl daemon-reload
sys-journal:
	@sudo journalctl -f -u agenda-backend --since "5 minutes ago"

ls:
	@sudo docker container ls -a
rm:
	@sudo docker container rm -f agenda-backend
logs:
	@sudo docker container logs -f agenda-backend
exec:
	@sudo docker container exec -it -u root agenda-backend ash

mysql-exec:
	@sudo docker container exec -it mysql bash