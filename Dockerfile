FROM node:15.12.0-alpine3.10

ARG PORT=4500

RUN npm i -g wait-port

RUN adduser -S ironman

COPY ./ /app
WORKDIR /app


RUN chown -R ironman /app

USER ironman

RUN npm ci

EXPOSE ${PORT}

CMD (if [[ "$NODE_ENV" == "ci" ]]; then \
    wait-port $DB_HOST:$DB_PORT -t 60000 && npm run e2e:ci; \
    elif [[ "$NODE_ENV" == "production" ]]; then \
    wait-port $DB_HOST:$DB_PORT -t 60000 && npm run start; \
    else \
    wait-port $DB_HOST:$DB_PORT -t 60000 && npm run start:dev; \
    fi);