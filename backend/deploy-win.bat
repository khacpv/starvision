set NODE_ENV="production"
cd ../frontend
call npm run build
cd ../backend
call npm run pm2 stop starvision.oicsoft.com
call npm run pm2 delete starvision.oicsoft.com
call npm run pm2 start ./bin/www -- --name starvision.oicsoft.com -i 4 -l C:/website/starvision.oicsoft.com/logs/logs.txt
call npm run pm2 list