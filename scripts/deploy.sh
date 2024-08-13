#!/bin/bash

PROJECT_ROOT="/home/ubuntu/deploy"
DeployLogFile="/home/ubuntu/log/DeployLogFile.log"
PROJECT_NAME="Burgerput_Chat_Server"
current_time=$(date "+%Y-%m-%d %H:%M:%S")

cd $PROJECT_ROOT

echo "Burgerput Chat Server Deploy : $current_time" >> $DeployLogFile

echo "Install Dependencies : $current_time" >> $DeployLogFile
pnpm install

echo "Shut down an existing server : $current_time" >> $DeployLogFile
pm2 delete $PROJECT_NAME >> $DeployLogFile 2>&1

echo "Run the server : $current_time" >> $DeployLogFile
pm2 start "pnpm start" --name $PROJECT_NAME
echo "" && echo "" >> $DeployLogFile 2>&1

pm2 ps && pm2 ps >> $DeployLogFile 2>&1

echo "Successful deployment and server execution : $current_time" >> $DeployLogFile 2>&1