set NODE_ENV="development"
set PORT=3001
cd ../frontend
call npm run build
cd ../backend
call npm run pm2 stop starvision-dev.oicsoft.com
call npm run pm2 delete starvision-dev.oicsoft.com
call npm run pm2 start ./bin/www -- --name starvision-dev.oicsoft.com -i 2 -l C:/website/starvision-dev.oicsoft.com/logs/logs.txt
call npm run pm2 list
pause