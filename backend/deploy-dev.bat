set NODE_ENV=production
set PORT=3001
rem npm run pm2 delete starvision-dev.oicsoft.com
npm run pm2 start ./bin/www -- --name starvision-dev.oicsoft.com -i 1 -l C:/website/starvision-dev.oicsoft.com/logs/logs.txt
pause