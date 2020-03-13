FROM node:13 AS frontend
WORKDIR /app
COPY /frontend/package.json .
RUN npm i --only=prod
COPY /frontend/public/ ./public/
COPY /frontend/src/ ./src/
RUN npm run build

FROM node:13 AS backend
WORKDIR /app
COPY /backend/package.json .
RUN npm i --only=prod
COPY /backend/src/ ./src/

FROM node:13
WORKDIR /app
COPY --from=frontend /app/build/ ./build/
COPY --from=backend /app/ .
ENTRYPOINT [ "npm", "start" ]
CMD [ "" ]
