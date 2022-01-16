FROM node:15.12.0-alpine3.10

ARG PORT=4500

WORKDIR /app

COPY package*.json ./

RUN npm i -g wait-port

COPY ./ ./

RUN adduser -S ironman

RUN chown -R ironman /app

USER ironman

RUN npm ci

EXPOSE ${PORT}

CMD (if [[ "$NODE_ENV" == "ci" ]]; then \
    wait-port $DB_HOST:$DB_PORT -t 120000 && npm run test:e2e; \
    elif [[ "$NODE_ENV" == "production" ]]; then \
    npm run start; \
    else \
    wait-port $DB_HOST:$DB_PORT -t 60000 && npm run start:dev; \
    fi);