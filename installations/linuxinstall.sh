#!/bin/bash
# Script to install node.js and discord.js
# run from main directory with < sh installations/linuxinstall.sh >

# node.js
curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs

# discord.js
npm i -S discord.js

# make storage folders
#  stats folder collects information on each user
mkdir stats
#  storage of relevant bot data used within commands
mkdir storage
touch storage/guild_dat.json