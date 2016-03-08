#!/usr/bin/env bash
apt-get update
apt-get install -y make g++ libssl-dev git
apt-get install -y build-essential
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install -y nodejs
npm install bower -g
npm install pm2 -g
cd ~/
git clone https://github.com/irgalieri/cube-summation.git
cd cube-summation
bower install --allow-root
npm install
pm2 startup ubuntu -u root
pm2 start main.js --name "web-server"
pm2 save
npm test
