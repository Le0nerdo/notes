# Notes
|no web page yet|no guide yet|[ToDo](../master/todo.md)|[tuntikirjanpito](../master/tuntikirjanpito.md)
|:-------:|:-------:|:-------:|:-------:|

## Idea <sub><sup>([Basic way to acces data](#Basic-way-to-access-data))<sup/></sub>
>A web app that helps to keep and share notes for studyin. Also has emphasis on "to learn" notes.  
If I have enough time I will test to make a variation for games.

## Architecture
* Frontend: [React](https://reactjs.org/)
* Backend: [Node.js](https://nodejs.org/en/)
* Database: [PostgreSQL](https://www.postgresql.org/)
* Run environment: [Docker](https://www.docker.com/)

## Commands
### Development
#### Database:
```sh
$ cd db
$ docker-compose up -d
```
#### Backend:
```sh
$ cd backend
$ npm i
$ npm watch
```
#### Frontend:
```sh
$ cd frontend
$ npm i
$ npm start
```

## Basic way to access data:
```
User----+School-+ToLearn
                |
                +Math---+ToLearn
                |       |
                |       |+Course1+ToLearn
                |       |       +Note1
                |       |       +Note2
                |       |       +Shared
                |       |
                |       +Course2+ToLearn
                |       |       +Note1
                |       |       +Note2
                |       |       +Shared
                |       |
                |       |
                |       +Note1
                |       +Note2
                |       +Shared
                |
                +Physics+ToLearn
                        |
                        +Course1+ToLearn
                        |       +Note1
                        |       +Note2
                        |       +Shared
                        |
                        +Course2+ToLearn
                        |       +Note1
                        |       +Note2
                        |       +Shared
                        +Note1
                        +Note2
                        +Shared
         
```
## Useful links
[postgres docker](https://hub.docker.com/_/postgres)  
[node-postgres documentation](https://node-postgres.com/)  
