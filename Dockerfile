FROM node:13 AS frontend
COPY /frontend/ .
RUN npm i --only=prod
RUN npm run build

FROM node:13
COPY /backend/ .
RUN npm i --only=prod
COPY --from=frontend /build/ /build/
ENTRYPOINT [ "npm", "start" ]
CMD [ "" ]
