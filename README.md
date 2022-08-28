# C6-12-net

#backend run

 dotnet build
 
 docker build -t waguirre82/shiftworkbackend .
 docker run -d -p 8080:80 --name shiftworkbackend waguirre82/shiftworkbackend:latest

#frontend run

npm install
npm ci
npm start

docker build -t waguirre82/shiftworkfrotend .

docker run -d -it -p 80:80/tcp --name shiftworkfrotend waguirre82/shiftworkfrotend:latest