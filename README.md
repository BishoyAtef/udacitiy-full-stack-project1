npm run build // to compile the ts files
npm start // to compile and run ts files
npm test // to run all tests
npm run lint // to get linting errors
npm run lint:fix // to fix linting errors
npm run prettier // to get formatting errors
npm run prettier:fix // to fix formatting errors
docker build -t node-docker . //to build docker image
docker run -it -p 8000:8000 node-docker //to docker container
localhost:8000/api/images/upload //to upload an image 'formdata'
localhost:8000/api/images?filename=image&height=820&width=640 //to resize image