set NODE_ENV=production
set PORT=3001
npm run pm2 delete starvision-dev.oicsoft.com
npm run pm2 start ./bin/www -- --name starvision-dev.oicsoft.com -i 1 -l C:/website/starvision-dev.oicsoft.com/logs/logs.txt
npm run pm2 reload starvision-dev.oicsoft.com
pause