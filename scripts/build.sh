echo "------------------------"
echo "| Fetching latest code |"
echo "------------------------"
git pull

echo "-------------------------------"
echo "| Installing new dependencies |"
echo "-------------------------------"
npm install

echo "----------------------"
echo "| Migrating database |"
echo "----------------------"
npm run dev:migrate

echo "----------------------"
echo "| Starting the build |"
echo "----------------------"
npm run build
echo "--------------------"
echo "| Build successful |"
echo "--------------------"

echo "-----------------"
echo "| Copying files |"
echo "-----------------"
cp -r src/resources dist
echo "-------------------------"
echo "| Server build complete |"
echo "-------------------------"

echo "-------------------------"
echo "| Restarting the server |"
echo "-------------------------"
pm2 restart dimboo-dev-server --update-env
echo "--------------------"
echo "| Server restarted |"
echo "--------------------"