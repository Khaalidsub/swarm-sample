## Instructions

There are several ways to run the api

### Run With Docker Compose Dev Mode

```
docker-compose -f docker-compose.dev.yml up -d
```

### Run With Docker Compose

```
docker-compose  up -d
```

### Run With Docker Build Only

```
docker build . -t graphapi

docker run --name api -p 3000:3000 \
graphapi
```

### Run Project Normally

```
yarn install OR npm install

yarn start:dev OR npm start
```
