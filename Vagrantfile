# ubuntu server 24.04
# ubuntu jammy 22.04
Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/jammy64"
    config.vm.box_version = "20241002.0.0"
    config.vm.define "agenda_aws"
  
    # config.vm.network "forwarded_port", guest: 8080, host: 8080
  
    config.vm.synced_folder "./aws-scripts", "/home/vagrant/scripts", owner: "vagrant", group: "vagrant"
  
    config.vm.provider "virtualbox" do |vb|
      vb.name = "vb_agenda_aws"
      vb.memory = 1024
      vb.cpus = 1
    end
  
    # config.vm.provision "docker" do |d|
    # end
  
    config.vm.provision "shell", privileged: false, inline: <<-SHELL
      # sudo apt-get update -y
      # sudo apt-get install -y nginx git python3 g++ make python3-pip curl net-tools
  
      # echo "alias la='ls -lah'" >> ~/.bashrc
      # echo "alias src='source ~/.bashrc'" >> ~/.bashrc
      
      # ## Install ASDF
      # git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0 \
      #   && echo '. "$HOME/.asdf/asdf.sh"' >> ~/.bashrc \
      #   && echo '. "$HOME/.asdf/completions/asdf.bash"' >> ~/.bashrc
  
      # ## Install NVM
      # curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
      #   && export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" \
      #   && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
      #   && nvm install 20.10.0 \
      #   && nvm use 20.10.0
      
      # ## Install PM2
      # npm i -g pm2
  
      # ## Config NGINX
      # sudo systemctl start nginx
      # sudo sed -i 's/# server_tokens off/server_tokens off/' /etc/nginx/nginx.conf
      # sudo cp /apps/ecommerce/nginx/test.swordfish.russelservico.com.br /etc/nginx/sites-available/
      # sudo ln -s /etc/nginx/sites-available/test.swordfish.russelservico.com.br /etc/nginx/sites-enabled/
      # ## sudo nginx -s reload
    SHELL
  end