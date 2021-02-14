@echo off
Rem This is for pre-installation of the bot on Windows machines.
Rem If you are going to run this bot on a linux machine,
Rem  try using linuxinstall.sh located in the same directory
cd ..
Rem We'll be installing Chocolatey to manage packages for Windows CLI
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
Rem then we install Node
cinst nodejs.install
Rem use Node package manager to install discord.js
npm i -S discord.js