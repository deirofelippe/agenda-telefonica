Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/jammy64"
    config.vm.box_version = "20241002.0.0"
    config.vm.define "agenda_aws"
  
    config.vm.network "forwarded_port", guest: 3000, host: 3000
  
    config.vm.synced_folder "./aws-scripts", "/home/ubuntu/aws-scripts", owner: "vagrant", group: "vagrant"
  
    config.vm.provider "virtualbox" do |vb|
      vb.name = "vb_agenda_aws"
      vb.memory = 1024
      vb.cpus = 1
    end
  
    # config.vm.provision "docker" do |d|
    # end
  
    config.vm.provision "shell", privileged: false, inline: <<-SHELL
    SHELL
  end