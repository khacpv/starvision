echo "deploy server"

git stash
git checkout master
git pull origin master

cd frontend
#npm install
npm run build

cd ../backend
#npm install
forever stop 0
yarn run deploy