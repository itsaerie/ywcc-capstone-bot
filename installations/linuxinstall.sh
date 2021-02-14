#!/bin/bash
# Script to install node.js and discord.js

# node.js
curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs

# discord.js
npm i -S discord.js