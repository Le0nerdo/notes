# Notes
|no web page yet|no guide yet|[ToDo](../master/todo.md)|[tuntikirjanpito](../master/tuntikirjanpito.md)
|:-------:|:-------:|:-------:|:-------:|

## Idea <sub><sup>([Basic way to acces data](#Basic-way-to-access-data))<sup/></sub>
>A web app that helps to keep and share* notes for studyin. Also has emphasis on "to learn" notes.  
If I have enough time I will test to make a variation for games.

*will maybe be implemented
## Architecture
* Frontend: [React](https://reactjs.org/) +  [Apollo Client](https://github.com/apollographql/apollo-client)
* Backend: [Node.js](https://nodejs.org/en/) + [Apollo Server](https://github.com/apollographql/apollo-server)
* Database: [PostgreSQL](https://www.postgresql.org/)
* Run environment: [Docker](https://www.docker.com/)

## Production
```sh
#create .env file
docker-compose up -d
```

## Development
### Database:
```sh
$ cd backend
$ docker-compose up -d
```
### Backend:
```sh
$ cd backend
$ npm i
# create .env file
$ npm run watch
```
### Frontend:
```sh
$ cd frontend
$ npm i
$ npm start
```

## Basic way to access data:
```
User----+School*+ToLearn
                |
                +Math---+ToLearn
                |       |
                |       |+Course1+ToLearn
                |       |       +Note1
                |       |       +Note2
                |       |
                |       +Course2+ToLearn
                |       |       +Note1
                |       |       +Note2
                |       |
                |       |
                |       +Note1
                |       +Note2
                |
                +Physics+ToLearn
                |       |
                |       +Course1+ToLearn
            	|       |       +Note1
            	|       |       +Note2
                |       |
                |       +Course2+ToLearn
                |       |       +Note1
                |       |       +Note2
                |       +Note1
                |       +Note2
                |
                +Shared*
```
*will maybe be implemented
## Useful links
[postgres docker](https://hub.docker.com/_/postgres)  
[node-postgres documentation](https://node-postgres.com/)  
[postgresql data types](https://www.postgresql.org/docs/11/datatype.html)  
[postgresql keywords](https://www.postgresql.org/docs/8.1/sql-keywords-appendix.html)  
[jest documentation](https://jestjs.io/docs/en/getting-started.html)  
