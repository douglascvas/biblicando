#!/usr/bin/env bash

echo "Type the name of the environment to configure.\n"
echo "Available options:\n"
echo "local    - configure the environment in the local host\n"
echo "vagrant  - configure the environment in the vagrant machine (under IP 192.168.33.10)\n"
echo "server   - configure the environment in the remote biblicando server machine\n\n"
read -p ">> " INVENTORY
read -p "Install jenkins? [Y/n]" INSTALL_JENKINS
read -p "Install docker? [Y/n]" INSTALL_DOCKER

if [ $INSTALL_JENKINS  -ne 'y' ] && [ $INSTALL_JENKINS  -ne 'Y' ];
then
  INSTALL_JENKINS = 0
else
  INSTALL_JENKINS = 1;
fi

if [ $INSTALL_DOCKER  -ne 'y' ] && [ $INSTALL_DOCKER  -ne 'Y' ];
then
  INSTALL_DOCKER = 0
else
  INSTALL_DOCKER = 1;
fi

if [ -z $INVENTORY ]
then
  echo "Invalid option. Aborting..."
else
  ansible-playbook -i inventories/$INVENTORY/hosts site.yml --extra-vars "install_jenkins=$INSTALL_JENKINS install_docker=$INSTALL_DOCKER"
fi


