#!/usr/bin/env bash

echo "Type the name of the environment to configure.\n"
echo "Available options:\n"
echo "local    - configure the environment in the local host\n"
echo "vagrant  - configure the environment in the vagrant machine (under IP 192.168.33.10)\n"
echo "server   - configure the environment in the remote biblicando server machine\n\n"
read -p ">> " INVENTORY
read -p "Install jenkins? [y/N]" INSTALL_JENKINS
read -p "Install docker? [y/N]" INSTALL_DOCKER
read -p "Install nodejs? [y/N]" INSTALL_NODEJS

if [ "$INSTALL_JENKINS"  == "y" ] || [ "$INSTALL_JENKINS"  == "Y" ];
then
  INSTALL_JENKINS=1
else
  INSTALL_JENKINS=0
fi

if [ "$INSTALL_DOCKER"  == "y" ] || [ "$INSTALL_DOCKER"  == "Y" ];
then
  INSTALL_DOCKER=1
else
  INSTALL_DOCKER=0
fi

if [ "$INSTALL_NODEJS"  == "y" ] || [ "$INSTALL_NODEJS"  == "Y" ];
then
  INSTALL_NODEJS=1
else
  INSTALL_NODEJS=0
fi

if [ -z $INVENTORY ]
then
  echo "Invalid option. Aborting..."
else
  ansible-playbook -i inventories/$INVENTORY/hosts site.yml --extra-vars "install_jenkins=$INSTALL_JENKINS install_docker=$INSTALL_DOCKER install_nodejs=$INSTALL_NODEJS"
fi


